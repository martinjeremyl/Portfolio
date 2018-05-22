import FirebaseRequestApi from './FirebaseRequestApi'

class HousingApi extends FirebaseRequestApi {
  constructor () {
    super('housings')
  }
}

export default HousingApi
