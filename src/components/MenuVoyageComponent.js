import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { observer, inject } from 'mobx-react'
// exemple d'import absolu a partir du dossier src :
// il suffit de mettre /nom_de_dossier/nom_de_fichier
// import { db } from '@/config/firebase'

@inject('modulesListe')
@observer
class MenuVoyageComponent extends Component {
  render () {
    return (
      <View>
        {this.props.modulesListe.allMyModules.map(module => {
          return (
            <Text>{module.name}</Text>
          )
        })}
      </View>
    )
  }
}

export default MenuVoyageComponent
