import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import appPage from '../../client/index.html'

UiPage({
    $id: Now.ID['caf-landing-page'],
    endpoint: 'x_1985733_cafsys_landing.do',
    description: 'CAF Access Navigator - landing',
    category: 'general',
    html: appPage,
    direct: true,
})
