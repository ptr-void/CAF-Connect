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

                    // Look up user by email
                    var user = new GlideRecord('sys_user');
                    user.addQuery('email', email);
                    user.addQuery('active', true);
                    user.query();

                    if (!user.next()) {
                        response.setStatus(401);
                        response.setBody({ error: 'No account found with this email.' });
                        return;
                    }

                    // Validate password using GlideUser
                    var auth = GlideAuthenticator.authenticate(user.getValue('user_name'), password);
                    if (!auth) {
                        response.setStatus(401);
                        response.setBody({ error: 'Invalid password. Please try again.' });
                        return;
                    }

                    response.setStatus(200);
                    response.setBody({
                        user_name: user.getValue('user_name'),
                        name: user.getValue('name'),
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
                    var mobile = body.mobile || '';
                    var password = body.password || '';
                    var accountType = body.account_type || 'Patient';

                    if (!fullName || !email || !password) {
                        response.setStatus(400);
                        response.setBody({ error: 'Full name, email, and password are required.' });
                        return;
                    }

                    // Check duplicate email
                    var existing = new GlideRecord('sys_user');
                    existing.addQuery('email', email);
                    existing.query();
                    if (existing.next()) {
                        response.setStatus(409);
                        response.setBody({ error: 'An account with this email already exists.' });
                        return;
                    }

                    // Generate a username from email prefix
                    var userName = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '_');

                    var newUser = new GlideRecord('sys_user');
                    newUser.setValue('name', fullName);
                    newUser.setValue('email', email);
                    newUser.setValue('user_name', userName);
                    newUser.setValue('mobile_phone', mobile);
                    newUser.setValue('title', accountType);
                    newUser.setDisplayValue('user_password', password);
                    newUser.setValue('active', true);
                    var sysId = newUser.insert();

                    if (!sysId) {
                        response.setStatus(500);
                        response.setBody({ error: 'Account creation failed on the server.' });
                        return;
                    }

                    // Assign applicant role
                    var roleGr = new GlideRecord('sys_user_has_role');
                    roleGr.setValue('user', sysId);
                    var role = new GlideRecord('sys_user_role');
                    role.addQuery('name', 'x_1985733_cafsys.applicant');
                    role.query();
                    if (role.next()) {
                        roleGr.setValue('role', role.getUniqueValue());
                        roleGr.insert();
                    }

                    response.setStatus(201);
                    response.setBody({ message: 'Account created successfully.', user_name: userName });
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
    ]
});
