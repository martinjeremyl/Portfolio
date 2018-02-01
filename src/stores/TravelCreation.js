import { observable, action } from 'mobx'
import { database } from '~/config/firebase'

class TravelCreation {
  @observable name = ''
  @observable dateBegin = ''
  @observable dateEnd = ''
  @observable modules = []
  @observable emails = []

  @action
  addName (name) {
    this.name = name
  }

  @action
  addDateBegin (dateBegin) {
    this.dateBegin = dateBegin
  }

  @action
  addDateEnd (dateEnd) {
    this.dateEnd = dateEnd
  }

  @action
  addModules (modules) {
    this.modules = modules
  }

  @action
  addEmails (emails) {
    this.emails = emails
  }

  createTravel () {
    const travelRef = database.ref('travels').push({
      name: this.name,
      dateBegin: this.dateBegin,
      dateEnd: this.dateEnd
    })

    this.emails.forEach(email => {
      database.refFromURL(`${travelRef.toString()}/emails`).push(email)
    })

    this.modules.forEach(module => {
      database.refFromURL(`${travelRef.toString()}/modules`).push(module)
    })
    this.sendNewTravelMail()
  }

  sendNewTravelMail () {
    fetch('http://vps507792.ovh.net/travel/new', {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      // firstparam=value&secondParam=value&thirdParam=value ...
      body: `name=${this.name}&dateBegin=${this.dateBegin}&dateEnd=${this.dateEnd}&modules[]=${this.getEnabledModulesValues()}&emails[]=${this.emails}`
    })
  }

getEnabledModulesValues = () => this.modules
  .filter(module => module.checked)
  .map(module => module.value)
}

export default new TravelCreation()
