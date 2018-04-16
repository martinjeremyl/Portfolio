import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'

import Authentication from './pages/Authentication/Authentication'
import Travel from './pages/Travel/TravelPage'

import Navbar from './components/Navbar'
import Loader from './components/Loader'

import Router from './modules/router/Router'

@inject('appStore')
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

  renderAuthenticationOrLoading = () => {
    return this.props.appStore.isLoading ? <Loader /> : <Authentication />
  }

  render () {
    return (
      <div className='container'>
        <h1>Hello</h1>
        <Router history={this.props.appStore.history} path={this.props.appStore.currentPath}>
          {this.props.appStore.isConnected
            ? this.renderAppForAuthenticatedUser()
            : this.renderAuthenticationOrLoading()}
        </Router>
      </div>
    )
  }
}

export default App
