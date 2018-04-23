import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router'

import Button from '../../components/Button'
import Input from '../../components/Input'
import TabNavigation from '../../components/TabNavigation'
import Link from '../../components/Link'

@inject('userStore')
@observer
class Login extends Component {
  updateField = ({ target: { name, value } }) => this.props.userStore.setUserCreation(name, value)
  onLoginSuccessful = () => this.props.history.push('/travels')

  render () {
    const {
      userStore: {
        authenticatingUser: { email, password }
      },
      userStore
    } = this.props

    return (
      <Fragment>
        <Input name='email' placeholder='Email' type='email' value={email} onChange={this.updateField} />
        <Input
          name='password'
          type='password'
          placeholder='Mot de passe'
          value={password}
          onChange={this.updateField}
        />
        <Button onClick={() => userStore.login({ email, password, onSuccess: this.onLoginSuccessful })} color='primary'>
          Se connecter
        </Button>

        <TabNavigation>
          <li
            style={{
              listStyleType: 'none'
            }}>
            <Link to='/login'>Connexion</Link>
          </li>
          <li
            style={{
              listStyleType: 'none'
            }}>
            <Link to='/register'>Inscription</Link>
          </li>
        </TabNavigation>
      </Fragment>
    )
  }
}

export default withRouter(Login)
