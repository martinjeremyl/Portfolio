import { observable, action, computed } from 'mobx'
import createHistory from 'history/createBrowserHistory'

import { auth } from '../config/firebase'
import userStore from './UserStore'

class AppStore {
  history = observable(createHistory())
  path = observable.box('')
  connectionStatus = observable.box(false)
  loadingStatus = observable.box(true)
  modalStatus = observable.box(false)

  constructor () {
    auth.onAuthStateChanged(user => {
      if (user && !this.isConnected) {
        userStore.setUser(user.toJSON())
        this.switchConnectionStatus()
        this.pushToHistory('/travels')
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

  @computed
  get currentPath () {
    return this.path.get()
  }

  @action
  pushToHistory (path) {
    this.history.push(path)
    this.path.set(path)
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
