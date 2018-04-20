import FirebaseRequestApi from './FirebaseRequestApi'

class ModuleApi extends FirebaseRequestApi {
  constructor () {
    super('modules')
  }
}

export default ModuleApi
