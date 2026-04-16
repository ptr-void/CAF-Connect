import { Table, StringColumn, ReferenceColumn, BooleanColumn, IntegerColumn } from '@servicenow/sdk/core';


export const x_1985733_cafsys_patient_doc = Table({
    name: 'x_1985733_cafsys_patient_doc',
    label: 'Patient Document',
    schema: {
        document_name: StringColumn({ label: 'Document Name', maxLength: 100 }),
        file_url: StringColumn({ label: 'File URL', maxLength: 500 }),
        status: StringColumn({ label: 'Status', maxLength: 50, defaultValue: 'Uploaded' }),
        user_email: StringColumn({ label: 'User Email', maxLength: 100 }),
    },
});


export const x_1985733_cafsys_doc_req = Table({
    name: 'x_1985733_cafsys_doc_req',
    label: 'Document Requirement',
    schema: {
        name: StringColumn({ label: 'Requirement Name', maxLength: 100 }),
        category: StringColumn({ label: 'Category', maxLength: 100 }),
        note: StringColumn({ label: 'Guidance Note', maxLength: 1000 }),
        access_site: StringColumn({ label: 'Access Site', maxLength: 100 }),
        is_active: BooleanColumn({ label: 'Active', defaultValue: true }),
    },
});


export const x_1985733_cafsys_case_log = Table({
    name: 'x_1985733_cafsys_case_log',
    label: 'Case Activity Log',
    schema: {
        application: ReferenceColumn({
            label: 'Application',
            referenceTable: 'x_1985733_cafsys_application',
        }),
        title: StringColumn({ label: 'Activity Title', maxLength: 100 }),
        message: StringColumn({ label: 'Details', maxLength: 500 }),
        type: StringColumn({ label: 'Log Type', maxLength: 50, defaultValue: 'status' }),
    },
});


export const x_1985733_cafsys_application = Table({
    name: 'x_1985733_cafsys_application',
    label: 'Patient Application',
    schema: {
        number: StringColumn({ label: 'Case Number', maxLength: 20 }),
        patient_name: StringColumn({ label: 'Patient Name', maxLength: 100 }),
        email: StringColumn({ label: 'Email', maxLength: 100 }),
        phone_number: StringColumn({ label: 'Phone', maxLength: 20 }),
        diagnosis: StringColumn({ label: 'Diagnosis', maxLength: 200 }),
        selected_site: StringColumn({ label: 'Selected Site', maxLength: 100 }),
        state: IntegerColumn({ label: 'State', defaultValue: 1 }),
        requested_amount: StringColumn({ label: 'Requested Amount', maxLength: 50 }),
        approved_amount: StringColumn({ label: 'Approved Amount', maxLength: 50 }),
        medical_abstract: StringColumn({ label: 'Medical Abstract Text', maxLength: 4000 }),
        ai_eligibility_score: IntegerColumn({ label: 'AI Score' }),
        ai_reasoning: StringColumn({ label: 'AI Reasoning', maxLength: 1000 }),
        needs_manual_review: BooleanColumn({ label: 'Needs Review', defaultValue: false }),
    },
});


export const x_1985733_cafsys_site = Table({
    name: 'x_1985733_cafsys_site',
    label: 'Access Site',
    schema: {
        site_name: StringColumn({ label: 'Site Name', maxLength: 100 }),
        region: StringColumn({ label: 'Region', maxLength: 100 }),
        total_funds: StringColumn({ label: 'Total Allocated Funds', maxLength: 50 }),
        remaining_funds: StringColumn({ label: 'Remaining Balance', maxLength: 50 }),
        is_active: BooleanColumn({ label: 'Active', defaultValue: true }),
        address: StringColumn({ label: 'Full Address', maxLength: 500 }),
        contact_number: StringColumn({ label: 'Contact', maxLength: 50 }),
        supported_cancers: StringColumn({ label: 'Supported Cancers', maxLength: 1000 }),
    },
});


export const x_1985733_cafsys_portal_user = Table({
    name: 'x_1985733_cafsys_portal_user',
    label: 'CAF Portal User',
    schema: {
        full_name: StringColumn({ label: 'Full Name', maxLength: 100 }),
        email: StringColumn({ label: 'Email', maxLength: 100 }),
        password: StringColumn({ label: 'Password', maxLength: 100 }),
        account_type: StringColumn({ label: 'Account Type', maxLength: 50 }),
        assigned_site: StringColumn({ label: 'Assigned Site', maxLength: 100 }),
        is_active: BooleanColumn({ label: 'Active Status', defaultValue: true }),
    },
});
