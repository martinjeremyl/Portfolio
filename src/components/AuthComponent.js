import React, { Component } from 'react'
import { Text, TextInput, View, Button, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'

import storage from '../storage'
import { auth } from '../config/firebase'

import { style, backgroundColorButton, placeholderTextColor } from './authentification/style'

export default class AuthComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: false,
      txtError: ''
    }
  }

  componentWillMount () {
    storage.get('userToken').then(userToken => {
      // TODO: Redirect to home if logged in (userToken !== null)
      // Possiblement du code inutile, à voir comment se comporte l'authentification de firebase
      console.log('is user logged in?', userToken !== null)
      console.log('userToken', userToken, typeof userToken)
    })

    // Listener qui vérifie si l'authentification a changé
    auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        // L'utilisateur est bien connecté, on affiche ses infos
        console.log(firebaseUser.email + ' - ' + firebaseUser.uid)
        // On redirige vers la liste des voyages
        Actions.listeVoyages()
      } else {
        // L'utilisateur n'est pas connecté
        console.log('not logged in')
      }
    })
  }

  login = async () => {
    // On  efface les erreurs s'il y en avait
    this.setState({ error: false })

    // On récupère le mail et le mot de passe saisi
    const { email, password } = this.state

    if (!this.validateEmail(email)) {
      return this.setState({ error: true, txtError: "L'adresse mail est incorrecte." })
    }

    try {
      // Connexion de l'utilisateur
      const user = await auth.signInWithEmailAndPassword(email, password)

      // On enregistre le token de l'utilisateur pour l'identifier plus tard
      storage.set('userToken', await user.getIdToken())
    } catch (error) {
      // La connexion a échoué, on affiche le message d'erreur
      this.setState({ error: true, txtError: error.message })
    }
  }

  logout = async () => {
    try {
      // Déconnexion de l'utilisateur
      await auth.signOut()

      // On oublie le token de l'utilisateur
      await storage.remove('userToken')
    } catch (error) {
      // La déconnexion a échoué, on affiche le message d'erreur
      this.setState({ error: true, txtError: error.message })
    }
  }

  signup = async () => {
    // On  efface les erreurs s'il y en avait
    this.setState({ error: false })

    // On récupère le mail et le mot de passe saisi
    const { email, password } = this.state

    if (!this.validateEmail(email)) {
      return this.setState({ error: true, txtError: "L'adresse mail est incorrecte." })
    }

    try {
      // Inscription de l'utilisateur
      const user = await auth.createUserWithEmailAndPassword(email, password)

      // On enregistre le token de l'utilisateur pour l'identifier plus tard
      storage.set('userToken', await user.getIdToken())
    } catch (error) {
      // La connexion a échoué, on affiche le message d'erreur
      this.setState({ error: true, txtError: error.message })
    }
  }

  validateEmail = email => {
    // eslint-disable-next-line
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email.toLowerCase())
  }

  render () {
    return (
      <View style={style.container}>
        <Image
          style={style.logo}
          source={require('../img/logo_2.png')}
        />
        <View style={{ justifyContent: 'space-around', flex: 1 }}>
          <TextInput
            style={style.textInput}
            placeholder='Mail'
            placeholderTextColor={placeholderTextColor}
            keyboardType='email-address'
            onChangeText={(email) => { this.setState({ email }) }}
          />
          <TextInput
            style={style.textInput}
            secureTextEntry
            placeholder='Mot de passe'
            placeholderTextColor={placeholderTextColor}
            onChangeText={(password) => { this.setState({ password }) }}
          />
        </View>
        {
          this.state.error && <Text style={style.error}>{this.state.txtError}</Text>
        }
        <View style={style.buttons}>
          <Button
            color={backgroundColorButton} style={style.button}
            onPress={this.login} title='Connexion'
          />
          <View style={style.field}>
            <Text style={{ color: 'white', fontSize: 18 }} onPress={() => { Actions.register() }}>
              Inscription
            </Text>
          </View>
        </View>
      </View>
    )
  }
}
