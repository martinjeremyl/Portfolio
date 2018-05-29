import { observable, action, computed, toJS, autorun } from 'mobx'
import SpendingApi from '../api/SpendingApi'
import appStore from './AppStore'
import travelStore from './TravelStore'
import UserStore from './UserStore'
import TravelApi from '../api/TravelApi'

class Spending {
  currentSpendingId = observable.box('')
  spendings$ = observable.array([])
  errors = observable.array([])
  spendingCreation = observable({
    id: '',
    date: null,
    name: '',
    amount: '',
    creator: undefined,
    recipients: []
  })

  constructor () {
    this.api = new SpendingApi()
    this.travelApi = new TravelApi()
    autorun(() => {
      if (appStore.isConnected) {
        this.fetchSpendings()
      }
    })
  }

  @computed
  get spendings () {
    return toJS(this.spendings$)
  }

  @computed
  get spending () {
    return toJS(this.spendings$.find(spending => spending.id === this.currentSpendingId.get())[0])
  }

  @action
  setCurrentSpendingId (spendingId) {
    this.currentSpendingId.set(spendingId)
  }

  @action
  async fetchSpendings () {
    let spendings = await this.getAllSpendings()
    this.spendings$.replace(spendings)
  }

  @action
  async fetchPersonalSpendings () {
    let spendings = await this.getAllSpendings()
    let filteredResponse = []
    // J'ai pas trouvé mieu en essayant avec des filter() etc ca ne fonctionnait pas
    spendings.forEach((element, index) => {
      if (element.creator.userId === UserStore.user.uid) {
        filteredResponse[index] = element
      } else if (Array.isArray(element.recipients)) {
        element.recipients.forEach(e => {
          if (e.userId === UserStore.user.uid) {
            filteredResponse[index] = element
          }
        })
      }
    })
    this.spendings$.replace(filteredResponse)
  }

  @action
  async getAllSpendings () {
    const response = await this.travelApi.get(travelStore.currentTravelId.get())
    return response.spendings
  }
  @action
  updateSpendingCreation (key, value) {
    this.spendingCreation[key] = value
  }

  @action
  async clearSpendingCreation () {
    this.setSpendingCreation({
      id: '',
      date: null,
      name: '',
      amount: '',
      creator: undefined,
      recipients: []
    })
  }

  setErrors (key, value) {
    this.errors[key] = value
  }
  @action
  addRecipient (newRecipient) {
    let doublon = this.spendingCreation.recipients.toJS().findIndex(recipient => recipient.id === newRecipient.id)
    if (doublon === -1) {
      this.spendingCreation.recipients.push(newRecipient)
    } else {
      this.spendingCreation.recipients.splice(doublon, 1)
    }
  }

  @action
  setCreator (creator) {
    this.spendingCreation.creator = creator
  }

  @action
  setSpendingCreation (data) {
    this.spendingCreation.id = data.id
    this.spendingCreation.date = data.date
    this.spendingCreation.name = data.name
    this.spendingCreation.amount = data.amount
    this.spendingCreation.creator = data.creator
    this.spendingCreation.recipients = data.recipients
  }
  @action
  async create ({ onSuccess, onError, travelId }) {
    this.errors = {}
    const spending = this.spendingCreation
    this.handleErrors(spending)
    if (spending.errors !== undefined) {
      console.log('in error', spending.errors === undefined)
      onError()
    } else {
      const newSpending = await this.api.create(spending)
      let travel = await this.travelApi.get(travelId)
      if (travel.spendings === undefined) {
        travel.spendings = []
      }
      travel.spendings.push(newSpending)
      this.travelApi.update(travel.id, travel)
      this.spendings$.push(newSpending)
      onSuccess()
    }
  }

  @action
  async update ({ onSuccess, onError, travelId }) {
    this.errors = {}
    const spending = this.spendingCreation
    this.handleErrors(spending)
    if (spending.errors !== undefined) {
      onError()
    } else {
      let travel = await this.travelApi.get(travelId)
      travel.spendings[this.currentSpendingId] = spending
      this.travelApi.update(travel.id, travel)
      this.spendings$[this.currentSpendingId] = spending
      onSuccess()
    }
  }

  handleErrors (spending) {
    if (spending.name.length === 0) {
      this.errors.name = 'Merci de renseigner un nom pour cette dépense'
    } else if (spending.amount.length === 0 || isNaN(spending.amount)) {
      this.errors.amount = 'Merci de renseigner un montant valide'
    } else if (spending.date !== null && spending.date.length === 0) {
      this.errors.date = 'Merci de renseigner une date'
    } else if (spending.creator !== undefined && spending.creator.length < 1 && spending.creator !== '') {
      this.errors.creator = 'Une dépense nécessite un payeur'
    } else if (spending.creator !== null && spending.recipients.length === 0) {
      this.errors.recipients = 'La dépense doit concerner au moins une personne '
    }
  }

  @action
  async delete ({onSuccess, travelId}) {
    let travel = await this.travelApi.get(travelId)
    travel.spendings.splice(this.currentSpendingId, 1)
    this.travelApi.update(travel.id, travel)
    this.spendings$.splice(this.currentSpendingId, 1)
    onSuccess()
  }
}

export default new Spending()
