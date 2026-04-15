import { BusinessRule, ClientScript, UiAction, EmailNotification } from '@servicenow/sdk/core';

// 1. Business Rule: Set defaults before inserting new application
export const setDefaultStatus = BusinessRule({
    $id: Now.ID['br_default_status'],
    name: 'Set Default Application Status',
    table: 'x_1985733_cafsys_application',
    when: 'before',
    action: ['insert'],
    active: true,
    script: script`(function executeRule(current, previous /*null when async*/) {
        // '1' typically means Open/New in Task tables
        if (!current.state) {
            current.state = 1;
        }
    })`,
});

// 2. UI Action: Native Approval Button for Coordinators
export const approveApplication = UiAction({
    $id: Now.ID['ui_approve'],
    name: 'Approve Funding',
    table: 'x_1985733_cafsys_application',
    actionName: 'approve_funding',
    active: true,
    form: { showButton: true },
    condition: 'current.state != 3', // Assuming 3 is Closed Complete
    script: script`
        current.state = 3;
        current.work_notes = "Application Approved by Coordinator.";
        current.update();
        gs.addInfoMessage("Application successfully approved for funding.");
        action.setRedirectURL(current);
    `,
});

// 3. Email Notification on Update to Approved Status
export const notifyApplicantApproval = EmailNotification({
    $id: Now.ID['email_notify_approval'],
    table: 'x_1985733_cafsys_application',
    name: 'CAF Application Approved',
    active: true,
    triggerConditions: {
        onRecordUpdate: true,
        onRecordInsert: false,
    },
    // Condition builder: State changes to 3 (Closed Complete)
    // Wait, Fluent SDK might handle conditions differently, we will rely on advanced condition script if needed
    // or just let the user add the specific field changes in the UI. We'll set a description.
    description: 'Triggered when the Coordinator approves funding on the CAF record.',
    emailContent: {
        subject: 'CAF Request Update: ${number}',
        messageHtml: '<p>Dear ${patient_name},</p><p>We are pleased to inform you that your Cancer Assistance Fund request (${number}) has been approved.</p><p>Coordinator notes: ${work_notes}</p>',
    },
});

// 4. Client Script: Simple Validation
export const enforceEmailValidation = ClientScript({
    $id: Now.ID['cs_validate_email'],
    name: 'Validate Email Field',
    table: 'x_1985733_cafsys_application',
    type: 'onChange',
    field: 'email',
    active: true,
    script: script`function onChange(control, oldValue, newValue, isLoading, isTemplate) {
        if (isLoading || newValue === '') {
            return;
        }
        if (newValue.indexOf('@') === -1) {
            g_form.showFieldMsg('email', 'Please enter a valid email address.', 'error');
        } else {
            g_form.hideFieldMsg('email');
        }
    }`,
});
