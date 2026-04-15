import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import appPage from '../../client/index.html'

UiPage({
    $id: Now.ID['caf-sites-page'],
    endpoint: 'x_1985733_cafsys_sites.do',
    description: 'CAF Access Navigator - sites',
    category: 'general',
    html: appPage,
    direct: true,
})
