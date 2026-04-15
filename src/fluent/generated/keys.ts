import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    'app.css': {
                        table: 'sys_ux_theme_asset'
                        id: 'd9bccb68a5d94c2fadf2b19c39255837'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: 'b902ae06f5f54fcabbc9fcfa0ea395cf'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '698ce03a02bd41238f12db669d398c41'
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
                        table: 'sys_ui_page'
                        id: '49fb38e1afa54cf8bbad33eb441f28cc'
                        key: {
                            endpoint: 'x_1985733_cafsys_landing.do'
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
                        table: 'sys_ux_lib_asset'
                        id: '788adac01a564a05b31be5c9e9094665'
                        key: {
                            name: 'x_1985733_cafsys/main.js.map'
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
                        table: 'sys_ui_page'
                        id: 'b0e22211e89e46aca2be08c66de18441'
                        key: {
                            endpoint: 'x_1985733_cafsys_sites.do'
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
                        table: 'sys_ux_lib_asset'
                        id: 'cc064489758247abaf862a2fa29b8707'
                        key: {
                            name: 'x_1985733_cafsys/main'
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
