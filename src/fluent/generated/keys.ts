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
                        deleted: true
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
                        id: 'cd15633048964cffa121bf70dfccef2e'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: '3720b77d2a0544318d35d9f61a318acc'
                    }
                    br_default_status: {
                        table: 'sys_script'
                        id: 'd22fcaa3eb604b8d86c81d7abb34c89b'
                    }
                    c555724d839403102cecbb96feaad314: {
                        table: 'sys_scope_privilege'
                        id: 'c555724d839403102cecbb96feaad314'
                    }
                    cs_validate_email: {
                        table: 'sys_script_client'
                        id: 'a1018cc539c24289a83a3e70e4598ca4'
                    }
                    d969fe0583d403102cecbb96feaad36e: {
                        table: 'sys_scope_privilege'
                        id: 'd969fe0583d403102cecbb96feaad36e'
                    }
                    email_notify_approval: {
                        table: 'sysevent_email_action'
                        id: 'd47b674ae0994c38853768debe3a5452'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: 'af61d5eb0eda44eea87fad4717006799'
                    }
                    restapi_caf_admin_dashboard: {
                        table: 'sys_ws_operation'
                        id: 'dd73a9a50666442980b8bd494407d58b'
                    }
                    restapi_caf_applications_get: {
                        table: 'sys_ws_operation'
                        id: '0bc90b5753c249d1b8d77f105d659ede'
                    }
                    restapi_caf_applications_post: {
                        table: 'sys_ws_operation'
                        id: '260c73537da548378db47f70d3779185'
                    }
                    restapi_caf_documents_reqs: {
                        table: 'sys_ws_operation'
                        id: 'b0b9341fcf6347f9ba16eda63e840881'
                    }
                    restapi_caf_get_case_logs: {
                        table: 'sys_ws_operation'
                        id: '4b248a1ea2ff47d48fb16a8afc93b3de'
                    }
                    restapi_caf_get_profile_docs: {
                        table: 'sys_ws_operation'
                        id: '4b6f56d3a78e4eecb8dc69384b93a0f1'
                    }
                    restapi_caf_main: {
                        table: 'sys_ws_definition'
                        id: '07a03669ea884d82aacc6328cbd04bd4'
                    }
                    restapi_caf_me: {
                        table: 'sys_ws_operation'
                        id: 'c5b6c59dc4b7412d80ea51976b0653a6'
                    }
                    restapi_caf_notifications: {
                        table: 'sys_ws_operation'
                        id: '7fcf83e1afc949d19af1aa46742be779'
                    }
                    restapi_caf_post_profile_docs: {
                        table: 'sys_ws_operation'
                        id: '70c089d304ab48269e67f5317cd8e2c7'
                    }
                    restapi_caf_public_stats: {
                        table: 'sys_ws_operation'
                        id: '064b6d3d4eba4650b68e4bb72bfd6fe5'
                    }
                    restapi_caf_register: {
                        table: 'sys_ws_operation'
                        id: 'fa3eeef4e38747a997660bef0cb1d67f'
                    }
                    restapi_caf_sites: {
                        table: 'sys_ws_operation'
                        id: '0d9b74be363a4ae0ac40075a95ddc91e'
                    }
                    restapi_caf_staff_applications_get: {
                        table: 'sys_ws_operation'
                        id: '0d64924c38f840aaa410d5385386357f'
                    }
                    restapi_groq_ai_evaluate: {
                        table: 'sys_ws_operation'
                        id: '4785f880a8274af98e2533eb24fbd142'
                    }
                    ui_approve: {
                        table: 'sys_ui_action'
                        id: 'aaebbd36ea7b4513bb3758009376074d'
                    }
                }
                composite: [
                    {
                        table: 'sys_documentation'
                        id: '01ea5cd787414b21999d6badabbcf5d9'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'address'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '01fd04f9b8604513995ae0642d652817'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'selected_site'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '02af9403b9cf4ce29a0c22a82b320c72'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'supported_cancers'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '05c1a2fe70ff4ad7a410fed68709caad'
                        key: {
                            name: 'x_1985733_cafsys_case_log'
                            element: 'type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0612fbc4fed045fe9a7420bab3899044'
                        key: {
                            name: 'x_1985733_cafsys_doc_req'
                            element: 'note'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '0763c156709d4965a1770f3190a187a9'
                        key: {
                            name: 'x_1985733_cafsys_site'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '084d993cc81b4ff78c6c1ab176f512ac'
                        key: {
                            endpoint: 'x_1985733_cafsys_register.do'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '090ecee5d09249ed9d29149473a6cba7'
                        deleted: true
                        key: {
                            name: 'x_1985733_cafsys_notification'
                            element: 'user_email'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1252b416a3634b6abb042bf6042b9eb1'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'approved_amount'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '138d59ef241e4c759fe96029eeefce6e'
                        key: {
                            name: 'x_1985733_cafsys_doc_req'
                            element: 'category'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '1444d21b815e4e2d95b90eb1022324e6'
                        key: {
                            name: 'x_1985733_cafsys_application'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '162abd74c0594994a5ef11b5894557cc'
                        key: {
                            name: 'x_1985733_cafsys_patient_doc'
                            element: 'file_url'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '1744e78de71644e0bd33bd0678c44434'
                        key: {
                            name: 'x_1985733_cafsys/main.js.map'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1a0f3f9fb9a240818984abdf575260a0'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'is_active'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1d15a67e8d444c1bbb8ce2b21eee1f01'
                        key: {
                            name: 'x_1985733_cafsys_case_log'
                            element: 'message'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1e9064bc1b004e398e56e8255e0839e9'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'ai_reasoning'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '1f4f0ad7a1fc42c2bf5f4d1d1e60df5e'
                        key: {
                            endpoint: 'x_1985733_cafsys_login.do'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '21bb65f6351f4399a979ca30a93cacb4'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '22bb7cf2a849415e8e13989bf45c575f'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'diagnosis'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '23ab02e856084b7dab592ed94c889103'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'selected_site'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '26f329107af1434086b1252cf4db5617'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'requested_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2bbd6e9e32c446eaabec980aa08d8bbe'
                        key: {
                            name: 'x_1985733_cafsys_case_log'
                            element: 'application'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '36e346a645944278bb5ac0db86822ab5'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'patient_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '39a64829b11541c396a6e548ad2c3245'
                        key: {
                            name: 'x_1985733_cafsys_site'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '39e4946ab18b4c42b86da6cd373e25d5'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4192bf4a1a4244e3a7e4437da91c3a84'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'assigned_site'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '4685a023c5d4471c9cce446c68727f8a'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '468d61ab2c70418cadb5c5e25cef0698'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'email'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '47b3f40af1264a85886c3aca5972f54c'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '49dd3c9e89574cc89c6ca231d563cf6c'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'password'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4ad1ca581f1a452f87c0318af22952f9'
                        key: {
                            name: 'x_1985733_cafsys_patient_doc'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4b631373486c48a3b1882a0d4a687244'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '4ea67b37d1304ff2b9c7423b9ba772e3'
                        key: {
                            endpoint: 'x_1985733_cafsys_help.do'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4fb2e9a988944043b66ed33bd0751c5a'
                        key: {
                            name: 'x_1985733_cafsys_doc_req'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '54c59b465e004d10b306bdc3e7715c08'
                        key: {
                            endpoint: 'x_1985733_cafsys_eligibility.do'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '56dc068f94c24e93b5481a28399b6a25'
                        key: {
                            endpoint: 'x_1985733_cafsys_landing.do'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '57521bd772e24bfa9f633b471efd5a6a'
                        key: {
                            name: 'x_1985733_cafsys_case_log'
                            element: 'message'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5c04bbe06f404e818a8ca24ce0f2e8e2'
                        key: {
                            name: 'x_1985733_cafsys_doc_req'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '5f6414b699d8473bb03b1aef65df9a9f'
                        key: {
                            name: 'x_1985733_cafsys_doc_req'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5ffab3726139446fa6b579283d7e0748'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'account_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '63608bb47b4f48e482c05612fbef4a07'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'ai_reasoning'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '65d282fa15184e629d3f0acc5c7af721'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'account_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '65d73094a66949c7b499a0bfea6181a3'
                        key: {
                            name: 'x_1985733_cafsys_doc_req'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '65db57e60fae4b04933fcb6105f25f7e'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'site_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6a19f209c21e4a96a24ba80b26d3b160'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'contact_number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6b02b8dcef534a34bd5bdcbb1262ba21'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'remaining_funds'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6cea9ca615334da2943a038c00ff03ca'
                        key: {
                            name: 'x_1985733_cafsys_patient_doc'
                            element: 'file_url'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '760f3604c4bc4fc591f79563bceb583a'
                        key: {
                            name: 'x_1985733_cafsys_patient_doc'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '7869853401e5406f9e9c040143ad95f6'
                        key: {
                            name: 'x_1985733_cafsys_case_log'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7c2c2a1e94fc4c0685a92d564026df95'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'total_funds'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '7c640837552c4c23b56301e147432603'
                        key: {
                            name: 'x_1985733_cafsys/main'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7e9a750d243a43049f0aa33b76dc9da2'
                        key: {
                            name: 'x_1985733_cafsys_case_log'
                            element: 'title'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7fa9e22c615347a39ed67de8a3deecc3'
                        key: {
                            name: 'x_1985733_cafsys_patient_doc'
                            element: 'document_name'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '83a716028a54497f9aabd8769fd64003'
                        key: {
                            name: 'x_1985733_cafsys_patient_doc'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '86b1bdf8a9ab422280e04ef91744e179'
                        key: {
                            endpoint: 'x_1985733_cafsys_admin.do'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '884cf9e0a29e4acda29c5d07b9328d58'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'diagnosis'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8acfcc072be64285b490cca0b7bc0bf3'
                        key: {
                            name: 'x_1985733_cafsys_doc_req'
                            element: 'note'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8ceed2c8cb924260b2a768f91f5c4b31'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8d7e32aecbeb40bc8fd74b3ef8da50c4'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'patient_name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9284cb55927a4be09a85755fd9dcc32b'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'address'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '94b7181cc6f14efe8dfcff05006fc646'
                        key: {
                            name: 'x_1985733_cafsys_doc_req'
                            element: 'access_site'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '955dd9065c4a49c7814753de0344eb82'
                        key: {
                            endpoint: 'x_1985733_cafsys_tracker.do'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '96cd94f4ba944a0b9dae700206d6135c'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'phone_number'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9f70aa33b8a94f59abe50d29a9a0e4e3'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'requested_amount'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a60e2b09ac764e05818ebb8db7276bc4'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'region'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: 'a850f9b74fba4929b5b42d060774628e'
                        key: {
                            endpoint: 'x_1985733_cafsys_notifications.do'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ab05792408524d0691125f8c1502dd86'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'email'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ab3741d535b04295acad4742d5c0d68b'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'ai_eligibility_score'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ae48199640fe43a2a9642e87cc8c1a42'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'ai_eligibility_score'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ae657a30554e4a529b8721072a25114b'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'email'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'b3c9c9b17f9c469ea6d8d29e5f959bcd'
                        deleted: true
                        key: {
                            name: 'x_1985733_cafsys_notification'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b6b4af8752fb4ba899e0e0980d22da9d'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: 'b9d49082074c40e98bfed4ff1e6fbf38'
                        key: {
                            endpoint: 'x_1985733_cafsys_staff.do'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bb2daef8078348539227fa35d4ba1cbb'
                        key: {
                            name: 'x_1985733_cafsys_case_log'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'bbde7f4bcc36453faaf8cf6d94331145'
                        key: {
                            name: 'x_1985733_cafsys_application'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bca54a1cf44c4ba88069cd3da060a321'
                        key: {
                            name: 'x_1985733_cafsys_patient_doc'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bdc784ca9d3d4dfb83ac12e70f068efe'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'contact_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bfd681b8dd344e67bf2a024a09e5c686'
                        key: {
                            name: 'x_1985733_cafsys_case_log'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c1377acf15424945ba4c1198f79a315f'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'full_name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c13e756c446b4ef79e9623adb14c7625'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'needs_manual_review'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c27f7c6385cf4373bffd4cc405c0e731'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'medical_abstract'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'c3b35349813949f8a20969d60784a7c7'
                        key: {
                            name: 'x_1985733_cafsys_case_log'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c3ec8b3e479b41d7989b5f704f54531c'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'medical_abstract'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c49ba25907b14c3b914ca4e01a4de1a3'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'total_funds'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c59385d38df54771af828af7b2f91414'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'is_active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c68c945815114a03a22cad1996524515'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'phone_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: 'c7cefcc9e84a419ca78fbf2aa0427388'
                        key: {
                            endpoint: 'x_1985733_cafsys_application.do'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cc4c100de1a04d43952c4a9b68071aa6'
                        key: {
                            name: 'x_1985733_cafsys_doc_req'
                            element: 'access_site'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cdd25e7749a14012a58960260ab9c93e'
                        key: {
                            name: 'x_1985733_cafsys_patient_doc'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ce9edf84485e48618bab9ef38cbac23f'
                        key: {
                            name: 'x_1985733_cafsys_doc_req'
                            element: 'category'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd5cc7d8c5edc4e34953afac1e4d13c6a'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'full_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'd85841ddab1d4e1091d2ec7aa5be2b0f'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd93168bfbebb49f98417dc58dd93a9bd'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'email'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'db17f40e3a3d49719bf35fdcb9fef58c'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'supported_cancers'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dbc68fba131c4a7a8d869eb4de93f445'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'assigned_site'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'de9c5e00f6e84eb9b8b39f8d5ce4523b'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'df8352801b07446bb0164aef9f5b39ed'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'approved_amount'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e2421915b6b643c5a667716685322a71'
                        key: {
                            name: 'x_1985733_cafsys_case_log'
                            element: 'title'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e272bd26be0d40a3940a94f3b2ca994d'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'region'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: 'e3f9e52d10234b27a984103ab05ad4c5'
                        key: {
                            endpoint: 'x_1985733_cafsys_documents.do'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e4f919bcc45749df80623af25b57e2c7'
                        key: {
                            name: 'x_1985733_cafsys_case_log'
                            element: 'type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e893a9ad9e9b4849b452fa6d6490db9c'
                        key: {
                            name: 'x_1985733_cafsys_patient_doc'
                            element: 'document_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e9f25950480b47f99bb7289d415f642a'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'needs_manual_review'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'eb356d42f6424e5188e6cac0c903c220'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ec1f012f759f47a7933ac68e520c652b'
                        key: {
                            name: 'x_1985733_cafsys_case_log'
                            element: 'application'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'ec3d92dc333b4445a6a4d691757da704'
                        key: {
                            name: 'x_1985733_cafsys_patient_doc'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'eece1964f934412b9e0e4ffeacb64b02'
                        key: {
                            name: 'x_1985733_cafsys_application'
                            element: 'state'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ef32864a70c3411b8d344bd47b19cd81'
                        key: {
                            name: 'x_1985733_cafsys_patient_doc'
                            element: 'user_email'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f03f8571d85e4a9588fe2a33ab0b194b'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'remaining_funds'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f66b3f101ea04b8baa64c2418b40c168'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'site_name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f66d7f0b32e0439c922724c4776b7ea5'
                        key: {
                            name: 'x_1985733_cafsys_patient_doc'
                            element: 'user_email'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f99bbd0412c54048baf18efc6395b135'
                        key: {
                            name: 'x_1985733_cafsys_doc_req'
                            element: 'is_active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fa1db8be69bd40e3a1ae9dddb8cb59bd'
                        key: {
                            name: 'x_1985733_cafsys_doc_req'
                            element: 'is_active'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: 'fb0b1244b8de4479b89dbf2d241186a3'
                        key: {
                            endpoint: 'x_1985733_cafsys_sites.do'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fbf12d38121347bf8699866d847e5ad7'
                        key: {
                            name: 'x_1985733_cafsys_doc_req'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fce3b1b9b14143f0b86c22fb75e696ab'
                        key: {
                            name: 'x_1985733_cafsys_portal_user'
                            element: 'password'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fd734c1ce02c41d58e3b254ae92b7dff'
                        key: {
                            name: 'x_1985733_cafsys_doc_req'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fdcf69f87fb54adba29ba0ce845a5a7c'
                        key: {
                            name: 'x_1985733_cafsys_site'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                ]
            }
        }
    }
}
