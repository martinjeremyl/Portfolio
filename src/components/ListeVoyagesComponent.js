import React, { Component } from 'react'
import { Button, View } from 'react-native'
import { database, auth } from '../config/firebase'
import { Actions } from 'react-native-router-flux'

import storage from '../storage'

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

  logout = async () => {
    try {
      // Déconnexion de l'utilisateur
      await auth.signOut()

      // On oublie le token de l'utilisateur
      await storage.remove('userToken')

      // On redirige vers l'écran de Connexion
      Actions.login()
    } catch (error) {
      // La déconnexion a échoué, on affiche le message d'erreur
      this.setState({ error: true, txtError: error.message })
    }
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
        <Button
          title='Se déconnecter'
          onPress={() => { this.logout() }}
          color='black'
        />
      </View>
    )
  }
}

export default ListeVoyagesComponent
