import createBrowserHistory from 'history/createBrowserHistory'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'

const routingStore = new RouterStore()
const browserHistory = createBrowserHistory()
syncHistoryWithStore(browserHistory, routingStore)

export default routingStore
