import { observable, action } from 'mobx'

import { login, logout, register } from '../api/AuthenticationApi'
import { uploadFile } from '../api/StorageApi'
import appStore from './AppStore'
import UserApi from '../api/UserApi'

class User {
  constructor () {
    this.api = new UserApi()
  }
  user = observable.object({})
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
  async login ({ email, password, onSuccess }) {
    try {
      const user = await login({ email, password })
      this.setUser(user)
      onSuccess()
    } catch (error) {
      let errorCode = error.code
      let errorMessage = error.message
      // Par défaut on met l'erreur sur le champ email
      let input = 'email'
      if (errorCode === 'auth/invalid-email' || 'auth/user-not-found' || 'auth/user-disabled') {
        input = 'email'
      }
      if (errorCode === 'auth/wrong-password') {
        input = 'password'
      }
      this.authenticatingUser.error.push({ input: input, message: errorMessage })
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
    const user = await register(registrationInformations)
    uploadFile(`avatars/${user.uid}`, this.authenticatingUser.avatar)
    this.authenticatingUser.avatar = `avatars/${user.uid}`
    this.authenticatingUser.userId = user.uid
    const { name, surname, email, userId, avatar } = this.authenticatingUser
    this.api.create({ name, surname, email, userId, avatar })
    this.setUser(user)
  }

  @action
  setUserCreation (key, value) {
    this.authenticatingUser[key] = value
  }
}

export default new User()
