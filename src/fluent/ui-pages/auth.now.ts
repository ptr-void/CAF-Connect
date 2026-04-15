import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import appPage from '../../client/index.html'

UiPage({
    $id: Now.ID['caf-auth-page'],
    endpoint: 'x_1985733_cafsys_auth.do',
    description: 'CAF Access Navigator - auth',
    category: 'general',
    html: appPage,
    direct: true,
})
