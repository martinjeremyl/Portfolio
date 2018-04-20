import { observable, action, computed, toJS, autorun } from 'mobx'
import TravelApi from '../api/TravelApi'
import HousingApi from '../api/HousingApi'
import TransportApi from '../api/TransportApi'
import SpendingApi from '../api/SpendingApi'
import userStore from './UserStore'
import appStore from './AppStore'

class Travel {
  currentTravelId = observable.box('')
  travels$ = observable.array([])
  @observable
  travelCreation = {
    id: '',
    name: '',
    startDate: '',
    endDate: '',
    icon: '',
    members: [],
    modules: [],
    housings: [],
    transports: [],
    spendings: []
  }
  @observable travelCreationStep = 1

  constructor () {
    this.api = new TravelApi()
    this.housingApi = new HousingApi()
    this.transportApi = new TransportApi()
    this.spendingApi = new SpendingApi()
    autorun(() => {
      if (appStore.isConnected) {
        this.fetchTravels()
      }
    })
  }

  @computed
  get travels () {
    return toJS(this.travels$)
  }

  @computed
  get travel () {
    return toJS(this.travels$.find(travel => travel.id === this.currentTravelId.get()))
  }

  @action
  setCurrentTravelId (travelId) {
    this.currentTravelId.set(travelId)
  }

  @action
  async fetchTravels () {
    // On récupère tous les voyages et on les filtre car firebase ne sait pas faire de fonction sql IN il faut le faire en javascript
    const response = await this.api.list()
    const filteredTravels = response.filter(travel => travel.members && travel.members.includes(userStore.user.uid))
    this.travels$.replace(filteredTravels)
  }

  @action
  changeTravelCreationStep (step) {
    this.travelCreationStep = step
  }

  @action
  updateTravelCreation (key, value) {
    this.travelCreation[key] = value
  }

  @action
  async create (data) {
    const newTravel = await this.api.create(data)
    this.travels$.push(newTravel)
  }

  @action
  async delete (id) {
    const deletion = await this.api.delete(id)

    if (deletion.error === false) {
      const newTravels$ = this.travels$.filter(travel => travel.id !== id)
      this.travels$.replace(newTravels$)
      return
    }

    console.error(deletion.detail)
  }
}

export default new Travel()
