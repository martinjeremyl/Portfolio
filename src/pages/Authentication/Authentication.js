import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'

@inject('appStore')
@observer
class Authentication extends Component {
  render () {
    return this.props.appStore.isConnected
      ? <Redirect to='/travels' />
      : <Redirect to='/login' />
  }
}

export default withRouter(Authentication)
