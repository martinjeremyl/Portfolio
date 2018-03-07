import React, { Component } from 'react'
import { Button, View } from 'react-native'
import { getModuleNameById } from '../util'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
import { LOGEMENTS, TRANSPORTS, DEPENSES, ACTIVITES, DOCUMENTS, LISTES } from '../constants'

@inject('housing')
@observer
class MenuVoyageComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataSource: []
    }
  }

  /**
   * Redirige vers les modules
   */
  handleNavigation = libModule => {
    // TODO : Mettre le title de votre component selon le cas
    switch (libModule) {
      case LOGEMENTS:
        this.props.housing.pushHousings(this.props.selectedTravel.logements)
        Actions.housingsList()
        break

      case TRANSPORTS:
        Actions.login()
        break

      case DEPENSES :
        Actions.depensesList({ 'travel': this.props.selectedTravel.nom })
        break

      case ACTIVITES:
        Actions.login()
        break

      case DOCUMENTS:
        Actions.login()
        break

      case LISTES:
        Actions.login()
        break
    }
  }

  componentWillMount () {
    // Set travel name in title
    const { setParams } = this.props.navigation
    setParams({ title: this.props.selectedTravel ? this.props.selectedTravel.nom : 'None' })

    this.moduleListeRef = this.props.selectedTravel.modules
    this.listenForModules(this.moduleListeRef)
  }

  // get modules name to show
  listenForModules = moduleListe => {
    var items = []

    moduleListe.forEach(child => {
      items.push({
        libelle: getModuleNameById(child),
        key: child.toString()
      })

      // binding results
      this.setState({
        dataSource: items
      })
    })
  }

  render () {
    console.log(this.props, 'this.props')

    return (
      <View>
        {this.state.dataSource.map(mod => (
          <Button
            key={mod.key}
            onPress={() => {
              this.handleNavigation(mod.libelle)
            }}
            title={mod.libelle}
            color='#841584'
            accessibilityLabel='Click to see the module the module'
          />
        ))}
      </View>
    )
  }
}

export default MenuVoyageComponent
