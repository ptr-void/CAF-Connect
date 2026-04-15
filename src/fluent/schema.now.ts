import { Table, StringColumn, Role, BooleanColumn } from '@servicenow/sdk/core';

// 1. Define Access Roles
export const applicantRole = Role({
    name: 'x_1985733_cafsys.applicant',
    description: 'Patient or relative applying for CAF',
});

export const coordinatorRole = Role({
    name: 'x_1985733_cafsys.coordinator',
    description: 'Site coordinator who reviews applications',
});

// 2. Database Table for CAF Applications
export const x_1985733_cafsys_application = Table({
    name: 'x_1985733_cafsys_application',
    extends: 'task', // Extends standard ServiceNow task to get state, assignment_group, etc.
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
        
        // AI specifically required fields
        medical_abstract: StringColumn({ label: 'Medical Abstract (Raw text)', maxLength: 4000 }),
        ai_eligibility_score: StringColumn({ label: 'AI Eligibility Result', maxLength: 100 }),
        ai_reasoning: StringColumn({ label: 'AI Reasoning', maxLength: 4000 }),
        
        needs_manual_review: BooleanColumn({ label: 'Needs Manual Review' })
    }
});
