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
  async list (whereClause = { field: null, operator: null, value: null }) {
    const { field, operator, value } = whereClause

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
  get (id) {
    return db
      .collection(this.collection)
      .doc(id)
      .get()
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
