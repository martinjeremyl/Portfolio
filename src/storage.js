import { AsyncStorage } from 'react-native'

export default {
  get: async (key) => JSON.parse(await AsyncStorage.getItem(key)),
  set: (key, value) => AsyncStorage.setItem(key, JSON.stringify(value)),
  remove: (key) => AsyncStorage.removeItem(key)
}
