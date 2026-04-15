import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import appPage from '../../client/index.html'

UiPage({
    $id: Now.ID['caf-tracker-page'],
    endpoint: 'x_1985733_cafsys_tracker.do',
    description: 'CAF Access Navigator - tracker',
    category: 'general',
    html: appPage,
    direct: true,
})
