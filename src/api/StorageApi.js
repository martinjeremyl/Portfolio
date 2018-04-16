import { storage } from '../config/firebase'

export const uploadFile = async (ref, file) => {
  try {
    const storageRef = storage.ref(ref)
    const response = await storageRef.put(file)

    return response
  } catch (error) {
    console.error(error)
  }
}
