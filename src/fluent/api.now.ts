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

                    // Look up user by email in custom table
                    var user = new GlideRecord('x_1985733_cafsys_portal_user');
                    user.addQuery('email', email);
                    user.query();

                    if (!user.next()) {
                        response.setStatus(401);
                        response.setBody({ error: 'No account found with this email.' });
                        return;
                    }

                    // Validate plaintext password (mocked prototype level auth to bypass GlideAuthenticator global scope lock)
                    if (user.getValue('password') !== password) {
                        response.setStatus(401);
                        response.setBody({ error: 'Invalid password. Please try again.' });
                        return;
                    }

                    response.setStatus(200);
                    response.setBody({
                        user_name: user.getValue('email'), // Use email as unique identifier
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

                    // Check duplicate email
                    var existing = new GlideRecord('x_1985733_cafsys_portal_user');
                    existing.addQuery('email', email);
                    existing.query();
                    if (existing.next()) {
                        response.setStatus(409);
                        response.setBody({ error: 'An account with this email already exists.' });
                        return;
                    }

                    // Create new user in our custom table
                    var newUser = new GlideRecord('x_1985733_cafsys_portal_user');
                    newUser.setValue('full_name', fullName);
                    newUser.setValue('email', email);
                    newUser.setValue('password', password); // Mock prototype password
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
    ]
});
