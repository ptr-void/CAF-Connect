import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import appPage from '../../client/index.html'

UiPage({
    $id: Now.ID['caf-application-page'],
    endpoint: 'x_1985733_cafsys_application.do',
    description: 'CAF Access Navigator - application',
    category: 'general',
    html: appPage,
    direct: true,
})
