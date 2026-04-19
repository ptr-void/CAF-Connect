import { RestApi } from '@servicenow/sdk/core';

export const cafApi = RestApi({
    $id: Now.ID['restapi_caf_main'],
    name: 'CAF Connect API',
    serviceId: 'caf',
    consumes: 'application/json',
    produces: 'application/json',
    routes: [
        {
            $id: Now.ID['restapi_caf_public_stats'],
            name: 'get_public_stats',
            method: 'GET',
            path: '/public/stats',
            script: script`
              (function process(request, response) {
                try {
                    var siteGa = new GlideAggregate('x_1985733_cafsys_site');
                    siteGa.addQuery('is_active', true);
                    siteGa.addAggregate('COUNT');
                    siteGa.query();
                    var siteCount = 0;
                    if (siteGa.next()) siteCount = siteGa.getAggregate('COUNT');

                    var appGa = new GlideAggregate('x_1985733_cafsys_application');
                    appGa.addAggregate('COUNT');
                    appGa.query();
                    var appCount = 0;
                    if (appGa.next()) appCount = appGa.getAggregate('COUNT');

                    response.setStatus(200);
                    response.setBody({
                        activeSites: siteCount,
                        totalApplications: appCount
                    });
                } catch(ex) {
                    response.setStatus(500);
                    response.setBody({ error: ex.message });
                }
              })(request, response);
            `,
        },
        {
            $id: Now.ID['restapi_caf_notifications'],
            name: 'get_notifications',
            method: 'GET',
            path: '/notifications',
            script: script`
              (function process(request, response) {
                try {
                    var email = request.queryParams.email;
                    if (!email) {
                        response.setStatus(400);
                        response.setBody({ error: 'Email parameter is required.' });
                        return;
                    }

                    var logs = new GlideRecord('x_1985733_cafsys_case_log');
                    
                    var app = new GlideRecord('x_1985733_cafsys_application');
                    app.addQuery('email', email);
                    app.query();
                    
                    var appIds = [];
                    while(app.next()) {
                        appIds.push(app.getUniqueValue());
                    }

                    var results = [];
                    if (appIds.length > 0) {
                        logs.addQuery('application', 'IN', appIds.join(','));
                        logs.orderByDesc('sys_created_on');
                        logs.setLimit(20);
                        logs.query();

                        while(logs.next()) {
                            results.push({
                                sys_id: logs.getUniqueValue(),
                                title: logs.getValue('title'),
                                message: logs.getValue('message'),
                                type: logs.getValue('type'),
                                created_date: logs.getValue('sys_created_on'),
                                is_read: true 
                            });
                        }
                    }

                    response.setStatus(200);
                    response.setBody(results);
                } catch(ex) {
                    response.setStatus(500);
                    response.setBody({ error: ex.message });
                }
              })(request, response);
            `,
        },
        {
            $id: Now.ID['restapi_caf_me'],
            name: 'login',
            method: 'POST',
            path: '/login',
            script: script`
              (function process(request, response) {
                try {
                    var body = JSON.parse(request.body.dataString);
                    var email = body.email || '';
                    var password = body.password || '';

                    if (!email || !password) {
                        response.setStatus(400);
                        response.setBody({ error: 'Email and password are required.' });
                        return;
                    }

                    // Look up the user in the native ServiceNow sys_user table by email
                    var user = new GlideRecord('sys_user');
                    user.addQuery('email', email);
                    user.addQuery('active', true);
                    user.query();

                    if (!user.next()) {
                        response.setStatus(401);
                        response.setBody({ error: 'No account found with this email.' });
                        return;
                    }

                    // Verify password using ServiceNow's native password checker
                    var glideUser = GlideUser.getUserByID(user.getUniqueValue());
                    var passwordValid = gs.checkPassword(user.getUniqueValue(), password);

                    if (!passwordValid) {
                        response.setStatus(401);
                        response.setBody({ error: 'Invalid password. Please try again.' });
                        return;
                    }

                    response.setStatus(200);
                    response.setBody({
                        user_name: user.getValue('user_name'),
                        name: user.getValue('name'),
                        email: user.getValue('email'),
                        sys_id: user.getUniqueValue(),
                        account_type: user.getValue('title') || 'Patient',
                        assigned_site: user.getValue('department')
                    });
                } catch(ex) {
                    response.setStatus(500);
                    response.setBody({ error: ex.message });
                }
              })(request, response);
            `,
        },
        {
            $id: Now.ID['restapi_caf_register'],
            name: 'register',
            method: 'POST',
            path: '/register',
            script: script`
              (function process(request, response) {
                try {
                    var body = JSON.parse(request.body.dataString);
                    var fullName = body.full_name || '';
                    var email = body.email || '';
                    var password = body.password || '';
                    var accountType = body.account_type || 'Patient';

                    if (!fullName || !email || !password) {
                        response.setStatus(400);
                        response.setBody({ error: 'Full name, email, and password are required.' });
                        return;
                    }

                    // Check for duplicate email in sys_user
                    var existing = new GlideRecord('sys_user');
                    existing.addQuery('email', email);
                    existing.query();
                    if (existing.next()) {
                        response.setStatus(409);
                        response.setBody({ error: 'An account with this email already exists.' });
                        return;
                    }

                    // Generate a unique username from the email prefix
                    var usernamePart = email.split('@')[0].replace(/[^a-zA-Z0-9_.]/g, '') + '_caf';
                    var usernameCheck = new GlideRecord('sys_user');
                    usernameCheck.addQuery('user_name', usernamePart);
                    usernameCheck.query();
                    if (usernameCheck.next()) {
                        usernamePart = usernamePart + '_' + new Date().getTime().toString().slice(-4);
                    }

                    // Create the user in the native sys_user table
                    var newUser = new GlideRecord('sys_user');
                    newUser.setValue('name', fullName);
                    newUser.setValue('email', email);
                    newUser.setValue('user_name', usernamePart);
                    // title field stores the CAF account_type (Patient / Family Member / Guardian)
                    newUser.setValue('title', accountType);
                    newUser.setValue('active', true);

                    if (body.assigned_site) {
                        newUser.setValue('department', body.assigned_site);
                    }

                    var sysId = newUser.insert();

                    if (!sysId) {
                        response.setStatus(500);
                        response.setBody({ error: 'Account creation failed. Please try again.' });
                        return;
                    }

                    // Set the password using ServiceNow native password utility
                    var userForPw = new GlideRecord('sys_user');
                    if (userForPw.get(sysId)) {
                        userForPw.setNewPassword(password);
                        userForPw.update();
                    }

                    response.setStatus(201);
                    response.setBody({ message: 'Account created successfully.', user_name: usernamePart });
                } catch(ex) {
                    response.setStatus(500);
                    response.setBody({ error: ex.message });
                }
              })(request, response);
            `,
        },
        {
            $id: Now.ID['restapi_groq_ai_evaluate'],
            name: 'groq-evaluate',
            method: 'POST',
            path: '/groq/evaluate',
            script: script`
              (function process(request, response) {
                try {
                    var bodyObj = JSON.parse(request.body.dataString);
                    var patientName = bodyObj.patient_name || 'Unknown';
                    var diagnosis = bodyObj.diagnosis || 'None provided';
                    var abstract = bodyObj.medical_abstract || 'None provided';

                    var systemPrompt = "You are a clinical eligibility screener for a Cancer Assistance Fund (CAF). Determine if the applicant is 'Possibly Eligible' or 'Not Eligible' strictly based on this data. A patient is usually eligible if they have a confirmed cancer diagnosis and outline financial hardship. The output MUST be a JSON object with two exact keys: 'outcome' (either 'Possibly Eligible' or 'Not Eligible') and 'reasoning' (1 paragraph explanation).";
                    var userPrompt = "Patient: " + patientName + "\\nDiagnosis: " + diagnosis + "\\nMedical Abstract: " + abstract;

                    var rm = new sn_ws.RESTMessageV2();
                    rm.setEndpoint('https://api.groq.com/openai/v1/chat/completions');
                    rm.setHttpMethod('POST');
                    rm.setRequestHeader('Content-Type', 'application/json');
                    rm.setRequestHeader('Authorization', 'Bearer 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');

                    var payload = {
                        model: "llama-3.3-70b-versatile",
                        messages: [
                            { role: "system", content: systemPrompt },
                            { role: "user", content: userPrompt }
                        ],
                        response_format: { type: "json_object" }
                    };

                    rm.setRequestBody(JSON.stringify(payload));
                    var res = rm.execute();
                    var httpStatus = res.getStatusCode();
                    var responseBody = res.getBody();

                    if (httpStatus === 200) {
                        var groqData = JSON.parse(responseBody);
                        var content = groqData.choices[0].message.content;
                        response.setStatus(200);
                        response.setBody(JSON.parse(content));
                    } else {
                        gs.error("Groq API Error: " + responseBody);
                        response.setStatus(500);
                        response.setBody({ error: "Groq AI generation failed.", details: responseBody });
                    }
                } catch(ex) {
                    gs.error("Exception in Groq API: " + ex.message);
                    response.setStatus(500);
                    response.setBody({ error: ex.message });
                }
              })(request, response);
            `,
        },
        {
            $id: Now.ID['restapi_caf_applications_get'],
            name: 'get_applications',
            method: 'GET',
            path: '/applications',
            script: script`
              (function process(request, response) {
                try {
                    var email = request.queryParams.email;
                    if (!email) {
                        response.setStatus(400);
                        response.setBody({ error: 'Email parameter is required.' });
                        return;
                    }

                    var apps = new GlideRecord('x_1985733_cafsys_application');
                    apps.addQuery('email', email);
                    apps.orderByDesc('sys_created_on');
                    apps.query();

                    var results = [];
                    while (apps.next()) {
                        results.push({
                            sys_id: apps.getUniqueValue(),
                            number: apps.getValue('number'),
                            patient_name: apps.getValue('patient_name'),
                            medical_condition: apps.getValue('medical_condition'),
                            selected_site: apps.getValue('selected_site'),
                            state: apps.getValue('state') || 'Pending',
                            sys_created_on: apps.getValue('sys_created_on')
                        });
                    }

                    response.setStatus(200);
                    response.setBody(results);
                } catch(ex) {
                    response.setStatus(500);
                    response.setBody({ error: ex.message });
                }
              })(request, response);
            `,
        },
        {
            $id: Now.ID['restapi_caf_staff_applications_get'],
            name: 'get_staff_applications',
            method: 'GET',
            path: '/staff/applications',
            script: script`
              (function process(request, response) {
                try {
                    var site = request.queryParams.site;
                    if (!site) {
                        response.setStatus(400);
                        response.setBody({ error: 'Site parameter is required.' });
                        return;
                    }

                    var apps = new GlideRecord('x_1985733_cafsys_application');
                    apps.addQuery('selected_site', site);
                    apps.orderByDesc('sys_created_on');
                    apps.query();

                    var results = [];
                    while (apps.next()) {
                        results.push({
                            sys_id: apps.getUniqueValue(),
                            number: apps.getValue('number'),
                            patient_name: apps.getValue('patient_name'),
                            medical_condition: apps.getValue('medical_condition'),
                            selected_site: apps.getValue('selected_site'),
                            state: apps.getValue('state') || 'Pending',
                            sys_created_on: apps.getValue('sys_created_on')
                        });
                    }

                    response.setStatus(200);
                    response.setBody(results);
                } catch(ex) {
                    response.setStatus(500);
                    response.setBody({ error: ex.message });
                }
              })(request, response);
            `,
        },
        {
            $id: Now.ID['restapi_caf_applications_post'],
            name: 'post_application',
            method: 'POST',
            path: '/applications',
            script: script`
              (function process(request, response) {
                try {
                    var body = JSON.parse(request.body.dataString);
                    var newApp = new GlideRecord('x_1985733_cafsys_application');
                    newApp.setValue('patient_name', body.patient_name || '');
                    newApp.setValue('email', body.email || '');
                    newApp.setValue('phone_number', body.phone_number || '');
                    newApp.setValue('medical_condition', body.medical_condition || '');
                    newApp.setValue('selected_site', body.selected_site || '');
                    newApp.setValue('medical_abstract', body.medical_abstract || '');
                    newApp.setValue('ai_eligibility_score', body.ai_eligibility_score || '');
                    newApp.setValue('ai_reasoning', body.ai_reasoning || '');
                    newApp.setValue('needs_manual_review', body.needs_manual_review || false);
                    newApp.setValue('requested_amount', body.requested_amount || 0);
                    newApp.setValue('document_url', body.document_url || '');
                    newApp.setValue('state', '1'); 
                    
                    var sysId = newApp.insert();

                    if (!sysId) {
                        response.setStatus(500);
                        response.setBody({ error: 'Failed to create application in database.' });
                        return;
                    }

                    var log = new GlideRecord('x_1985733_cafsys_case_log');
                    log.initialize();
                    log.setValue('application', sysId);
                    log.setValue('title', 'Application received');
                    log.setValue('message', 'Your intake form was submitted successfully and forwarded to the selected access site.');
                    log.setValue('type', 'info');
                    log.setValue('timestamp', new GlideDateTime().getDisplayValue());
                    log.insert();

                    var notify = new GlideRecord('x_1985733_cafsys_notification');
                    notify.setValue('title', 'Application Received');
                    notify.setValue('message', 'Your CAF application for ' + body.patient_name + ' has been received and is under review.');
                    notify.setValue('user_email', body.email);
                    notify.setValue('created_date', new GlideDateTime().getDisplayValue());
                    notify.insert();

                    
                    newApp.get(sysId);

                    response.setStatus(201);
                    response.setBody({
                        sys_id: sysId,
                        number: newApp.getValue('number'),
                        message: 'Application submitted successfully.'
                    });
                } catch(ex) {
                    response.setStatus(500);
                    response.setBody({ error: ex.message });
                }
              })(request, response);
            `,
        },
        {
            $id: Now.ID['restapi_caf_sites'],
            name: 'get_sites',
            method: 'GET',
            path: '/sites',
            script: script`
              (function process(request, response) {
                try {
                    var sites = new GlideRecord('x_1985733_cafsys_site');
                    sites.addQuery('is_active', true);
                    sites.query();
                    
                    var results = [];
                    
                    if (!sites.hasNext()) {
                         results = [
                            { sys_id: 'mock1', site_name: 'Metro Manila Medical Center', region: 'NCR', address: '123 Health Ave, Manila', contact_number: '(02) 8123-4567', operating_hours: 'Mon-Sun, 24/7', remaining_funds: 2500000, status: 'Available', supported_cancers: 'All Major Cancers' },
                            { sys_id: 'mock2', site_name: 'Cebu Doctors University Hospital', region: 'Central Visayas', address: 'Osmeña Blvd, Cebu City', contact_number: '(032) 255-5555', operating_hours: 'Mon-Sat, 8AM-5PM', remaining_funds: 0, status: 'Exhausted', supported_cancers: 'Breast, Lung, Colon' },
                            { sys_id: 'mock3', site_name: 'Davao Regional Hospital', region: 'Davao Region', address: 'Tagum City, Davao del Norte', contact_number: '(084) 216-9133', operating_hours: 'Mon-Fri, 9AM-4PM', remaining_funds: 500000, status: 'Pending Confirmation', supported_cancers: 'Pediatric Oncology, Cervical' }
                         ];
                    } else {
                        while (sites.next()) {
                            results.push({
                                sys_id: sites.getUniqueValue(),
                                site_name: sites.getValue('site_name'),
                                region: sites.getValue('region'),
                                address: sites.getValue('address'),
                                contact_number: sites.getValue('contact_number'),
                                operating_hours: sites.getValue('operating_hours'),
                                remaining_funds: sites.getValue('remaining_funds'),
                                status: sites.getValue('status'),
                                supported_cancers: sites.getValue('supported_cancers')
                            });
                        }
                    }

                    response.setStatus(200);
                    response.setBody(results);
                } catch(ex) {
                    response.setStatus(500);
                    response.setBody({ error: ex.message });
                }
              })(request, response);
            `,
        },
        {
            $id: Now.ID['restapi_caf_notifications'],
            name: 'get_notifications',
            method: 'GET',
            path: '/notifications',
            script: script`
              (function process(request, response) {
                try {
                    var email = request.queryParams.email;
                    if (!email) {
                        response.setStatus(400);
                        response.setBody({ error: 'Email parameter is required.' });
                        return;
                    }

                    var notifs = new GlideRecord('x_1985733_cafsys_notification');
                    notifs.addQuery('user_email', email);
                    notifs.orderByDesc('sys_created_on');
                    notifs.query();

                    var results = [];
                    while (notifs.next()) {
                        results.push({
                            sys_id: notifs.getUniqueValue(),
                            title: notifs.getValue('title'),
                            message: notifs.getValue('message'),
                            is_read: notifs.getValue('is_read') === '1' || notifs.getValue('is_read') === 'true',
                            created_date: notifs.getValue('created_date') || notifs.getValue('sys_created_on')
                        });
                    }

                    response.setStatus(200);
                    response.setBody(results);
                } catch(ex) {
                    response.setStatus(500);
                    response.setBody({ error: ex.message });
                }
              })(request, response);
            `,
        },
        {
            $id: Now.ID['restapi_caf_admin_dashboard'],
            name: 'get_admin_dashboard',
            method: 'GET',
            path: '/admin/dashboard',
            script: script`
              (function process(request, response) {
                try {
                    var stats = {
                       totalApps: 0,
                       activeSites: 0,
                       pendingCases: 0,
                       pendingDocRate: 0
                    };

                    var appGa = new GlideAggregate('x_1985733_cafsys_application');
                    appGa.addAggregate('COUNT');
                    appGa.query();
                    if (appGa.next()) {
                        stats.totalApps = parseInt(appGa.getAggregate('COUNT') || '0');
                    }

                    var pendingGa = new GlideAggregate('x_1985733_cafsys_application');
                    pendingGa.addQuery('state', 'IN', '2,Pending,Pending Review');
                    pendingGa.addAggregate('COUNT');
                    pendingGa.query();
                    if (pendingGa.next()) {
                       stats.pendingCases = parseInt(pendingGa.getAggregate('COUNT') || '0');
                    }

                    var missingGa = new GlideAggregate('x_1985733_cafsys_application');
                    missingGa.addQuery('state', '4');
                    missingGa.addAggregate('COUNT');
                    missingGa.query();
                    if (missingGa.next()) {
                       var missingCount = parseInt(missingGa.getAggregate('COUNT') || '0');
                       if (stats.totalApps > 0) {
                           stats.pendingDocRate = Math.round((missingCount / stats.totalApps) * 100);
                       }
                    }

                    var siteGa = new GlideAggregate('x_1985733_cafsys_site');
                    siteGa.addQuery('is_active', true);
                    siteGa.addAggregate('COUNT');
                    siteGa.query();
                    if (siteGa.next()) {
                       stats.activeSites = parseInt(siteGa.getAggregate('COUNT') || '0');
                    }

                    var users = [];
                    var userGr = new GlideRecord('x_1985733_cafsys_portal_user');
                    var qc = userGr.addQuery('account_type', 'Administrator');
                    qc.addOrCondition('account_type', 'Site Coordinator');
                    qc.addOrCondition('account_type', 'Coordinator');
                    userGr.query();
                    while (userGr.next()) {
                        users.push({
                            user_id: userGr.getUniqueValue(),
                            name: userGr.getValue('full_name'),
                            email: userGr.getValue('email') || userGr.getValue('u_email') || userGr.getValue('email_address'),
                            role: userGr.getValue('account_type'),
                            site: userGr.getValue('assigned_site') || 'System-wide',
                            status: userGr.getValue('is_active') === '0' ? 'Inactive' : 'Active'
                        });
                    }

                    var sites = [];
                    var siteRec = new GlideRecord('x_1985733_cafsys_site');
                    siteRec.query();
                    while (siteRec.next()) {
                        var siteName = siteRec.getValue('site_name');
                        
                        var appsForSite = new GlideAggregate('x_1985733_cafsys_application');
                        appsForSite.addQuery('selected_site', siteName);
                        appsForSite.addAggregate('COUNT');
                        appsForSite.query();
                        var caseCount = 0;
                        if (appsForSite.next()) {
                           caseCount = appsForSite.getAggregate('COUNT');
                        }

                        sites.push({
                            name: siteName,
                            region: siteRec.getValue('region') || 'N/A',
                            cases: caseCount,
                            status: siteRec.getValue('is_active') === '1' ? 'Operational' : 'Inactive'
                        });
                    }

                    response.setStatus(200);
                    response.setBody({
                       stats: stats,
                       users: users,
                       sites: sites
                    });
                } catch(ex) {
                    response.setStatus(500);
                    response.setBody({ error: ex.message });
                }
              })(request, response);
            `,
        },
        {
            $id: Now.ID['restapi_caf_documents_reqs'],
            name: 'get_documents_requirements',
            method: 'GET',
            path: '/documents/requirements',
            script: script`
              (function process(request, response) {
                try {
                    var reqs = new GlideRecord('x_1985733_cafsys_doc_req');
                    reqs.addQuery('is_active', true);
                    reqs.query();

                    var results = [];
                    while (reqs.next()) {
                        results.push({
                            sys_id: reqs.getUniqueValue(),
                            name: reqs.getValue('name'),
                            category: reqs.getValue('category'),
                            note: reqs.getValue('note')
                        });
                    }
                    
                    if (results.length === 0) {
                        results = [
                          { name: 'Medical Abstract', category: 'Clinical Document', note: 'Request the latest signed medical abstract from the treating physician or hospital.' },
                          { name: 'Valid Government ID', category: 'Identity Document', note: 'Patient or authorized representative ID must be clear and readable.' },
                          { name: 'Doctor Prescription', category: 'Treatment Support', note: 'Please upload a complete prescription with signature and date.' },
                          { name: 'Laboratory Results', category: 'Clinical Supporting File', note: 'Attach recent relevant diagnostic or laboratory results if available.' }
                        ];
                    }

                    response.setStatus(200);
                    response.setBody(results);
                } catch(ex) {
                    response.setStatus(500);
                    response.setBody({ error: ex.message });
                }
              })(request, response);
            `,
        },
        {
            $id: Now.ID['restapi_caf_get_profile_docs'],
            name: 'get_profile_documents',
            method: 'GET',
            path: '/profile/documents',
            script: script`
              (function process(request, response) {
                try {
                    var email = request.queryParams.email;
                    if (!email) {
                        response.setStatus(400);
                        response.setBody({ error: 'Email parameter is required.' });
                        return;
                    }

                    var docs = new GlideRecord('x_1985733_cafsys_patient_doc');
                    docs.addQuery('user_email', email);
                    docs.query();

                    var results = [];
                    while (docs.next()) {
                        results.push({
                            sys_id: docs.getUniqueValue(),
                            document_name: docs.getValue('document_name'),
                            file_url: docs.getValue('file_url'),
                            status: docs.getValue('status'),
                            created: docs.getValue('sys_created_on')
                        });
                    }

                    response.setStatus(200);
                    response.setBody(results);
                } catch(ex) {
                    response.setStatus(500);
                    response.setBody({ error: ex.message });
                }
              })(request, response);
            `,
        },
        {
            $id: Now.ID['restapi_caf_post_profile_docs'],
            name: 'post_profile_documents',
            method: 'POST',
            path: '/profile/documents',
            script: script`
              (function process(request, response) {
                try {
                    var bodyString = request.body.dataString;
                    var body = JSON.parse(bodyString);
                    
                    if (!body.email || !body.document_name || !body.file_url) {
                        response.setStatus(400);
                        response.setBody({ error: 'Missing required parameters.' });
                        return;
                    }

                    var existingDoc = new GlideRecord('x_1985733_cafsys_patient_doc');
                    existingDoc.addQuery('user_email', body.email);
                    existingDoc.addQuery('document_name', body.document_name);
                    existingDoc.query();

                    var sysId = '';
                    if (existingDoc.next()) {
                        existingDoc.setValue('file_url', body.file_url);
                        existingDoc.setValue('status', 'Uploaded');
                        existingDoc.update();
                        sysId = existingDoc.getUniqueValue();
                    } else {
                        var newDoc = new GlideRecord('x_1985733_cafsys_patient_doc');
                        newDoc.initialize();
                        newDoc.setValue('user_email', body.email);
                        newDoc.setValue('document_name', body.document_name);
                        newDoc.setValue('file_url', body.file_url);
                        newDoc.setValue('status', 'Uploaded');
                        sysId = newDoc.insert();
                    }

                    response.setStatus(201);
                    response.setBody({ message: 'Document saved successfully', sys_id: sysId });
                } catch(ex) {
                    response.setStatus(500);
                    response.setBody({ error: ex.message });
                }
              })(request, response);
            `,
        },
        {
            $id: Now.ID['restapi_caf_get_case_logs'],
            name: 'get_case_logs',
            method: 'GET',
            path: '/applications/{id}/logs',
            script: script`
              (function process(request, response) {
                try {
                    var id = request.pathParams.id;
                    var logs = new GlideRecord('x_1985733_cafsys_case_log');
                    logs.addQuery('application', id);
                    logs.orderByDesc('sys_created_on');
                    logs.query();

                    var results = [];
                    while (logs.next()) {
                        results.push({
                            sys_id: logs.getUniqueValue(),
                            title: logs.getValue('title'),
                            message: logs.getValue('message'),
                            type: logs.getValue('type'),
                            timestamp: logs.getValue('timestamp') || logs.getValue('sys_created_on')
                        });
                    }

                    if (results.length === 0) {
                        results = [
                            { title: 'Application received', message: 'Your intake form was submitted successfully and forwarded to the selected access site.', type: 'info', timestamp: 'Initial Submission' }
                        ];
                    }

                    response.setStatus(200);
                    response.setBody(results);
                } catch(ex) {
                    response.setStatus(500);
                    response.setBody({ error: ex.message });
                }
              })(request, response);
            `,
        },
        {
            $id: Now.ID['restapi_caf_batch_approve'],
            name: 'batch_approve',
            method: 'POST',
            path: '/staff/batch_approve',
            script: script`
              (function process(request, response) {
                try {
                    var body = request.body.data;
                    var site = body.site;
                    if (!site) throw new Error('Site is required');

                    var gr = new GlideRecord('x_1985733_cafsys_application');
                    gr.addQuery('selected_site', site);
                    gr.addQuery('state', 'IN', '1,2,Pending,Pending Review'); // Under Review/Pending
                    gr.query();
                    
                    var count = 0;
                    while (gr.next()) {
                        gr.setValue('state', '3'); // Approved
                        gr.update();
                        count++;
                    }

                    response.setStatus(200);
                    response.setBody({ message: 'Success', approved_count: count });
                } catch(ex) {
                    response.setStatus(500);
                    response.setBody({ error: ex.message });
                }
              })(request, response);
            `,
        },
        {
            $id: Now.ID['restapi_caf_add_user'],
            name: 'add_user',
            method: 'POST',
            path: '/admin/add_user',
            script: script`
              (function process(request, response) {
                try {
                    var body = request.body.data;
                    var action = body ? body.action : null;
                    var debugInfo = {
                        receivedAction: action,
                        hasBody: !!body,
                        bodyKeys: body ? Object.keys(body) : [],
                        rawBodyStr: JSON.stringify(body)
                    };

                    if (action === 'update_role') {
                        var gr = new GlideRecord('x_1985733_cafsys_portal_user');
                        if (gr.get(body.user_id)) {
                            var oldRole = gr.getValue('account_type');
                            gr.setValue('account_type', body.role);
                            gr.update();
                            response.setStatus(200);
                            response.setBody({ message: 'Role updated from ' + oldRole + ' to ' + body.role, debug: debugInfo });
                        } else {
                            response.setStatus(200);
                            response.setBody({ error: 'User not found by id: ' + body.user_id, debug: debugInfo });
                        }
                    } else if (action === 'toggle_active') {
                        var gr2 = new GlideRecord('x_1985733_cafsys_portal_user');
                        if (gr2.get(body.user_id)) {
                            var newVal = body.is_active ? '1' : '0';
                            gr2.setValue('is_active', newVal);
                            gr2.update();
                            response.setStatus(200);
                            response.setBody({ message: 'Active set to ' + newVal, debug: debugInfo });
                        } else {
                            response.setStatus(200);
                            response.setBody({ error: 'User not found by id: ' + body.user_id, debug: debugInfo });
                        }
                    } else {
                        var newGr = new GlideRecord('x_1985733_cafsys_portal_user');
                        newGr.initialize();
                        newGr.setValue('full_name', body.name);
                        newGr.setValue('email', body.email);
                        newGr.setValue('password', body.password || 'TemporaryPassword123!');
                        newGr.setValue('account_type', body.role);
                        newGr.setValue('assigned_site', body.site);
                        var sysId = newGr.insert();
                        response.setStatus(201);
                        response.setBody({ message: 'User added', sys_id: sysId, debug: debugInfo });
                    }
                } catch(ex) {
                    response.setStatus(500);
                    response.setBody({ error: ex.message });
                }
              })(request, response);
            `,
        }
    ]
});
