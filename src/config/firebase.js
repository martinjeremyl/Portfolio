import firebase from 'firebase'
require('firebase/firestore')

const config = {
  apiKey: 'AIzaSyAHsxMs7yPWdBGtRqNfwMDBhpkHF-40tpo',
  authDomain: 'travel-11111.firebaseapp.com',
  databaseURL: 'https://travel-11111.firebaseio.com',
  projectId: 'travel-11111',
  storageBucket: 'travel-11111.appspot.com',
  messagingSenderId: '87555264108'
}
firebase.initializeApp(config)

export const db = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()

export default firebase
