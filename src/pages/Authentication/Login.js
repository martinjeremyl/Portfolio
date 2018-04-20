import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router'

import Button from '../../components/Button'
import Input from '../../components/Input'

@inject('userStore')
@observer
class Login extends Component {
  render () {
    const {
      userStore: {
        authenticatingUser: { email, password }
      },
      updateField,
      userStore
    } = this.props

    return (
      <Fragment>
        <Input name='email' placeholder='Email' type='email' value={email} onChange={updateField} />
        <Input
          name='password'
          type='password'
          placeholder='Mot de passe'
          value={password}
          onChange={updateField}
        />
        <Button onClick={() => { userStore.login({ email, password }) }} color='primary'>
          Se connecter
        </Button>
      </Fragment>
    )
  }
}

export default withRouter(Login)
