import FirebaseRequestApi from './FirebaseRequestApi'

class UserApi extends FirebaseRequestApi {
  constructor () {
    super('users')
  }
}

export default UserApi
