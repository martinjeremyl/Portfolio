import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'

import { auth } from '~/config/firebase'

export default class AuthComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: 'test',
      password: 'test',
      error: false,
      txtError: ''
    }
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

  treatPromise = (promise) => {
    promise
      .then(user => {
        // On  efface les erreurs s'il y en avait
        this.setState({error: false})
      })
      .catch(e => {
        // La connexion a échoué, on affiche le message d'erreur
        this.setState({error: true, txtError: e.message})
      })
  }

 login = () => {
   // On récupère le mail et le mot de passe saisi
   const {email, password} = this.state
   // Vérification de l'Email
   if (this.validateEmail(email)) {
     // Connexion de l'utilisateur
     const promise = auth.signInWithEmailAndPassword(email, password)
     this.treatPromise(promise)
   } else {
     // Le mail est incorrect
     this.setState({error: true, txtError: "L'adresse mail est incorrect."})
   }
 }

 logout = () => {
   auth.signOut()
 }

 signup = () => {
   const {email, password} = this.state
   // Vérification de l'Email
   if (this.validateEmail(email)) {
     // Inscription de l'utilisateur
     const promise = auth.createUserWithEmailAndPassword(email, password)
     this.treatPromise(promise)
   } else {
     // Le mail est incorrect
     this.setState({error: true, txtError: "L'adresse mail est incorrect."})
   }
 }

 validateEmail = (email) => {
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
           style={{height: 60, width: 200}}
           placeholder='Votre email'
           onChangeText={(email) => { this.setState({email: email}) }}
         />
       </View>
       <View style={styles.field}>
         <Text>Mot de passe :</Text>
         <TextInput
           style={{height: 60, width: 200}}
           secureTextEntry
           placeholder='Votre mot de passe'
           onChangeText={(password) => { this.setState({password: password}) }}
         />
       </View>
       {
         this.state.error && <Text style={styles.error}>{this.state.txtError}</Text>
       }
       <View style={styles.field}>
         <Button onPress={this.signup} title='Inscription' />
         <Button onPress={this.login} title='Connexion' />
         <Button onPress={this.logout} title='Déconnexion' />
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
