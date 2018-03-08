import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
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
        Actions.housingsList({ selectedTravelKey: this.props.selectedTravel.travelKey })
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
    // const {setParams} = this.props.navigation
    // setParams({title: this.props.selectedTravel ? this.props.selectedTravel.nom : 'None'})

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
    let moduleIcon = {
      'ACTIVITES': require('../../Graphismes/icones/Activite.png'),
      'TRANSPORTS': require('../../Graphismes/icones/vehicule2.png'),
      'DEPENSES': require('../../Graphismes/icones/Money.png'),
      'DOCUMENTS': require('../../Graphismes/icones/Fichier.png'),
      'LISTES': require('../../Graphismes/icones/Liste.png'),
      'LOGEMENTS': require('../../Graphismes/icones/Logement.png')
    }
    return (
      <View style={styles.container}>

        <View style={styles.info}>
          <Text style={styles.travelName}>{this.props.selectedTravel.nom}</Text>
          <Text style={styles.travelDate}>{this.props.selectedTravel.dateBegin} - {this.props.selectedTravel.DateEnd}</Text>
        </View>

        <View style={styles.containerModules}>
          {this.state.dataSource.map(mod =>
            <View style={styles.modules}>
              <TouchableOpacity
                key={mod.key}
                onPress={() => {
                  this.handleNavigation(mod.libelle)
                }}
                accessibilityLabel='Click to see the module'
              >
                <View style={styles.moduleClickable}>
                  <Image
                    style={styles.moduleIcon}
                    source={moduleIcon[mod.libelle]}
                  />
                  <Text style={styles.titleModules}>{mod.libelle}</Text>
                </View>
              </TouchableOpacity>
            </View>)}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },

  info: {
    backgroundColor: '#2C3E50',
    height: '45%',
    width: '100%'
  },
  travelName: {
    color: '#ffffff',
    fontSize: 30,
    textAlign: 'center',
    marginTop: '15%'
  },
  travelDate: {
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
    marginTop: '20%'
  },
  containerModules: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  modules: {
    height: '40%',
    width: '30%',
    marginBottom: '10%'
  },
  moduleClickable: {
    height: '100%',
    width: '100%',
    alignItems: 'center'
  },
  titleModules: {
    color: '#2C3E50',
    textAlign: 'center',
    width: '100%'

  },
  moduleIcon: {
    height: 100,
    width: 100,
    marginBottom: '5%'
  }

})
export default MenuVoyageComponent
