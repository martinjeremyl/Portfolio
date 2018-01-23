import { observable, computed } from 'mobx'
import { db } from '../config/firebase'

class ModuleListeStores {
  static id = 0;
  @observable modulesListe = [];

  constructor () {
    db.collection('modulesVoyage').onSnapshot(querySnapshot => {
      this.modulesListe = []
      querySnapshot.forEach(doc => {
        this.modulesListe.push({ ...doc.data(), id: doc.id })
      })
    })
  }

  @computed
  get allMyModules () {
    console.log('here', this.modulesListe)
    return this.modulesListe
  }
}

export default new ModuleListeStores()
