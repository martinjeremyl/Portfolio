import { observable, action, computed } from 'mobx'

import { auth } from '../config/firebase'
import userStore from './UserStore'

class AppStore {
  connectionStatus = observable.box(false)
  loadingStatus = observable.box(true)
  modalStatus = observable.box(false)

  constructor () {
    auth.onAuthStateChanged(user => {
      if (user && !this.isConnected) {
        userStore.setUser(user.toJSON())
        this.switchConnectionStatus()
      }
    })

    setTimeout(() => {
      this.switchLoadingStatus()
    }, 2000)
  }

  @computed
  get isModalOpen () {
    return this.modalStatus.get()
  }

  @computed
  get isLoading () {
    return this.loadingStatus.get()
  }

  @computed
  get isConnected () {
    return this.connectionStatus.get()
  }

  @action
  switchModalStatus () {
    this.modalStatus.set(!this.modalStatus.get())
  }

  @action
  switchLoadingStatus () {
    this.loadingStatus.set(!this.loadingStatus.get())
  }

  @action
  switchConnectionStatus () {
    this.connectionStatus.set(!this.connectionStatus.get())
  }
}

export default new AppStore()
