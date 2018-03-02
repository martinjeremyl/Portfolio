import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
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
    Actions.voyage( {'selectedTravel': travel} )
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
      <View style={styles.container}>

        <Text style={styles.title}>Mes voyages</Text>

        {this.state.dataSource.map(data =>
          <TouchableOpacity
            key={data.key}
            onPress={() => {
              this.handleNavigation(data.travel)
            }}
            color='#ee3333'
            accessibilityLabel='Learn more about this purple button'>
            <Text style={styles.travel}>{data.libelle}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.float}>
          <Text style={styles.textFloat}>+</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },

  title: {
    color: '#2C3E50',
    fontSize: 30,
    marginTop: '20%',
    marginBottom: '20%',
    textAlign: 'center'
  },

  travel: {
    color: '#d42b64',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: '8%'
  },

  float: {
    position: 'absolute',
    width: 60,
    height: 60,
    bottom: 20,
    right: 20,
    backgroundColor: '#D42B64',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },

  textFloat: {
    color: '#ffffff',
    fontSize: 25
  }

})

export default ListeVoyagesComponent
