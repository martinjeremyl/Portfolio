import { observable, action, computed, toJS, autorun } from 'mobx'
import TransportApi from '../api/TransportApi'
import appStore from './AppStore'
import travelStore from './travelStore'

class Transport {
  currentTransportId = observable.box('')
  Transports$ = observable.array([])
  @observable
  TransportCreation = {
    id: '',
    name: '',
    startDate: '',
    endDate: '',
    notes: '',
    icon: '',
    members: []
  }

  constructor () {
    this.api = new TransportApi()

    autorun(() => {
      if (appStore.isConnected) {
        this.fetchTransports()
      }
    })
  }

  @computed
  get Transports () {
    return toJS(this.Transports$)
  }

  @computed
  get Transport () {
    return toJS(this.Transports$.find(Transport => Transport.id === this.currentTransportId.get())[0])
  }

  @action
  setCurrentTransportId (TransportId) {
    this.currentTransportId.set(TransportId)
  }

  @action
  async fetchTransports () {
    const response = await this.api.list({
      field: 'travelId',
      operator: '==',
      value: travelStore.currentTravelId
    })

    this.Transports$.replace(response)
  }

  @action
  async create (data) {
    const newTransport = await this.api.create(data)
    this.Transports$.push(newTransport)
  }

  @action
  async delete (id) {
    const deletion = await this.api.delete(id)

    if (deletion.error === false) {
      const newTransports$ = this.Transports$.filter(Transport => Transport.id !== id)
      this.Transports$.replace(newTransports$)
    }
  }
}

export default new Transport()
