import { observable, action, computed } from 'mobx'
import { database } from '../config/firebase'

class Housing {
  @observable housings = []

  @action
  async removeHousing (voyageId, housingName) {
    const nextHousings = this.housings.filter(housing => housing.nom !== housingName)
    this.housings.replace(nextHousings)

    const logementsSnapshot = await database
      .ref(`voyages/${voyageId}/logements`)
      .orderByChild('nom')
      .equalTo(housingName)
      .once('value')

    logementsSnapshot.forEach(async logementSnapshot => {
      await database
        .ref(`voyages/${voyageId}/logements/${logementSnapshot.key}`)
        .remove()
    })
  }

  @action
  pushHousings (housings) {
    housings.filter(Boolean).forEach(housing => {
      housing.membres.forEach((member, key) => {
        database
          .ref(`utilisateurs/${member}`)
          .once('value')
          .then(userSnapshot => {
            housing.membres[key] = userSnapshot.val()
          })
      })
      this.housings.push(housing)
    })
  }

  @action
  fetchHousings () {
    database
      .ref('voyages')
      .once('value')
      .then(snapshot => {
        snapshot.forEach(item => {
          const itemValue = item.val().logements

          itemValue.forEach(({ membres }) => {
            membres.forEach((member, key) => {
              database
                .ref(`utilisateurs/${member}`)
                .once('value')
                .then(userSnapshot => {
                  membres[key] = userSnapshot.val()
                })
            })
          })

          this.housings.push(itemValue)
        })
      })
  }

  @computed
  get getHousings () {
    return this.housings
  }
}

export default new Housing()
