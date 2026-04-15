import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import appPage from '../../client/index.html'

UiPage({
    $id: Now.ID['caf-help-page'],
    endpoint: 'x_1985733_cafsys_help.do',
    description: 'CAF Access Navigator - help',
    category: 'general',
    html: appPage,
    direct: true,
})
