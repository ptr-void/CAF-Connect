import { RestApi } from '@servicenow/sdk/core';

export const cafApi = RestApi({
    $id: Now.ID['restapi_caf_main'],
    name: 'CAF Connect API',
    serviceId: 'caf',
    consumes: 'application/json',
    produces: 'application/json',
    routes: [
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

                    
                    var user = new GlideRecord('x_1985733_cafsys_portal_user');
                    user.addQuery('email', email);
                    user.query();

                    if (!user.next()) {
                        response.setStatus(401);
                        response.setBody({ error: 'No account found with this email.' });
                        return;
                    }

                    
                    if (user.getValue('password') !== password) {
                        response.setStatus(401);
                        response.setBody({ error: 'Invalid password. Please try again.' });
                        return;
                    }

                    response.setStatus(200);
                    response.setBody({
                        user_name: user.getValue('email'), 
                        name: user.getValue('full_name'),
                        email: user.getValue('email'),
                        sys_id: user.getUniqueValue()
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

                    
                    var existing = new GlideRecord('x_1985733_cafsys_portal_user');
                    existing.addQuery('email', email);
                    existing.query();
                    if (existing.next()) {
                        response.setStatus(409);
                        response.setBody({ error: 'An account with this email already exists.' });
                        return;
                    }

                    
                    var newUser = new GlideRecord('x_1985733_cafsys_portal_user');
                    newUser.setValue('full_name', fullName);
                    newUser.setValue('email', email);
                    newUser.setValue('password', password); 
                    newUser.setValue('account_type', accountType);
                    var sysId = newUser.insert();

                    if (!sysId) {
                        response.setStatus(500);
                        response.setBody({ error: 'Account creation failed on the server. Make sure you build and deploy to register the new database table.' });
                        return;
                    }

                    response.setStatus(201);
                    response.setBody({ message: 'Account created successfully.', user_name: email });
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
                    var userPrompt = "Patient: " + patientName + "\nDiagnosis: " + diagnosis + "\nMedical Abstract: " + abstract;

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
                    newApp.setValue('state', '1'); 
                    
                    var sysId = newApp.insert();

                    if (!sysId) {
                        response.setStatus(500);
                        response.setBody({ error: 'Failed to create application in database.' });
                        return;
                    }

                    
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
                            { sys_id: 'mock1', site_name: 'Metro Manila Medical Center', region: 'NCR', address: '123 Health Ave, Manila', contact_number: '(02) 8123-4567', operating_hours: 'Mon-Sun, 24/7' },
                            { sys_id: 'mock2', site_name: 'Cebu Doctors University Hospital', region: 'Central Visayas', address: 'Osmeña Blvd, Cebu City', contact_number: '(032) 255-5555', operating_hours: 'Mon-Sat, 8AM-5PM' },
                            { sys_id: 'mock3', site_name: 'Davao Regional Hospital', region: 'Davao Region', address: 'Tagum City, Davao del Norte', contact_number: '(084) 216-9133', operating_hours: 'Mon-Fri, 9AM-4PM' }
                         ];
                    } else {
                        while (sites.next()) {
                            results.push({
                                sys_id: sites.getUniqueValue(),
                                site_name: sites.getValue('site_name'),
                                region: sites.getValue('region'),
                                address: sites.getValue('address'),
                                contact_number: sites.getValue('contact_number'),
                                operating_hours: sites.getValue('operating_hours')
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
        }
    ]
});
