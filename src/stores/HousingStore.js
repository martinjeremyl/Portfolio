import { observable, action, computed, toJS, autorun } from 'mobx'
import HousingApi from '../api/HousingApi'
import appStore from './AppStore'
import travelStore from './travelStore'

class Housing {
  currentHousingId = observable.box('')
  Housings$ = observable.array([])
  @observable
  housingCreation = {
    id: '',
    name: '',
    startDate: '',
    endDate: '',
    icon: '',
    contact: '',
    notes: '',
    members: []
  }

  constructor () {
    this.api = new HousingApi()

    autorun(() => {
      if (appStore.isConnected) {
        this.fetchHousings()
      }
    })
  }

  @computed
  get Housings () {
    return toJS(this.Housings$)
  }

  @computed
  get Housing () {
    return toJS(this.Housings$.find(Housing => Housing.id === this.currentHousingId.get())[0])
  }

  @action
  setCurrentHousingId (HousingId) {
    this.currentHousingId.set(HousingId)
  }

  @action
  async fetchHousings () {
    const response = await this.api.list({
      field: 'travelId',
      operator: '==',
      value: travelStore.currentTravelId
    })

    this.Housings$.replace(response)
  }

  @action
  async create (data) {
    const newHousing = await this.api.create(data)

    this.Housings$.push(newHousing)
  }

  @action
  async delete (id) {
    const deletion = await this.api.delete(id)

    if (deletion.error === false) {
      const newHousings$ = this.Housings$.filter(Housing => Housing.id !== id)
      this.Housings$.replace(newHousings$)
    }
  }
}

export default new Housing()
