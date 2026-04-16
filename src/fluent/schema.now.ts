import { Table, StringColumn, Role, BooleanColumn, DecimalColumn } from '@servicenow/sdk/core';


export const applicantRole = Role({
    name: 'x_1985733_cafsys.applicant',
    description: 'Patient or relative applying for CAF',
});

export const coordinatorRole = Role({
    name: 'x_1985733_cafsys.coordinator',
    description: 'Site coordinator who reviews applications',
});


export const x_1985733_cafsys_application = Table({
    name: 'x_1985733_cafsys_application',
    extends: 'task', 
    label: 'CAF Application',
    display: 'patient_name',
    auto_number: {
        prefix: 'CAF',
        number: 1000,
        number_of_digits: 6,
    },
    schema: {
        patient_name: StringColumn({ label: 'Patient Name', mandatory: true, maxLength: 100 }),
        medical_condition: StringColumn({ label: 'Medical Condition', maxLength: 500 }),
        email: StringColumn({ label: 'Email', maxLength: 100 }),
        phone_number: StringColumn({ label: 'Phone Number', maxLength: 20 }),
        selected_site: StringColumn({ label: 'Selected Access Site', maxLength: 100 }),
        
        
        medical_abstract: StringColumn({ label: 'Medical Abstract (Raw text)', maxLength: 4000 }),
        ai_eligibility_score: StringColumn({ label: 'AI Eligibility Result', maxLength: 100 }),
        ai_reasoning: StringColumn({ label: 'AI Reasoning', maxLength: 4000 }),
        
        needs_manual_review: BooleanColumn({ label: 'Needs Manual Review' }),
        requested_amount: DecimalColumn({ label: 'Requested Amount' }),
        approved_amount: DecimalColumn({ label: 'Approved Amount' })
    }
});


export const x_1985733_cafsys_portal_user = Table({
    name: 'x_1985733_cafsys_portal_user',
    label: 'CAF Portal User',
    display: 'full_name',
    schema: {
        full_name: StringColumn({ label: 'Full Name', mandatory: true, maxLength: 100 }),
        email: StringColumn({ label: 'Email', mandatory: true, maxLength: 100 }),
        password: StringColumn({ label: 'Password', mandatory: true, maxLength: 100 }),
        account_type: StringColumn({ label: 'Account Type', maxLength: 50 })
    }
});


export const x_1985733_cafsys_site = Table({
    name: 'x_1985733_cafsys_site',
    label: 'CAF Access Site',
    display: 'site_name',
    schema: {
        site_name: StringColumn({ label: 'Site Name', mandatory: true, maxLength: 200 }),
        region: StringColumn({ label: 'Region', maxLength: 100 }),
        address: StringColumn({ label: 'Address', maxLength: 500 }),
        contact_number: StringColumn({ label: 'Contact Number', maxLength: 50 }),
        operating_hours: StringColumn({ label: 'Operating Hours', maxLength: 100 }),
        is_active: BooleanColumn({ label: 'Active', defaultValue: true })
    }
});


export const x_1985733_cafsys_notification = Table({
    name: 'x_1985733_cafsys_notification',
    label: 'CAF Notification',
    display: 'title',
    schema: {
        title: StringColumn({ label: 'Title', mandatory: true, maxLength: 200 }),
        message: StringColumn({ label: 'Message', mandatory: true, maxLength: 1000 }),
        user_email: StringColumn({ label: 'User Email', mandatory: true, maxLength: 100 }),
        is_read: BooleanColumn({ label: 'Is Read', defaultValue: false }),
        created_date: StringColumn({ label: 'Created Date', maxLength: 50 }) 
    }
});
