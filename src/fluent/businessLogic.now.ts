import { BusinessRule, ClientScript, UiAction, EmailNotification, Role, Acl } from '@servicenow/sdk/core';


export const setDefaultStatus = BusinessRule({
    $id: Now.ID['br_default_status'],
    name: 'Set Default Application Status',
    table: 'x_1985733_cafsys_application',
    when: 'before',
    action: ['insert'],
    active: true,
    script: script`(function executeRule(current, previous ) {
        
        if (!current.state) {
            current.state = 1;
        }
    })`,
});


export const approveApplication = UiAction({
    $id: Now.ID['ui_approve'],
    name: 'Approve Funding',
    table: 'x_1985733_cafsys_application',
    actionName: 'approve_funding',
    active: true,
    form: { showButton: true },
    condition: 'current.state != 3', 
    script: script`
        current.state = 3;
        current.work_notes = "Application Approved by Coordinator.";
        current.update();
        gs.addInfoMessage("Application successfully approved for funding.");
        action.setRedirectURL(current);
    `,
});


export const notifyApplicantApproval = EmailNotification({
    $id: Now.ID['email_notify_approval'],
    table: 'x_1985733_cafsys_application',
    name: 'CAF Application Approved',
    active: true,
    triggerConditions: {
        onRecordUpdate: true,
        onRecordInsert: false,
    },
    
    
    
    description: 'Triggered when the Coordinator approves funding on the CAF record.',
    emailContent: {
        subject: 'CAF Request Update: ${number}',
        messageHtml: '<p>Dear ${patient_name},</p><p>We are pleased to inform you that your Cancer Assistance Fund request (${number}) has been approved.</p><p>Coordinator notes: ${work_notes}</p>',
    },
});


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

export const cafAdminRole = Role({
    $id: Now.ID['role_caf_admin'],
    name: 'x_1985733_cafsys.admin',
    description: 'Administrator role for the CAF application',
});

export const cafApplicationAcl = Acl({
    $id: Now.ID['acl_caf_application_write'],
    table: 'x_1985733_cafsys_application',
    type: 'record',
    operation: 'write',
    roles: [cafAdminRole],
    description: 'Only CAF Admins can write to the application table from the backend',
});
