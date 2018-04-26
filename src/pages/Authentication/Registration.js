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
  updateBirthdayField = (value) => this.props.userStore.setUserCreation('birthday', value.format())

  onLoginSuccessful = () => {
    this.props.history.push('/travels')
  }

  render () {
    const {
      userStore
    } = this.props
    const { email, password, name, surname, passwordConfirmation, birthday } = userStore.authenticatingUser
    const styles = {
      input: {
        width: '70%',
        marginTop: '30px'
      },
      button: {
        background: 'linear-gradient(to left, #F2BF95, #E45C55)',
        color: 'white',
        width: '70%',
        marginTop: '40px'
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
            backgroundAttachment: 'fixed',
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
            required
            error={userStore.error && userStore.error.name !== undefined}
            label={userStore.error && userStore.error.name !== undefined ? userStore.error.name : ''}
            onChange={this.updateField}
          />
          <Input
            name='surname'
            style={styles.input}
            placeholder='Prénom'
            value={surname}
            whiteInput
            required
            error={userStore.error && userStore.error.surname !== undefined}
            label={userStore.error && userStore.error.surname !== undefined ? userStore.error.surname : ''}
            onChange={this.updateField}
          />
          <Input
            name='email'
            style={styles.input}
            placeholder='Email'
            type='email'
            value={email}
            required
            error={userStore.error && userStore.error.email !== undefined}
            label={userStore.error && userStore.error.email !== undefined ? userStore.error.email : ''}
            whiteInput
            onChange={this.updateField}
          />
          <MaterialDatePicker
            name='birthday'
            style={styles.input}
            value={birthday}
            error={userStore.error && userStore.error.birthday !== undefined}
            label={userStore.error && userStore.error.birthday !== undefined ? userStore.error.birthday : ''}
            whiteInput
            onChange={this.updateBirthdayField}
          />
          <Input
            name='password'
            style={styles.input}
            type='password'
            placeholder='Mot de passe'
            value={password}
            error={userStore.error && userStore.error.password !== undefined}
            label={userStore.error && userStore.error.password !== undefined ? userStore.error.password : ''}
            whiteInput
            onChange={this.updateField}
          />
          <Input
            name='passwordConfirmation'
            style={styles.input}
            type='password'
            placeholder='Confirmation du mot de passe'
            value={passwordConfirmation}
            error={userStore.error.passwordConfirmation !== undefined}
            label={userStore.error.passwordConfirmation !== undefined ? userStore.error.passwordConfirmation : ''}
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
              userStore.register(userStore.authenticatingUser)
              if (Object.keys(userStore.error).length === 0) {
                this.setState({})
                userStore.login({
                  email,
                  password,
                  onSuccess: this.onLoginSuccessful,
                  onError: () => this.setState({})
                })
              } else {
                this.setState({})
              }
            }}
            value="S'inscrire"
          />
          <Link
            to='/login'
            style={{
              display: 'block',
              color: 'white',
              paddingTop: '20px',
              paddingBottom: '20px',
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
