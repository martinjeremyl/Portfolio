import FirebaseRequestApi from './FirebaseRequestApi'

class TransportApi extends FirebaseRequestApi {
  constructor () {
    super('transports')
  }
}

export default TransportApi
