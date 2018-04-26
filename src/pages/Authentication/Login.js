import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter, Link } from 'react-router-dom'
import Button from '../../components/Button'
import Input from '../../components/Input'

@inject('userStore')
@observer
class Login extends Component {
  updateField = ({ target: { name, value } }) => this.props.userStore.setUserCreation(name, value)
  onLoginSuccessful = () => {
    this.props.history.push('/travels')
  }

  render () {
    const {
      userStore: {
        authenticatingUser: { email, password }
      },
      userStore
    } = this.props
    const logo = require('../../img/Logo_Traveled_V4.png')
    const backgroundImage = require('../../img/Fond_Inscription-connexion_Menu_V2.png')
    return (
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          width: '100%',
          height: '100vh',
          margin: '0',
          padding: '0',
          textAlign: 'center'
        }}
      >
        <img
          src={`${logo}`}
          style={{
            marginTop: '15%',
            maxWidth: '50%',
            height: 'auto'
          }}
        />
        <Input
          style={{
            width: '70%',
            marginTop: '40px'
          }}
          name='email'
          placeholder='Email'
          type='email'
          value={email}
          error={userStore.error && userStore.error.email !== undefined}
          label={userStore.error && userStore.error.email !== undefined ? userStore.error.email : ''}
          whiteInput
          onChange={this.updateField}
        />
        <Input
          style={{
            width: '70%',
            marginTop: '40px',
            textAlign: 'center'
          }}
          name='password'
          type='password'
          placeholder='Mot de passe'
          value={password}
          error={userStore.error && userStore.error.password !== undefined}
          label={userStore.error && userStore.error.password !== undefined ? userStore.error.password : ''}
          whiteInput
          onChange={this.updateField}
        />
        <Button
          onClick={() => {
            userStore.login({
              email,
              password,
              onSuccess: this.onLoginSuccessful,
              onError: () => this.setState({})
            })
          }}
          value='Connexion'
          style={{
            background: 'linear-gradient(to left, #F2BF95, #E45C55)',
            color: 'white',
            width: '70%',
            marginTop: '50%'
          }}
        />

        <Link
          to='/register'
          style={{
            display: 'block',
            color: 'white',
            paddingTop: '20px',
            textDecoration: 'none'
          }}
        >
            S'inscrire
        </Link>
      </div>
    )
  }
}
export default withRouter(Login)
