import React, { Component } from 'react'
import { Button, View } from 'react-native'
import { database } from '~/config/firebase'
import { getModuleNameById } from '~/util'
import { Actions } from 'react-native-router-flux'
import { LOGEMENTS, TRANSPORTS, DEPENSES, ACTIVITES, DOCUMENTS, LISTES } from '~/constants'

class MenuVoyageComponent extends Component {
  constructor (props) {
    super(props)
    this.moduleListeRef = database.ref('voyages/0/modules')
    this.state = {
      dataSource: []
    }
  }

  /**
   * Redirige vers les modules
   */
  handleNavigation = (libModule) => {
    // TODO : Mettre le title de votre component selon le cas
    switch (libModule) {
      case LOGEMENTS :
        Actions.login()
        break

      case TRANSPORTS :
        Actions.login()
        break

      case DEPENSES :
        Actions.login()
        break

      case ACTIVITES :
        Actions.login()
        break

      case DOCUMENTS :
        Actions.login()
        break

      case LISTES :
        Actions.login()
        break
    }
  }

  componentWillMount () {
    this.listenForModules(this.moduleListeRef)
  }

  // Récupération des modules
  listenForModules = (moduleListe) => {
    moduleListe.on('value', (snap) => {
      // get children as an array
      var items = []

      // Pour chaque module, on récupère son libellé
      snap.forEach((child) => {
        items.push({
          libelle: getModuleNameById(child.val()),
          key: child.key
        })
      })

      // Affichage du résultat
      this.setState({
        dataSource: items
      })
    })
  }

  render () {
    return (
      <View>
        {this.state.dataSource.map(mod =>
          <Button
            key={mod.key}
            onPress={() => { this.handleNavigation(mod.libelle) }}
            title={mod.libelle}
            color='#841584'
            accessibilityLabel='Learn more about this purple button'
          />)}
      </View>
    )
  }
}

export default MenuVoyageComponent
