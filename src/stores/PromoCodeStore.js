import { observable, action, computed, toJS, autorun } from 'mobx'
import PromoCodeApi from '../api/PromoCodeApi'
import appStore from './AppStore'
import travelStore from './travelStore'

class PromoCode {
  currentPromoCodeId = observable.box('')
  PromoCodes$ = observable.array([])
  @observable
  PromoCodeCreation = {
    id: '',
    label: '',
    value: '',
    validityStartDate: '',
    expirationDate: '',
    users: []
  }

  constructor () {
    this.api = new PromoCodeApi()

    autorun(() => {
      if (appStore.isConnected) {
        this.fetchPromoCodes()
      }
    })
  }

  @computed
  get PromoCodes () {
    return toJS(this.PromoCodes$)
  }

  @computed
  get PromoCode () {
    return toJS(this.PromoCodes$.find(PromoCode => PromoCode.id === this.currentPromoCodeId.get())[0])
  }

  @action
  setCurrentPromoCodeId (PromoCodeId) {
    this.currentPromoCodeId.set(PromoCodeId)
  }

  @action
  async fetchPromoCodes () {
    const response = await this.api.list({
      field: 'travelId',
      operator: '==',
      value: travelStore.currentTravelId
    })

    this.PromoCodes$.replace(response)
  }

  @action
  async create (data) {
    const newPromoCode = await this.api.createthis.api.create(data)
    this.PromoCodes$.push(newPromoCode)
  }

  @action
  async delete (id) {
    const deletion = await this.api.delete(id)

    if (deletion.error === false) {
      const newPromoCodes$ = this.PromoCodes$.filter(PromoCode => PromoCode.id !== id)
      this.PromoCodes$.replace(newPromoCodes$)
    }
  }
}

export default new PromoCode()
