import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter, Link } from 'react-router-dom'
import Input from '../../components/Input'
import Button from '../../components/Button'
import MaterialDatePicker from '../../components/DatePicker'
import ImageUpload from '../../components/ImageUpload'

@inject('userStore')
@observer
class Registration extends Component {
  updateField = ({ target: { name, value } }) => this.props.userStore.setUserCreation(name, value)

  render () {
    const {
      userStore: { authenticatingUser },
      userStore
    } = this.props
    const { email, password, name, firstname, passwordConfirmation, birthday } = authenticatingUser
    const styles = {
      input: {
        width: '70%',
        marginTop: '30px'
      },
      button: {
        background: 'linear-gradient(to left, #F2BF95, #E45C55)',
        color: 'white',
        width: '70%',
        marginTop: '30px'
      },
      primary: {
        color: 'white',
        backgroundColor: 'white'
      }
    }
    const logo = require('../../img/Logo_Traveled_V4.png')
    const backgroundImage = require('../../img/Fond_Inscription-connexion_Menu_V2.png')
    return (
      <Fragment>
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
          <img
            src={`${logo}`}
            style={{
              maxWidth: '40%',
              height: 'auto',
              marginTop: '20px'
            }}
          />
          <Input
            name='name'
            style={styles.input}
            placeholder='Nom'
            value={name}
            whiteInput
            onChange={this.updateField}
          />
          <Input
            name='firstname'
            style={styles.input}
            placeholder='Prénom'
            value={firstname}
            whiteInput
            onChange={this.updateField}
          />
          <Input
            name='email'
            style={styles.input}
            placeholder='Email'
            type='email'
            value={email}
            whiteInput
            onChange={this.updateField}
          />
          <MaterialDatePicker
            name='birthday'
            style={styles.input}
            value={birthday}
            whiteInput
            onChange={this.updateField}
          />
          <Input
            name='password'
            style={styles.input}
            type='password'
            placeholder='Mot de passe'
            value={password}
            whiteInput
            onChange={this.updateField}
          />
          <Input
            name='passwordConfirmation'
            style={styles.input}
            type='password'
            placeholder='Confirmation du mot de passe'
            value={passwordConfirmation}
            whiteInput
            onChange={this.updateField}
          />
          <ImageUpload
            imageCallback={image => {
              userStore.setUserCreation('avatar', image)
            }}
          />
          <Button
            style={styles.button}
            onClick={() => {
              userStore.register(authenticatingUser)
            }}
          >
            S'inscrire
          </Button>
          <Link
            to='/login'
            style={{
              display: 'block',
              color: 'white',
              marginTop: '40px',
              textDecoration: 'none'
            }}
          >
            Se connecter
          </Link>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(Registration)
