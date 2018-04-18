import { observable, action, computed, toJS, autorun } from 'mobx'
import SpendingApi from '../api/SpendingApi'
import appStore from './AppStore'
import travelStore from './travelStore'

class Spending {
  currentSpendingId = observable.box('')
  spendings$ = observable.array([])

  @observable
  spendingCreation = {
    id: '',
    date: '',
    label: '',
    amount: '',
    creator: '',
    recipients: []
  }

  constructor () {
    this.api = new SpendingApi()

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
      value: travelStore.currentTravelId
    })

    this.spendings$.replace(response)
  }

  @action
  async create (data) {
    const newSpending = await this.api.create(data)
    this.spendings$.push(newSpending)
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
