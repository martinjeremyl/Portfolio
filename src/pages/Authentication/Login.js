import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter, Link } from 'react-router-dom'
import Button from '../../components/Button'
import Input from '../../components/Input'

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

    const logo = require('../../img/Logo_Traveled_V4.png')
    const backgroundImage = require('../../img/Fond_Inscription-connexion_Menu_V2.png')
    return (
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          width: '100%',
          height: '100%',
          margin: '0',
          padding: '0',
          textAlign: 'center'
        }}
      >
        <div
          style={{
            paddingTop: '100px'
          }}
        >
          <img
            src={`${logo}`}
            style={{
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
            whiteInput
            onChange={this.updateField}
          />
          <Button
            onClick={() => {
              userStore.login({
                email,
                password,
                onSuccess: this.onLoginSuccessful
              })
            }}
            value='Connexion'
            style={{
              background: 'linear-gradient(to left, #F2BF95, #E45C55)',
              color: 'white',
              width: '70%',
              marginTop: '150px'
            }}
          />

          <Link
            to='/register'
            style={{
              display: 'block',
              color: 'white',
              marginTop: '40px',
              textDecoration: 'none'
            }}
          >
            S'inscrire
          </Link>
        </div>
      </div>
    )
  }
}
export default withRouter(Login)
