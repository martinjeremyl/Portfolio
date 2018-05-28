import { observable, action, computed, toJS, autorun } from 'mobx'
import SpendingApi from '../api/SpendingApi'
import appStore from './AppStore'
import travelStore from './TravelStore'
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
    creator: '',
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
    const response = await this.api.list({
      field: 'travelId',
      operator: '==',
      value: travelStore.currentTravelId.get()
    })
    this.spendings$.replace(response)
  }

  @action
  updateSpendingCreation (key, value) {
    this.spendingCreation[key] = value
  }

  @action
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
  async create ({ onSuccess, onError, travelId }) {
    this.errors = {}
    const spending = this.spendingCreation
    if (spending.name.length === 0) {
      this.errors.name = 'Merci de renseigner un nom pour cette dépense'
      onError()
    } else if (spending.amount.length === 0 || isNaN(spending.amount)) {
      this.errors.amount = 'Merci de renseigner un montant valide'
      onError()
    } else if (spending.date !== null && spending.date.length === 0) {
      this.errors.date = 'Merci de renseigner une date'
      onError()
    } else if (spending.creator === undefined && spending.creator !== '') {
      this.errors.creator = 'Une dépense nécessite un payeur'
      onError()
    } else if (spending.recipients.length === 0) {
      this.errors.recipients = 'La dépense doit concerner au moins une personne '
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
  async delete (id) {
    const deletion = await this.api.delete(id)

    if (deletion.error === false) {
      const newSpendings$ = this.spendings$.filter(spending => spending.id !== id)
      this.spendings$.replace(newSpendings$)
    }
  }
}

export default new Spending()
