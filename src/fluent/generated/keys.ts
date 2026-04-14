import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
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
                        id: '60f5662f98434a4aafc97e56b64d380a'
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
                        table: 'sys_ux_lib_asset'
                        id: 'cc064489758247abaf862a2fa29b8707'
                        key: {
                            name: 'x_1985733_cafsys/main'
                        }
                    },
                ]
            }
        }
    }
}
