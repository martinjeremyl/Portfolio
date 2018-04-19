import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import { Router } from 'react-router-dom'

import Authentication from './pages/Authentication/Authentication'
import Travel from './pages/Travel/TravelPage'

import Navbar from './components/Navbar'
import Loader from './components/Loader'
import { Header } from './components/Header'

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

  renderAuthenticationOrLoading = () => {
    return this.props.appStore.isLoading ? <Loader /> : <Authentication />
  }

  render () {
    return (
      <Fragment>
        <Header />
        <div className='container'>
          <Router history={this.props.routingStore.history}>
            {this.props.appStore.isConnected
              ? this.renderAppForAuthenticatedUser()
              : this.renderAuthenticationOrLoading()}
          </Router>
        </div>
      </Fragment>
    )
  }
}

export default App
