import { LOGEMENTS, TRANSPORTS, DEPENSES, ACTIVITES, DOCUMENTS, LISTES } from './constants'

/**
 * Méthode renvoyant le libellé du module en fonction de son id
 * @param {*} nIdModule id du libellé du module
 */
export function getModuleNameById (nIdModule) {
  switch (nIdModule) {
    case 0:
      return LOGEMENTS

    case 1:
      return TRANSPORTS

    case 2:
      return DEPENSES

    case 3:
      return ACTIVITES

    case 4:
      return DOCUMENTS

    case 5:
      return LISTES

    default :
      return 'INCONNU'
  }
}

export function snapshotToArray (snapshot) {
  let returnArr = []

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val()
    item.key = childSnapshot.key
    returnArr.push(item)
  })

  return returnArr
}
