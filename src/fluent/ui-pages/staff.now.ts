import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import appPage from '../../client/index.html'

UiPage({
    $id: Now.ID['caf-staff-page'],
    endpoint: 'x_1985733_cafsys_staff.do',
    description: 'CAF Access Navigator - staff',
    category: 'general',
    html: appPage,
    direct: true,
})
