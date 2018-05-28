import { db } from '../config/firebase'

class FirebaseRequestApi {
  constructor (collection) {
    this.collection = collection
  }

  /**
   * Prend une list snapshot de document et retourne les données au format JSON
   * @param {*} docs
   */
  static convertDocumentsSnapshotToJson (docs) {
    return docs.map(doc => {
      return { id: doc.id, ...doc.data() }
    })
  }

  /**
   * Prend une list snapshot de document et retourne les données au format JSON
   * @param {*} doc
   */
  static convertDocumentSnapshotToJson (doc) {
    return { id: doc.id, ...doc.data() }
  }

  async create (data) {
    const newDocument = await db.collection(this.collection).add(data)
    const newDocumentSnapshot = await newDocument.get()

    return FirebaseRequestApi.convertDocumentSnapshotToJson(newDocumentSnapshot)
  }

  /**
   * Liste les documents d'une collection
   * @param {*} whereClause Paramètre optionnel ajoutant une clause where sur la requête
   */
  async list ({ field = null, operator = null, value = null } = {}) {
    if (field && operator && value) {
      return FirebaseRequestApi.convertDocumentsSnapshotToJson(
        (await db
          .collection(this.collection)
          .where(field, operator, value)
          .get()).docs
      )
    }

    return FirebaseRequestApi.convertDocumentsSnapshotToJson(
      (await db.collection(this.collection).get()).docs
    )
  }

  // TODO: use convertDocumentsSnapshotToJson()
  async get (id) {
    let object = await db.collection(this.collection).doc(id).get()
    return FirebaseRequestApi.convertDocumentSnapshotToJson(object)
  }

  async getSubCollection (id, subCollection) {
    // Get the sub collection of an object. Return an empty array if there are none
    let object = await db.collection(this.collection).doc(id).collection(subCollection).get()
    if (object) {
      return FirebaseRequestApi.convertDocumentsSnapshotToJson(object.docs)
    }
    return []
  }

  async findBy ({ field = null, operator = null, value = null } = {}) {
    // Désolé
    return (await this.list({ field, operator, value }))[0]
  }

  // TODO: return OK response
  update (id, data) {
    db
      .collection(this.collection)
      .doc(id)
      .update(data)
  }

  /**
   * Supprime un document
   * @param {*} id
   */
  async delete (id) {
    try {
      await db
        .collection(this.collection)
        .doc(id)
        .delete()

      return { error: false }
    } catch (error) {
      return { error: true, detail: error }
    }
  }
}

export default FirebaseRequestApi
