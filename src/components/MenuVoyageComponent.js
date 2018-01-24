import React, { Component } from 'react'
import { FlatList, Text } from 'react-native'
import { database } from '~/config/firebase'
import { getModuleNameById } from '~/util'

// exemple d'import absolu a partir du dossier src :
// il suffit de mettre /nom_de_dossier/nom_de_fichier
// import { db } from '@/config/firebase'

class MenuVoyageComponent extends Component {
  constructor (props) {
    super(props)
    this.moduleListeRef = database.ref('voyages/0/modules')
    this.state = {
      dataSource: []
    }
  }

  componentDidMount () {
    this.listenForModules(this.moduleListeRef)
  }

  // Récupération des modules
  listenForModules (moduleListe) {
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
      <FlatList data={this.state.dataSource}
        renderItem={({item}) => <Text>{item.libelle}</Text>} />
    )
  }
}

export default MenuVoyageComponent
