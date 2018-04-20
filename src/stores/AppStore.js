import { observable, action, computed, toJS } from 'mobx'

import { auth } from '../config/firebase'
import userStore from './UserStore'

import ModuleApi from '../api/ModuleApi'

class AppStore {
  connectionStatus = observable.box(false)
  loadingStatus = observable.box(true)
  allModules$ = observable.array([])
  modalStatus = observable.box(false)
  confirmDeleteDialogStatus = observable.box(false) // Indique si la fenêtre de dialogue est ouverte ou non
  idObjectToDelete = observable.box('') // l'Id de l'objet séléctionné pour la suppression

  constructor () {
    // Récupération de la liste de tous les modules
    this.moduleApi = new ModuleApi()
    this.fetchAllModules()

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
  get allModules () {
    return toJS(this.allModules$)
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
  async fetchAllModules () {
    // On récupère la liste des modules grâce à l'API
    const response = await this.moduleApi.list()
    this.allModules$.replace(response)
  }

  @action
  switchModalStatus () {
    this.modalStatus.set(!this.modalStatus.get())
  }

  @action
  openConfirmDeleteDialog (idObject) {
    // Ouvre la fenêtre de confirmation et stocke l'id de l'objet à supprimer dans le store
    this.idObjectToDelete.set(idObject)
    this.confirmDeleteDialogStatus.set(true)
  }

  @action
  closeConfirmDeleteDialog () {
    this.confirmDeleteDialogStatus.set(false)
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
