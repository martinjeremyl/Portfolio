import React, { Component } from 'react'
import { Text, TextInput, View } from 'react-native'
import PropTypes from 'prop-types'

import { style, placeholderTextColor } from './style'

export default class PasswordInputComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      password: '',
      error: false,
      txtError: ''
    }
  }

  // Fonction de vérification de la longueur du mot de passe
  // Et s'il contient bien un nombre (Regex)
  checkPassword = password => {
    return password.length >= 8 && /\d/.test(password)
  }

  checkFirstPassword = password => {
    if (this.checkPassword(password)) {
      this.setState({
        password: password,
        error: false,
        txtError: ''
      })
    } else {
      this.setState({
        error: true,
        txtError: 'Le mot de passe doit faire au moins 8 caractères et contenir un nombre.'
      })
    }
  }

  checkConfirmPassword = confirmPassword => {
    // Vérifie que le mot de passe de confirmation
    // est bien égal au premier mot de passe saisi
    if (this.state.password === confirmPassword) {
      this.setState({
        error: false,
        txtError: ''
      })
      // On transfert le mot de passe validé au parent
      this.props.propMethodParent(this.state.password)
    } else {
      this.setState({
        error: true,
        txtError: 'Les mots de passe sont différents.'
      })
    }
  }

  render () {
    return (
      <View style={{ flex: 2 }}>
        <View style={style.field}>
          <Text style={style.label}>Mot de passe * :</Text>
          <TextInput
            style={style.textInput}
            secureTextEntry
            placeholder='Mot de passe'
            placeholderTextColor={placeholderTextColor}
            underlineColorAndroid={this.state.error ? '#f00' : null}
            onChangeText={password => {
              this.checkFirstPassword(password)
            }}
          />
        </View>
        <View style={style.field}>
          <Text style={style.label}>Confirmation du mot de passe * :</Text>
          <TextInput
            style={style.textInput}
            secureTextEntry
            placeholder='Confirmation'
            placeholderTextColor={placeholderTextColor}
            underlineColorAndroid={this.state.error ? '#f00' : null}
            onChangeText={confirmPassword => {
              this.checkConfirmPassword(confirmPassword)
            }}
          />
        </View>
        <Text style={style.error}>
          {this.state.error ? this.state.txtError : ''}
        </Text>
      </View>
    )
  }
}

PasswordInputComponent.propTypes = {
  propMethodParent: PropTypes.func.isRequired
}
