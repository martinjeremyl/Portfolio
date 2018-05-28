import firebase from 'firebase'
require('firebase/firestore')

const config = {
  apiKey: 'AIzaSyDc9dPoVsErzdcPsjTNyax6A5CsohZehSo',
  authDomain: 'traveled-81d5c.firebaseapp.com',
  databaseURL: 'https://traveled-81d5c.firebaseio.com',
  projectId: 'traveled-81d5c',
  storageBucket: 'traveled-81d5c.appspot.com',
  messagingSenderId: '272676831426'
}
firebase.initializeApp(config)

const firestoreSettings = {
  timestampsInSnapshots: true
}
export const db = firebase.firestore()
db.settings(firestoreSettings)
export const auth = firebase.auth()
export const storage = firebase.storage()

export default firebase
