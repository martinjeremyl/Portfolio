import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'

import storage from '../storage'
import { auth } from '../config/firebase'

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
      <View style={styles.container}>
        <View style={styles.field}>
          <Text>Email :</Text>
          <TextInput
            style={{ height: 60, width: 200 }}
            placeholder='Votre email'
            onChangeText={email => this.setState({ email: email })}
            keyboardType='email-address'
          />
        </View>
        <View style={styles.field}>
          <Text>Mot de passe :</Text>
          <TextInput
            style={{ height: 60, width: 200 }}
            secureTextEntry
            placeholder='Votre mot de passe'
            onChangeText={password => this.setState({ password: password })}
          />
        </View>
        {this.state.error && <Text style={styles.error}>{this.state.txtError}</Text>}
        <View style={styles.field}>
          <Button onPress={this.signup} title='Inscription' />
          <Button onPress={this.login} title='Connexion' />
          <Button onPress={this.logout} title='Déconnexion' />
        </View>
        <View style={styles.field}>
          <Button
            title='Créer un voyage'
            onPress={() => {
              Actions.formPartOne()
            }}
          />
        </View>
      </View>
    )
  }
}

// La feuille de style temporaire
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  field: {
    margin: 5,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  error: {
    color: '#f00'
  }
})
