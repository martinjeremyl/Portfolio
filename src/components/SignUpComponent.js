import React, { Component } from 'react'
import { Text, View, Button, Image } from 'react-native'

import { auth, database } from '../config/firebase'
import storage from '../storage'

import { style, backgroundColorButton } from './authentification/style'

import TextInputComponent from './authentification/TextInputComponent'
import PasswordInputComponent from './authentification/PasswordInputComponent'
import BirthdayInputComponent from './authentification/BirthdayInputComponent'

export default class SignUpComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      name: '',
      surname: '',
      birthday: '',
      tel: '',
      avatarSource: {
        uri: `data:image/png;base64,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`
      },
      txtError: '',
      errors: {
        email: '',
        name: '',
        surname: '',
        tel: ''
      }
    }
  }

  setMail = email => {
    this.setState({ email })
    this.checkMail(email)
  }

  checkMail = email => {
    // Vérification de l'Email
    if (!this.validateEmail(email)) {
      this.setState({ error: true })
      this.state.errors.email = "L'adresse mail est incorrect."
    } else {
      this.state.errors.email = ''
    }
  }

  setPassword = password => {
    this.setState({ password })
  }

  setName = name => {
    this.setState({ name })
    this.checkName(name)
  }

  checkName = name => {
    if (name === '') {
      this.state.errors.name = 'Veuillez saisir votre nom'
    } else {
      this.state.errors.name = ''
    }
  }

  setSurname = surname => {
    this.setState({ surname })
    this.checkSurname(surname)
  }

  checkSurname = surname => {
    if (surname === '') {
      this.state.errors.surname = 'Veuillez saisir votre prénom'
    } else {
      this.state.errors.surname = ''
    }
  }

  setTel = tel => {
    this.setState({ tel })
    this.checkTel(tel)
  }

  checkTel = tel => {
    // Vérification du téléphone s'il a été saisi
    if (tel !== '' && !this.validatePhoneNumber(tel)) {
      this.setState({ error: true })
      this.state.errors.tel = 'Le numéro de téléphone est incorrect.'
    } else {
      this.state.errors.tel = ''
    }
  }

  setBirthday = birthday => {
    // Le date picker renvoit un objet avec l'attribut birthday à l'intérieur
    this.setState({ birthday: birthday.birthday })
  }

  register = () => {
    // Récupération des informations de l'utilisateur
    var { email, password, name, surname, birthday, tel, avatarSource } = this.state
    // Vérification que l'utilisateur a bien remplis les champs nom et prénom,
    // et que le mail et le téléphone sont valides
    this.checkName(name)
    this.checkSurname(surname)
    this.checkMail(email)
    this.checkTel(tel)

    // S'il n'y a pas eu d'erreurs dans le formulaire
    console.log(this.state.errors)
    if (Object.keys(this.state.errors).every(key => this.state.errors[key] === '')) {
      // Inscription de l'utilisateur
      const promise = auth.createUserWithEmailAndPassword(email, password)
      promise
        .then(user => {
          // Efface les erreurs s'il y en avait
          this.setState({ error: false })
          // Récupère l'id de l'utilisateur créé
          const uid = user.uid
          database.ref('users/' + uid).set({
            name: name,
            surname: surname,
            tel: tel,
            birthday: birthday,
            avatar: avatarSource
          })
          // Enregistre le token de l'utilisateur pour l'identifier plus tard
          storage.set('userToken', user.getIdToken())
        })
        .catch(e => {
          // La connexion a échoué, on affiche le message d'erreur
          this.state.errors.email = e.message
          this.displayError('Erreur Firebase')
        })
    } else {
      this.displayError('Il y a des erreurs dans le formulaire.')
    }
  }

  displayError = error => {
    this.setState({ error: error })
  }

  validatePhoneNumber = phoneNumber => {
    // eslint-disable-next-line
    var re = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
    return re.test(phoneNumber)
  }

  validateEmail = email => {
    // eslint-disable-next-line
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email.toLowerCase())
  }

  // Fonction pour ouvrir la modale d'upload d'image
  avatar = () => {
    var ImagePicker = require('react-native-image-picker')

    // Les options du composant ImagePicker
    var options = {
      title: 'Choisir un avatar',
      storageOptions: {
        skipBackup: true,
        path: 'traveled' // Le dossier dans lequel sera enregistré les photos prises avec la caméra
      },
      takePhotoButtonTitle: 'Prendre une photo',
      chooseFromLibraryButtonTitle: 'Choisir depuis la gallerie',
      cancelButtonTitle: 'Annuler',
      mediaType: 'photo',
      cameraType: 'front' // Ne fonctionne que sur iOS
    }

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else {
        // Récupère l'image en base 64 et on renseigne l'uri
        // pour l'afficher facilement avec le composant Image
        let source = { uri: 'data:image/jpeg;base64,' + response.data }
        this.setState({
          avatarSource: source
        })
      }
    })
  }

  render () {
    return (
      <View style={style.container}>
        <TextInputComponent label='Nom' required error={this.state.errors.name} propMethodParent={this.setName} email={false} />
        <TextInputComponent label='Prénom' required error={this.state.errors.surname} propMethodParent={this.setSurname} email={false} />
        <TextInputComponent label='Mail' email required error={this.state.errors.email} propMethodParent={this.setMail} />
        <TextInputComponent label='Téléphone' required={false} error={this.state.errors.tel} propMethodParent={this.setTel} email={false} />
        <PasswordInputComponent propMethodParent={this.setPassword} />
        <BirthdayInputComponent birthday={this.state.birthday} propMethodParent={this.setBirthday} />
        <View style={style.field}>
          <Button color={backgroundColorButton} onPress={this.avatar} title='Chroisir un avatar' />
          <Image source={this.state.avatarSource} style={style.avatar} />
        </View>
        {/* Affichage des erreurs générales */}
        <Text style={style.error}>
          {this.state.error !== '' ? this.state.error : ''}
        </Text>
        <View style={style.button}>
          <Button color={backgroundColorButton} onPress={this.register} title='Inscription' />
        </View>
      </View>
    )
  }
}
