import { observable, action, computed, toJS, autorun } from 'mobx'
import TravelApi from '../api/TravelApi'
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
    return toJS(this.travels$.filter(travel => travel.id === this.currentTravelId.get())[0])
  }

  @action
  setCurrentTravelId (travelId) {
    this.currentTravelId.set(travelId)
  }

  @action
  setUserId (userId) {
    this.userId = userId
  }

  @action
  async fetchTravels () {
    const response = await this.api.list({
      field: 'userId',
      operator: '==',
      value: userStore.user.uid
    })

    this.travels$.replace(response)
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
    const newTravel = await this.api.create({
      ...data,
      userId: userStore.user.uid
    })

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
