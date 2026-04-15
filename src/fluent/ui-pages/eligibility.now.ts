import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import appPage from '../../client/index.html'

UiPage({
    $id: Now.ID['caf-eligibility-page'],
    endpoint: 'x_1985733_cafsys_eligibility.do',
    description: 'CAF Access Navigator - eligibility',
    category: 'general',
    html: appPage,
    direct: true,
})
