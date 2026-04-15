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
                    restapi_caf_main: {
                        table: 'sys_ws_definition'
                        id: 'e615faddf60045be93d19ae45e2046aa'
                    }
                    restapi_caf_me: {
                        table: 'sys_ws_operation'
                        id: 'ad847a23216945cb8990d67d192f1499'
                    }
                    restapi_caf_register: {
                        table: 'sys_ws_operation'
                        id: '4ca1c39316ac45d7a9e5840d4a4a3431'
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
                        table: 'sys_ui_page'
                        id: '0fff0e1167134d3b815815ff5d82afa2'
                        key: {
                            endpoint: 'x_1985733_cafsys_tracker.do'
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
                        table: 'sys_ui_page'
                        id: '60f5662f98434a4aafc97e56b64d380a'
                        deleted: true
                        key: {
                            endpoint: 'x_1985733_cafsys_incident_manager.do'
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
                        table: 'sys_dictionary'
                        id: '8756133ce81a4ab3a8842699895ab7a4'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'medical_condition'
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
                        id: 'ead8c42266774f53a26e3e384443ea84'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'NULL'
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
