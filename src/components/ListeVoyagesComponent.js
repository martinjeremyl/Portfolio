import React, { Component } from 'react'
import { Button, View } from 'react-native'
import { database } from '../config/firebase'
import { Actions } from 'react-native-router-flux'

class ListeVoyagesComponent extends Component {
  constructor (props) {
    super(props)
    this.mesVoyagesRef = database.ref('voyages')
    this.state = {
      dataSource: []
    }
  }

  componentWillMount () {
    this.listenForVoyages(this.mesVoyagesRef)
  }

  // Recovering my travels
  listenForVoyages = (voyageListe) => {
    voyageListe.on('value', (voyage) => {
      // get children as an array
      var items = []
      // console.log('snap',)
      // formating data
      voyage.forEach((child) => {
        items.push({
          libelle: child.val().nom,
          travel: child.val(),
          key: child.key
        })
      })

      // Affichage du résultat
      this.setState({
        dataSource: items
      })
    })
  }

  handleNavigation = (travel) => {
    Actions.voyage({ 'selectedTravel': travel })
  }

  render () {
    return (
      <View>
        {this.state.dataSource.map(data =>
          <Button
            key={data.key}
            onPress={() => { this.handleNavigation(data.travel) }}
            title={data.libelle}
            color='#ee3333'
            accessibilityLabel='Learn more about this purple button'
          />)}
      </View>
    )
  }
}

export default ListeVoyagesComponent
