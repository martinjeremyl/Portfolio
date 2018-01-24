import React from 'react'
import { StyleSheet, View } from 'react-native'
// import { Provider } from 'mobx-react'
import MenuVoyageComponent from './src/components/MenuVoyageComponent'
// import stores from './src/stores'

export default class App extends React.Component {
  render () {
    return (
      // <Provider {...stores}>
      <View style={styles.container}>
        <MenuVoyageComponent />
      </View>

      // </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
