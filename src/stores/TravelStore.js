import { observable, action, computed, toJS, autorun } from 'mobx'
import TravelApi from '../api/TravelApi'
import HousingApi from '../api/HousingApi'
import TransportApi from '../api/TransportApi'
import SpendingApi from '../api/SpendingApi'
import UserApi from '../api/UserApi'
import userStore from './UserStore'
import appStore from './AppStore'

class Travel {
  currentTravelId = observable.box('')
  travels = observable.array([])
  travelCreation = observable.object({
    name: { rule: '', value: '' },
    startDate: { rule: '', value: '' },
    endDate: { rule: '', value: '' },
    note: { rule: '', value: '' },
    image: { rule: '', value: '' },
    participants: { rule: '', value: [] },
    modules: { rule: '', value: [] },
    housings: { rule: '', value: [] },
    transports: { rule: '', value: [] },
    spendings: { rule: '', value: [] }
  })

  constructor () {
    this.api = new TravelApi()
    this.housingApi = new HousingApi()
    this.transportApi = new TransportApi()
    this.userApi = new UserApi()
    this.spendingApi = new SpendingApi()
    autorun(() => {
      if (appStore.isConnected) {
        this.fetchTravels()
      }
    })
  }

  @computed
  get participants () {
    return toJS(this.travelCreation.participants.value)
  }

  @computed
  get travel () {
    return toJS(this.travels.find(travel => travel.id === this.currentTravelId.get()))
  }

  @action
  setCurrentTravelId (travelId) {
    this.currentTravelId.set(travelId)
  }

  @action
  async fetchTravels () {
    // On récupère tous les voyages et on les filtre car firebase ne sait pas faire de fonction sql IN il faut le faire en javascript
    const response = await this.api.list()
    const filteredTravels = response.filter(
      travel => travel.participants && travel.participants.includes(userStore.user.uid)
    )
    const finalTravels = await Promise.all(
      filteredTravels.map(async travel => ({
        ...travel,
        members: await Promise.all(
          travel.participants.map(participant =>
            this.userApi.findBy({ field: 'userId', operator: '==', value: participant })
          )
        )
      }))
    )
    this.travels.replace(finalTravels)
  }

  async fetchCurrentTravelParticipants () {
    let travel = await this.api.get(this.currentTravelId.get())
    let currentTravelParticipants = await Promise.all(
      travel.participants.map(participant =>
        this.userApi.findBy({ field: 'userId', operator: '==', value: participant })
      )
    )
    return currentTravelParticipants
  }

  @action
  changeTravelCreationStep (step) {
    this.travelCreationStep = step
  }

  @action
  updateTravelCreation (key, value) {
    const field = this.travelCreation[key]
    switch (typeof field.value) {
      case 'string':
        field.value = value
        break
      case 'object':
        field.value.replace(value)

        // this.travelCreation[key].value.push(value)
        break

      default:
        break
    }
  }

  @action
  async create (data) {
    const newTravel = await this.api.create(data)
    this.travels.push(newTravel)
  }

  @action
  async delete (id) {
    const deletion = await this.api.delete(id)

    if (deletion.error === false) {
      const newTravels = this.travels.filter(travel => travel.id !== id)
      this.travels.replace(newTravels)
      return
    }

    console.error(deletion.detail)
  }
}

export default new Travel()
