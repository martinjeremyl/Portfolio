import React from 'react'
// import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'mobx-react'
import MenuVoyageComponent from './src/components/MenuVoyageComponent'

// import stores from './src/stores'
import moduleListeStores from './src/stores/ModuleListeStores'

const test = {
  modulesListe: moduleListeStores
}

export default class App extends React.Component {
  render () {
    return (
      <Provider {...test}>
        <MenuVoyageComponent />
      </Provider>
    )
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// })
