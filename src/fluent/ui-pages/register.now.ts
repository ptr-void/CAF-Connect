import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import appPage from '../../client/index.html'

UiPage({
    $id: Now.ID['caf-register-page'],
    endpoint: 'x_1985733_cafsys_register.do',
    description: 'CAF Access Navigator - register',
    category: 'general',
    html: appPage,
    direct: true,
})
