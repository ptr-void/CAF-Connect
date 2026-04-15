import { RestApi } from '@servicenow/sdk/core';

export const groqApi = RestApi({
    $id: Now.ID['restapi_groq_ai'],
    name: 'Groq AI Service',
    serviceId: 'groqai',
    consumes: 'application/json',
    produces: 'application/json',
    routes: [
        {
            $id: Now.ID['restapi_groq_ai_evaluate'],
            name: 'evaluate',
            method: 'POST',
            // Enforce logic allowing public access for applicant (or enforce auth depending on final deployment)
            // For now, allow without restrictions since it's the external facing portal
            script: script`
              (function process(request, response) {
                try {
                    // Extract data from React frontend fetch
                    var bodyObj = JSON.parse(request.body.dataString);
                    var patientName = bodyObj.patient_name || 'Unknown';
                    var diagnosis = bodyObj.diagnosis || 'None provided';
                    var abstract = bodyObj.medical_abstract || 'None provided';
                    
                    var systemPrompt = "You are a clinical eligibility screener for a Cancer Assistance Fund (CAF). Determine if the applicant is 'Possibly Eligible' or 'Not Eligible' strictly based on this data. A patient is usually eligible if they have a confirmed cancer diagnosis and outline financial hardship. The output MUST be a JSON object with two exact keys: 'outcome' (either 'Possibly Eligible' or 'Not Eligible') and 'reasoning' (1 paragraph explanation).";
                    
                    var userPrompt = "Patient: " + patientName + "\nDiagnosis: " + diagnosis + "\nMedical Abstract: " + abstract;

                    // Initialize ServiceNow Outbound REST
                    var rm = new sn_ws.RESTMessageV2();
                    rm.setEndpoint('https://api.groq.com/openai/v1/chat/completions');
                    rm.setHttpMethod('POST');
                    rm.setRequestHeader('Content-Type', 'application/json');
                    
                    // Secure Token implementation
                    var token = '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'; 
                    rm.setRequestHeader('Authorization', 'Bearer ' + token);

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
                        var content = groqData.choices[0].message.content; // Should be a string representing our required JSON
                        
                        response.setStatus(200);
                        response.setBody(JSON.parse(content));
                    } else {
                        gs.error("Groq API Error: " + responseBody);
                        response.setStatus(500);
                        response.setBody({ error: "Groq AI generation failed.", details: responseBody });
                    }
                } catch(ex) {
                    gs.error("Exception in Groq API Integration: " + ex.message);
                    response.setStatus(500);
                    response.setBody({ error: ex.message });
                }
              })(request, response);
            `,
        }
    ]
});
