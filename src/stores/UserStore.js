import { observable, action } from 'mobx'
import { login, logout, register } from '../api/AuthenticationApi'
import { uploadFile } from '../api/StorageApi'
import appStore from './AppStore'
import UserApi from '../api/UserApi'
import moment from 'moment'

class User {
  constructor () {
    this.api = new UserApi()
  }
  user = observable.object({})
  error = observable.object({})
  authenticatingUser = observable.object({
    name: '',
    surname: '',
    email: '',
    phone: '',
    password: '',
    birthday: null,
    userId: null,
    passwordConfirmation: '',
    avatar: null,
    error: []
  })

  @action
  setUser (user) {
    this.user = user
  }

  @action
  setError (key, value) {
    this.error[key] = value
  }

  @action
  async login ({ email, password, onSuccess, onError }) {
    try {
      const user = await login({ email, password })
      this.setUser(user)
      onSuccess()
    } catch (error) {
      this.error = {}
      let errorCode = error.code
      let errorMessage = error.message
      // Par défaut on met l'erreur sur le champ email
      let input = 'email'
      if (errorCode === 'auth/invalid-email' || errorCode === 'auth/user-not-found' || errorCode === 'auth/user-disabled') {
        input = 'email'
      }
      if (errorCode === 'auth/wrong-password') {
        input = 'password'
      }
      this.setError(input, errorMessage)
      onError()
    }
  }

  @action
  async logout () {
    await logout()
    this.setUser(null)
    appStore.switchConnectionStatus()
  }

  @action
  async register (registrationInformations) {
    this.error = {}
    this.validateInputs(this.authenticatingUser)
    if (Object.keys(this.error).length === 0) {
      const user = await register(registrationInformations)
      if (user.uid !== undefined) {
        if (this.authenticatingUser.avatar !== undefined) {
          uploadFile(`avatars/${user.uid}`, this.authenticatingUser.avatar)
          this.authenticatingUser.avatar = `avatars/${user.uid}`
        }
        this.authenticatingUser.userId = user.uid
        const { name, surname, email, userId, avatar, birthday } = this.authenticatingUser
        this.api.create({ name, surname, email, userId, avatar, birthday })
        this.setUser(user)
      }
      this.authenticatingUser.userId = user.uid
      const { name, surname, email, userId, avatar, birthday } = this.authenticatingUser
      this.api.create({ name, surname, email, userId, avatar, birthday })
      let password = this.authenticatingUser.password
      const connectedUser = await login({ email, password })
      this.setUser(connectedUser)
    }
  }

  @action
  setUserCreation (key, value) {
    this.authenticatingUser[key] = value
    if (key === 'password' && this.authenticatingUser.passwordConfirmation.length > 0 && this.authenticatingUser.passwordConfirmation !== value) {
      this.setError(key, 'Les deux mots de passe sont différents')
    } else {
      this.error.password = undefined // Retire l'erreur quand c'est juste
    }
    if (key === 'passwordConfirmation' && this.authenticatingUser.password !== value) {
      this.setError(key, 'Les deux mots de passe sont différents')
    } else {
      this.error.passwordConfirmation = undefined // Retire l'erreur quand c'est juste
    }
  }

  validateEmail (email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }
  validateInputs (inputs) {
    Object.keys(inputs).map(
      (item) => {
        switch (item) {
          case 'name':
            if (inputs[item] === '') {
              this.setError(item, 'Veuillez saisir votre nom')
            }
            break
          case 'surname':
            if (inputs[item] === '') {
              this.setError(item, 'Veuillez saisir votre prénom')
            }
            break
          case 'email':
            if (!this.validateEmail(inputs[item])) {
              this.setError(item, "Cette adresse email n'est pas valide")
            }
            break
          case 'password':
            if (inputs[item].length < 8) {
              this.setError(item, 'Le mot de passe doit faire au moins 8 caractères')
            } else if (inputs[item] !== inputs['passwordConfirmation']) {
              this.setError(item, 'Les deux mots de passe sont différents')
            }
            break
          case 'birthday':
            let date = moment(inputs[item])
            if (!date.isValid()) {
              this.setError(item, 'Le format de date est invalide')
            }
            break
          default:
            break
        }
      }
    )
  }
}

export default new User()
