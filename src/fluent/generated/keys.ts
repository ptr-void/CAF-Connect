import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    '1569fe0583d403102cecbb96feaad368': {
                        table: 'sys_scope_privilege'
                        id: '1569fe0583d403102cecbb96feaad368'
                    }
                    '22d9f64583d403102cecbb96feaad3bc': {
                        table: 'sys_scope_privilege'
                        id: '22d9f64583d403102cecbb96feaad3bc'
                    }
                    '683ff201831803102cecbb96feaad368': {
                        table: 'sys_scope_privilege'
                        id: '683ff201831803102cecbb96feaad368'
                    }
                    '8955724d839403102cecbb96feaad322': {
                        table: 'sys_scope_privilege'
                        id: '8955724d839403102cecbb96feaad322'
                    }
                    '8d55724d839403102cecbb96feaad31e': {
                        table: 'sys_scope_privilege'
                        id: '8d55724d839403102cecbb96feaad31e'
                    }
                    'app.css': {
                        table: 'sys_ux_theme_asset'
                        id: 'd9bccb68a5d94c2fadf2b19c39255837'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: 'b902ae06f5f54fcabbc9fcfa0ea395cf'
                    }
                    br_default_status: {
                        table: 'sys_script'
                        id: '3e4e8929778247789d2881fc6922794e'
                    }
                    c555724d839403102cecbb96feaad314: {
                        table: 'sys_scope_privilege'
                        id: 'c555724d839403102cecbb96feaad314'
                    }
                    cs_validate_email: {
                        table: 'sys_script_client'
                        id: '1424ad00487c4286b3bf03a6fde8d168'
                    }
                    d969fe0583d403102cecbb96feaad36e: {
                        table: 'sys_scope_privilege'
                        id: 'd969fe0583d403102cecbb96feaad36e'
                    }
                    email_notify_approval: {
                        table: 'sysevent_email_action'
                        id: '080958b0aba74b06ac8a0bd998d1b79e'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '698ce03a02bd41238f12db669d398c41'
                    }
                    restapi_caf_applications_get: {
                        table: 'sys_ws_operation'
                        id: '21352a0c06a04d8c9e06f50984480e32'
                    }
                    restapi_caf_applications_post: {
                        table: 'sys_ws_operation'
                        id: '1d1368e0c7e94c8cbfa94b7f9c1d0328'
                    }
                    restapi_caf_main: {
                        table: 'sys_ws_definition'
                        id: 'e615faddf60045be93d19ae45e2046aa'
                    }
                    restapi_caf_me: {
                        table: 'sys_ws_operation'
                        id: 'ad847a23216945cb8990d67d192f1499'
                    }
                    restapi_caf_notifications: {
                        table: 'sys_ws_operation'
                        id: '2164fd4dfb1f4fe883f1a20631ef8d83'
                    }
                    restapi_caf_register: {
                        table: 'sys_ws_operation'
                        id: '4ca1c39316ac45d7a9e5840d4a4a3431'
                    }
                    restapi_caf_sites: {
                        table: 'sys_ws_operation'
                        id: 'e4ac9b681629444e91f5d384fcb17139'
                    }
                    restapi_groq_ai_evaluate: {
                        table: 'sys_ws_operation'
                        id: '2c0ab61c22104446980af4a3f8b8afd1'
                    }
                    ui_approve: {
                        table: 'sys_ui_action'
                        id: '7313ad645bc74d499226a6a4a1062e41'
                    }
                }
                composite: [
                    {
                        table: 'sys_dictionary'
                        id: '090ecee5d09249ed9d29149473a6cba7'
                        key: {
                            name: 'x_1985733_cafsys_notification'
                            element: 'user_email'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '0fff0e1167134d3b815815ff5d82afa2'
                        key: {
                            endpoint: 'x_1985733_cafsys_tracker.do'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '130e4307d2f341eaa9ebc3b727729c23'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'full_name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '18b976fd0c6545bcbc3d4afcde9f3bf5'
                        key: {
                            name: 'x_1985733_cafsys_notification'
                            element: 'is_read'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '1ef9229bafe845a1a170ea14c74975c2'
                        key: {
                            endpoint: 'x_1985733_cafsys_help.do'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1f63dca1fe4d4463abbfc7954b176100'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1ffdfa8f876b41aa8a6b1e703873e3e8'
                        key: {
                            name: 'x_1985733_cafsys_notification'
                            element: 'message'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '21313098758c4c66bb5676f815872870'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'password'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '24f70117fc3b4a169efa84e3a7b449ba'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'ai_eligibility_score'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '290ccfe32ccb4ab2b0b32d233bbac8f4'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'phone_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2939ff1f057b4ab5ae683f1a01756921'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'account_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2ddf8f65ab9940288837b8462489cc34'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3c20fbf0c79c43cabc843956b6c26a73'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3f202919a039476c98bf5fabf21d7cb0'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'site_name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '41594c043f3f4fb7bbd0af2aa8a3b930'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'is_active'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '432c642279ad4079bdbccf00f4cd4bbb'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'is_active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4603b8de6a8447d79fb4d8785880751d'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'needs_manual_review'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4947c9d4f9ad4adeb53466115ee558ce'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'medical_abstract'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '49fb38e1afa54cf8bbad33eb441f28cc'
                        key: {
                            endpoint: 'x_1985733_cafsys_landing.do'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '50f5274a341749d59bb89818e7fb2567'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'email'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '51abdeb3f1764a879f88e84bb95d9db5'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'patient_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '51e8cebc57a5495880fcdc3103135a15'
                        key: {
                            endpoint: 'x_1985733_cafsys_eligibility.do'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5399be19d57b4752a12f96dbb171b81c'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'account_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '53dc236327b04bb5b4e769a379c57fef'
                        key: {
                            name: 'x_1985733_cafsys_notification'
                            element: 'user_email'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '573ac4b0b6c2406d960f59f88faee85a'
                        key: {
                            name: 'x_1985733_cafsys_notification'
                            element: 'created_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '598642a7708b4d55a1acb2addfd1ec96'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'operating_hours'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5d918f5faa18450caf12a4fa3a460d38'
                        key: {
                            name: 'x_1985733_cafsys_notification'
                            element: 'created_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '60f5662f98434a4aafc97e56b64d380a'
                        deleted: true
                        key: {
                            endpoint: 'x_1985733_cafsys_incident_manager.do'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '67385e662e074699be6e2fed3d847ff3'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'site_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '683a20ebe66a455db78beff331e55b13'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6a75b2602ef64544bd55916b06b91b07'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'needs_manual_review'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '6b295d8f6c1a4483877267ebfa7eb6fd'
                        key: {
                            name: 'x_1985733_cafsys_application'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7043f9a4da5e492b94d25dca0d0444bd'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'address'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '788adac01a564a05b31be5c9e9094665'
                        key: {
                            name: 'x_1985733_cafsys/main.js.map'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '78a69604382b4be08e57cb93c74f55a8'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '796926f555744a79a7d5e5d1fca5e928'
                        key: {
                            endpoint: 'x_1985733_cafsys_documents.do'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7f29480e8ead48769fc3f4780d3eee47'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'ai_reasoning'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8571e69527004dab88f2205c7e7e6097'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'selected_site'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '86419faec1e24e908cdc4ab512193169'
                        key: {
                            name: 'x_1985733_cafsys_notification'
                            element: 'message'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8756133ce81a4ab3a8842699895ab7a4'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'medical_condition'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '89565247a102401996b09fe942074379'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'operating_hours'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9096630ea3bf4b40ab651e1ffe0240c2'
                        key: {
                            name: 'x_1985733_cafsys_notification'
                            element: 'is_read'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '93627800a3dc4d3ba7c460cb30d63521'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'contact_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '93fd0ade0b2c4e6397814d8ef4802837'
                        key: {
                            name: 'x_1985733_cafsys_site'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '9ccd4dc896e24f5c8d3ff0a6f974ed39'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9d3689478e234615844e0e3fc1965d2a'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'patient_name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9e0fb22b57dd44408ca995ca1710ccf7'
                        key: {
                            name: 'x_1985733_cafsys_notification'
                            element: 'title'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '9f1db0a07d8243b9a284f2ff5102d366'
                        key: {
                            name: 'x_1985733_cafsys.applicant'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9f3e084decb54c949453f9e1f03db01b'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'ai_reasoning'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'a0f71df62a0e4e70bae5654acfee655c'
                        key: {
                            name: 'x_1985733_cafsys.coordinator'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'a268dd1e3e4f4c6cbf55704a22249713'
                        key: {
                            name: 'x_1985733_cafsys_site'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a334e900546f4afdb7964a580e6365dd'
                        key: {
                            name: 'x_1985733_cafsys_notification'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'ac5f266e59ea47aa978d437bd8246a55'
                        key: {
                            name: 'x_1985733_cafsys_application'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'adbded8efeed49289ecdf8b07571c017'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'email'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: 'b0e22211e89e46aca2be08c66de18441'
                        key: {
                            endpoint: 'x_1985733_cafsys_sites.do'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'b3c9c9b17f9c469ea6d8d29e5f959bcd'
                        key: {
                            name: 'x_1985733_cafsys_notification'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b402932734e6410dbbd5147997a5b8f8'
                        key: {
                            name: 'x_1985733_cafsys_notification'
                            element: 'title'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b50a87144f254f23a0c98b9369ae0626'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'ai_eligibility_score'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: 'b5e48a5dd0e24c8c93e48c989dbadfea'
                        key: {
                            endpoint: 'x_1985733_cafsys_register.do'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: 'b8621b3a8ee549ac8a4ada6674cb864b'
                        key: {
                            category: 'x_1985733_cafsys_application'
                            prefix: 'CAF'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: 'bbc67ef1b41143e5a732accca4c73fd1'
                        key: {
                            endpoint: 'x_1985733_cafsys_login.do'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'be5a15453ca14c4ea36e99a21baf74f0'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'contact_number'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: 'c4d4feebdfb64f578c6b9655317b27d0'
                        key: {
                            endpoint: 'x_1985733_cafsys_notifications.do'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c791bc680c614c42b68337b946997331'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'medical_abstract'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c85e691e4772440cb78c908606850efd'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'address'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cacad469f54847bb8dfcd8f60849bdbe'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'region'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cb891f3c38064c928ce68e200447bccc'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'full_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'cc064489758247abaf862a2fa29b8707'
                        key: {
                            name: 'x_1985733_cafsys/main'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cd126d03e7d648cf8aec0aa9906936cf'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'selected_site'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: 'cf3e34464c4549d7b1b366574683a92c'
                        key: {
                            endpoint: 'x_1985733_cafsys_application.do'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'd06dd81409c7436ab558921287451c5f'
                        key: {
                            name: 'x_1985733_cafsys_notification'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd0ca0f1b93f44bfeb117abc06f3f390c'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'medical_condition'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd4507abddb184e1ea978b8871bb0e1bf'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'phone_number'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd7f8fa45174240428bf32ea6ec41d4e9'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'email'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'db835a38303d4ab2bacaaecde9f6925c'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'password'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'db943c15630748bb8a01994d402fd109'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e7e4d1ed4a744cecbb3d11c32ae4d1eb'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'region'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ead8c42266774f53a26e3e384443ea84'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ebfba52b4c1d4a77acaff00e89382d2e'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'email'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: 'f580bc09f6d04c85ab3e683940097be5'
                        key: {
                            endpoint: 'x_1985733_cafsys_admin.do'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f95be10fb01741b397353d4b21421690'
                        key: {
                            name: 'x_1985733_cafsys_notification'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: 'f9ed1fe6f33c41b69986a4a347bfd6e0'
                        key: {
                            endpoint: 'x_1985733_cafsys_staff.do'
                        }
                    },
                ]
            }
        }
    }
}
