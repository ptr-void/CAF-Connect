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
                    restapi_caf_admin_dashboard: {
                        table: 'sys_ws_operation'
                        id: '64c3b12486524baebcaf9499dba2e9d7'
                    }
                    restapi_caf_applications_get: {
                        table: 'sys_ws_operation'
                        id: '998be4372368441b9767d56c03d62d9e'
                    }
                    restapi_caf_applications_post: {
                        table: 'sys_ws_operation'
                        id: 'd2bb15657b3c4a309c83a199060c6fc8'
                    }
                    restapi_caf_documents_reqs: {
                        table: 'sys_ws_operation'
                        id: 'ea09208cf3a744359cbc53421a354f63'
                    }
                    restapi_caf_get_case_logs: {
                        table: 'sys_ws_operation'
                        id: '8c105784a3984674bfad930afaf3a70d'
                    }
                    restapi_caf_get_profile_docs: {
                        table: 'sys_ws_operation'
                        id: '87361038ea624dec8281e2dbdaa8aa67'
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
                        id: 'a465be85518945f5b20162b0d90db368'
                    }
                    restapi_caf_post_profile_docs: {
                        table: 'sys_ws_operation'
                        id: '2eb9192f9dbf4600b5653707a892b79e'
                    }
                    restapi_caf_register: {
                        table: 'sys_ws_operation'
                        id: '4ca1c39316ac45d7a9e5840d4a4a3431'
                    }
                    restapi_caf_sites: {
                        table: 'sys_ws_operation'
                        id: '9d3e2f696e344c50ad3dd9c2a2275b70'
                    }
                    restapi_caf_staff_applications_get: {
                        table: 'sys_ws_operation'
                        id: '09f88c789afc4a409a7fbff905bb503e'
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
                        table: 'sys_documentation'
                        id: '002d5a1b45c344ff9db070c63fdc7a66'
                        key: {
                            name: 'x_1985733_cafsys_notification'
                            element: 'is_read'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '097999cecebd475f8174ff6e3cf87a6d'
                        key: {
                            name: 'x_1985733_cafsys_patient_doc'
                            element: 'user_email'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0b947a5a36434ed2b6506bdabc45c329'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'address'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0e4220adb728409a929239a693cb1d20'
                        key: {
                            name: 'x_1985733_cafsys_patient_doc'
                            element: 'NULL'
                            language: 'en'
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
                        table: 'sys_db_object'
                        id: '1312ad668c3342ea971469cd39d997c0'
                        key: {
                            name: 'x_1985733_cafsys_doc_req'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1334a30db33540f5af55cf669a5dcbf7'
                        key: {
                            name: 'x_1985733_cafsys_patient_doc'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '133ad26773974b92ab19ff928dcc9789'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'site_name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '15390c3704e24730ae39edcdd94e78bb'
                        key: {
                            name: 'x_1985733_cafsys_doc_req'
                            element: 'note'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1973246b280346be9633eae545a43cef'
                        key: {
                            name: 'x_1985733_cafsys_doc_req'
                            element: 'access_site'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1e3e6ba44a264936930593b1cdcad567'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1ed764f02cfb4da09a890cedba07a7a9'
                        key: {
                            name: 'x_1985733_cafsys_doc_req'
                            element: 'note'
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
                        id: '2220d8121e4146e09d98147b3579a79e'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'assigned_site'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '243b58837d234b3c9ab918391a1742d7'
                        key: {
                            name: 'x_1985733_cafsys_case_log'
                            element: 'NULL'
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
                        id: '2669180c73ea465aaec732dfd576cbb9'
                        key: {
                            name: 'x_1985733_cafsys_notification'
                            element: 'created_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2688e03dd59f46a99f985c9ea39f8046'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'approved_amount'
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
                        id: '2f57bd205b4447ce9408a48a681fd38c'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'password'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3c0220f9b40544ca9d903d7ceeec0825'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'site_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '3d16d6e7a2634843a5aa53b655031050'
                        key: {
                            name: 'x_1985733_cafsys_doc_req'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '3da59a33186e4fbeb53c4224593a2838'
                        key: {
                            name: 'x_1985733_cafsys_site'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3fc93d0938454936bbb9c1624e45212a'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'email'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '419fac78f152450b969e6d7c80f94f04'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'contact_number'
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
                        id: '4638d080044a4707a1a877329257f8c7'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'requested_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '46e9d266788449bbb75d3a99feb428ee'
                        key: {
                            name: 'x_1985733_cafsys_notification'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4715722f2e304f6ca2ccaef543888406'
                        key: {
                            name: 'x_1985733_cafsys_patient_doc'
                            element: 'status'
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
                        table: 'sys_documentation'
                        id: '49c4f1dc4a4f45e49f48abe3a7eb6685'
                        key: {
                            name: 'x_1985733_cafsys_doc_req'
                            element: 'access_site'
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
                        table: 'sys_dictionary'
                        id: '4aa7faeeaed74fe08f964fcd914312f8'
                        key: {
                            name: 'x_1985733_cafsys_patient_doc'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4b8d16def3a1489aa7f54a0f7cf344b6'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'is_active'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4cffaed0df974e73b263f29ce3df47ab'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'supported_cancers'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4d502f316ba947e695cb98cbff8b5e5b'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'account_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4ddcfd43486b4273a812c1381a0a43eb'
                        key: {
                            name: 'x_1985733_cafsys_doc_req'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5101b21448604798af6c93e47872670a'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'remaining_funds'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '515a7f5efa784a96a900803f06d8a33f'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'full_name'
                            language: 'en'
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
                        table: 'ua_table_licensing_config'
                        id: '52e3405133884c398c805d17995e906b'
                        key: {
                            name: 'x_1985733_cafsys_patient_doc'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '583538335cb6433bab8ee10f641a09d9'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5882ade7688b4cf5867a33e0a818a389'
                        key: {
                            name: 'x_1985733_cafsys_notification'
                            element: 'user_email'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '5dc8e1ae19e0416aa67c89bda0b8ef9d'
                        key: {
                            name: 'x_1985733_cafsys_notification'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5e0303d615434740bd1414867c396844'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'document_url'
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
                        table: 'ua_table_licensing_config'
                        id: '652df7183db44b018df050cb9c2f9479'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '68a51cb3bdd845c19d2e3961bc450265'
                        key: {
                            name: 'x_1985733_cafsys_site'
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
                        table: 'sys_dictionary'
                        id: '6bc6ea7c80b74a959c9f55b4ad6545dc'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'remaining_funds'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6e4b2ca7b93e4728be41f3a5a5fe5989'
                        key: {
                            name: 'x_1985733_cafsys_notification'
                            element: 'user_email'
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
                        id: '7e122c2ff09f47859fe38aba083f9c69'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'document_url'
                            language: 'en'
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
                        table: 'sys_documentation'
                        id: '863e4db280064e73933b9e9c86f37c5a'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'region'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8716007dba644419acbde066a784843d'
                        key: {
                            name: 'x_1985733_cafsys_notification'
                            element: 'NULL'
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
                        table: 'sys_documentation'
                        id: '887eb3d05e1044b091647914f92db4b7'
                        key: {
                            name: 'x_1985733_cafsys_case_log'
                            element: 'title'
                            language: 'en'
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
                        id: '88f11ad971734585a7819f38a538c5a1'
                        key: {
                            name: 'x_1985733_cafsys_notification'
                            element: 'is_read'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8a383b4a4c2549b683b12b588974ad10'
                        key: {
                            name: 'x_1985733_cafsys_notification'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '911e57dc162f4f44be3682797d86cdf0'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'region'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '94836ce3655a4fc78f1a5aad06fa21e9'
                        key: {
                            name: 'x_1985733_cafsys_patient_doc'
                            element: 'document_name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '97988ff939984505affba8c270ccced4'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'password'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '97f5ce21ed7c4e9e9578d3ce2692a3c3'
                        key: {
                            name: 'x_1985733_cafsys_case_log'
                            element: 'message'
                            language: 'en'
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
                        table: 'sys_dictionary'
                        id: '9decba3dc1f143388624a1ea7d699464'
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
                        table: 'sys_dictionary'
                        id: 'a2097407b69e44858705b5b69cc9825f'
                        key: {
                            name: 'x_1985733_cafsys_patient_doc'
                            element: 'file_url'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a36520203e4e42ab8ded872e3976fb09'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'address'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a4f31d456c5044a7a6a3acf2bba8e217'
                        key: {
                            name: 'x_1985733_cafsys_case_log'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a6c15dfc8c724044b437ea313cf9cbf5'
                        key: {
                            name: 'x_1985733_cafsys_notification'
                            element: 'message'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a6f4bb3c87f542438789f55790719501'
                        key: {
                            name: 'x_1985733_cafsys_doc_req'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a7e13c5c5dd14876afbf8a2d2f321daf'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'contact_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a90ad0bd89c9412f8351e364ed62337a'
                        key: {
                            name: 'x_1985733_cafsys_case_log'
                            element: 'type'
                            language: 'en'
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
                        table: 'sys_documentation'
                        id: 'aea3bb3f932b4a8d833baa28ca471f36'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'is_active'
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
                        table: 'sys_documentation'
                        id: 'b1399025c9b2421f8e446ca2727a18b5'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'approved_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b4171a86effa48a3841bd23d838fe306'
                        key: {
                            name: 'x_1985733_cafsys_doc_req'
                            element: 'is_active'
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
                        table: 'sys_dictionary'
                        id: 'b908de56fc904842bb33741159587f4f'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'account_type'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'b9956f46c48546e4809effa40f2121cb'
                        key: {
                            name: 'x_1985733_cafsys_case_log'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bb985e056cb64b82af94a8c047e7772d'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'requested_amount'
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
                        table: 'sys_documentation'
                        id: 'bcdc0537314045489b33c56086fc557a'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'supported_cancers'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bd5d144c01644d56988d8e575260e35a'
                        key: {
                            name: 'x_1985733_cafsys_doc_req'
                            element: 'is_active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bf9ce870d9b246e59c4cb292fdd514ae'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'full_name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c027f132044649e0ad4320359aead58f'
                        key: {
                            name: 'x_1985733_cafsys_case_log'
                            element: 'timestamp'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c0864f123b6c4226af53923120de1344'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'email'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c2fa7ad76449402ca7b98f9b8365cf94'
                        key: {
                            name: 'x_1985733_cafsys_case_log'
                            element: 'title'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c3051db0763a4549b72f2e381d02333d'
                        key: {
                            name: 'x_1985733_cafsys_doc_req'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'c4251704d96847949ba7fd12c025adf1'
                        key: {
                            name: 'x_1985733_cafsys_case_log'
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
                        table: 'sys_documentation'
                        id: 'c5a5fd53ae104f9b9d58820c5fe91481'
                        key: {
                            name: 'x_1985733_cafsys_patient_doc'
                            element: 'file_url'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c6af37fcf3f94f95b1d0926a2821f65d'
                        key: {
                            name: 'x_1985733_cafsys_case_log'
                            element: 'message'
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
                        table: 'sys_documentation'
                        id: 'c7a94f91b1874a50bffec34314beb77b'
                        key: {
                            name: 'x_1985733_cafsys_doc_req'
                            element: 'category'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c8c29ba9cb824df8a16d67ec309e96ae'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'operating_hours'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ca0d4d169f1e4beeb93b7d09cbfc6e47'
                        key: {
                            name: 'x_1985733_cafsys_case_log'
                            element: 'timestamp'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ca465d8fdd5148ae8f7af06bd00a3abf'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cb9c31b075c5452687c3f29481c83fb7'
                        key: {
                            name: 'x_1985733_cafsys_notification'
                            element: 'title'
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
                        table: 'sys_dictionary'
                        id: 'cdf4d0ca277949ee9b9d0c5a8ba042f8'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'assigned_site'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ce66db6c9e3648cbb284885c563ed227'
                        key: {
                            name: 'x_1985733_cafsys_patient_doc'
                            element: 'user_email'
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
                        table: 'sys_dictionary'
                        id: 'cf50d256d7d341ea8c3a753ed9d97089'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'NULL'
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
                        id: 'd0f9d78f2ef142329086bbb35bb67f4d'
                        key: {
                            name: 'x_1985733_cafsys_case_log'
                            element: 'type'
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
                        table: 'sys_documentation'
                        id: 'd5c945595fb542d090144ab871bf8a83'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'status'
                            language: 'en'
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
                        id: 'e22e2ddac6114007a5ab037de950782c'
                        key: {
                            name: 'x_1985733_cafsys_notification'
                            element: 'created_date'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e237ce930720404b84848a8fdea6f771'
                        key: {
                            name: 'x_1985733_cafsys_notification'
                            element: 'message'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'e4ac0974581e4361a685086080b3cb0c'
                        key: {
                            name: 'x_1985733_cafsys_patient_doc'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e5b765b30321441a8a8268d6b336e398'
                        key: {
                            name: 'x_1985733_cafsys_patient_doc'
                            element: 'document_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e70d9ac105c54a5daf68bc5ac38f1177'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e85809fcd88d4c6493da5044f8c1dcfb'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'operating_hours'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ea11ab8f749749ce86d0480f9474ffb4'
                        key: {
                            name: 'x_1985733_cafsys_case_log'
                            element: 'application'
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
                        table: 'sys_dictionary'
                        id: 'ed347327f5e544228a1e6f7cf5b63586'
                        key: {
                            name: 'x_1985733_cafsys_doc_req'
                            element: 'category'
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
                        table: 'sys_documentation'
                        id: 'f616b8106bf6430b8499ffe9f1668566'
                        key: {
                            name: 'x_1985733_cafsys_case_log'
                            element: 'application'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'f7ad90aff72846048104ef68347eb381'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: 'f9ed1fe6f33c41b69986a4a347bfd6e0'
                        key: {
                            endpoint: 'x_1985733_cafsys_staff.do'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fda1caabec5f44048ac6b7e1deab4355'
                        key: {
                            name: 'x_1985733_cafsys_doc_req'
                            element: 'name'
                        }
                    },
                ]
            }
        }
    }
}
