import firebase, { auth } from '../config/firebase'

export const register = async ({ email, password, name, phone }) => {
  try {
    const user = await auth.createUserWithEmailAndPassword(email, password)
    return user.toJSON()
  } catch (error) {
    console.error(error)
  }
}

export const login = async ({ email, password }) => {
  try {
    const user = await auth.signInWithEmailAndPassword(email, password)
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    return user.toJSON()
  } catch (error) {
    console.error(error)
  }
}

export const logout = async () => {
  try {
    await auth.signOut()
    auth.setPersistence(firebase.auth.Auth.Persistence.NONE)
  } catch (error) {
    console.error(error)
  }
}

export const isUserLogin = () => {
  return !!auth.currentUser
}
