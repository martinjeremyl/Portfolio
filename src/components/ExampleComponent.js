import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
// exemple d'import absolu a partir du dossier src :
// il suffit de mettre /nom_de_dossier/nom_de_fichier
// import { db } from '~/config/firebase'

class ExampleComponent extends Component {
  componentWillMount () {
    // ce code ne fait rien
    // db.ref('hello')
  }

  render () {
    return (
      <View>
        <Text>This is an example</Text>
        <Button
          title='Hello'
          onPress={() => {
            Actions.register()
          }}
        />
      </View>
    )
  }
}

export default ExampleComponent
