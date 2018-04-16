import { observable, action } from 'mobx'

import { login, logout, register } from '../api/AuthenticationApi'
import { uploadFile } from '../api/StorageApi'
import appStore from './AppStore'

class User {
  user = observable.object({})
  authenticatingUser = observable.object({
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirmation: '',
    avatar: null
  })

  @action
  setUser (user) {
    this.user = user
  }

  @action
  async login (credentials) {
    const user = await login(credentials)

    this.setUser(user)
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
    this.setUser(user)
  }

  @action
  setUserCreation (key, value) {
    this.authenticatingUser[key] = value
  }
}

export default new User()
