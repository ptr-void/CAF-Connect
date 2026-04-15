import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import appPage from '../../client/index.html'

UiPage({
    $id: Now.ID['caf-documents-page'],
    endpoint: 'x_1985733_cafsys_documents.do',
    description: 'CAF Access Navigator - documents',
    category: 'general',
    html: appPage,
    direct: true,
})
