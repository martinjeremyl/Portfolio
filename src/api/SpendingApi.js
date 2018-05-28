import FirebaseRequestApi from './FirebaseRequestApi'

class SpendingApi extends FirebaseRequestApi {
  constructor () {
    super('spendings')
  }
}

export default SpendingApi
