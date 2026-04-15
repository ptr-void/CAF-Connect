import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import appPage from '../../client/index.html'

UiPage({
    $id: Now.ID['caf-admin-page'],
    endpoint: 'x_1985733_cafsys_admin.do',
    description: 'CAF Access Navigator - admin',
    category: 'general',
    html: appPage,
    direct: true,
})
