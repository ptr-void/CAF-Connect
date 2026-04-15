import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import appPage from '../../client/index.html'

UiPage({
    $id: Now.ID['caf-login-page'],
    endpoint: 'x_1985733_cafsys_login.do',
    description: 'CAF Access Navigator - login',
    category: 'general',
    html: appPage,
    direct: true,
})
