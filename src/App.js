import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import { Route, Router, Switch } from 'react-router-dom'

import Authentication from './pages/Authentication/Authentication'
import Travel from './pages/Travel/TravelPage'
import TravelDetail from './pages/Travel/TravelDetailPage'

import Navbar from './components/Navbar'
import Loader from './components/Loader'
import { Header } from './components/Header'
import { PrivateRoute } from './components/PrivateRoute'

@inject('appStore', 'routingStore')
@observer
class App extends Component {
  renderAppForAuthenticatedUser = () => {
    return (
      <Fragment>
        <Navbar />
        <Travel />
      </Fragment>
    )
  }

  renderTravelForAuthenticatedUser = () => {
    return (
      <Fragment>
        <Navbar />
        <TravelDetail />
      </Fragment>
    )
  }

  render () {
    const { appStore, routingStore } = this.props

    return (
      <Fragment>
        <Header />
        <div className='container'>
          <Router history={routingStore.history}>
            {
              appStore.isLoading
                ? <Loader />
                : (
                  <Switch>
                    <PrivateRoute path='/travels' isConnected={appStore.isConnected} component={this.renderAppForAuthenticatedUser} />
                    <PrivateRoute path='/travel/' isConnected={appStore.isConnected} component={this.renderTravelForAuthenticatedUser} />
                    <Route path='/' component={Authentication} />
                  </Switch>
                )
            }
          </Router>
        </div>
      </Fragment>
    )
  }
}

export default App
