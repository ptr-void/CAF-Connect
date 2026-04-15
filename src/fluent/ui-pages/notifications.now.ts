import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import appPage from '../../client/index.html'

UiPage({
    $id: Now.ID['caf-notifications-page'],
    endpoint: 'x_1985733_cafsys_notifications.do',
    description: 'CAF Access Navigator - notifications',
    category: 'general',
    html: appPage,
    direct: true,
})
