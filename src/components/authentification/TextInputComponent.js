import React, { Component } from 'react'
import { Text, TextInput, View } from 'react-native'
import PropTypes from 'prop-types'

import { style, placeholderTextColor } from './style'

export default class TextInputComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: ''
    }
  }

  render () {
    var label = this.props.label
    if (this.props.required) {
      // Ajoute un asterisk si l'input est requis
      label += ' * '
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={style.field}>
          <Text style={style.label}>{label} :</Text>
          <TextInput
            style={style.textInput}
            placeholder={this.props.label}
            placeholderTextColor={placeholderTextColor}
            underlineColorAndroid={this.props.error !== '' ? '#f00' : null}
            keyboardType={this.props.email ? 'email-address' : null}
            onChangeText={text => {
              this.props.propMethodParent(text)
            }}
          />
        </View>
        <Text style={style.error}>
          {this.props.error !== '' ? this.props.error : ' '}
        </Text>
      </View>
    )
  }
}

TextInputComponent.propTypes = {
  propMethodParent: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  email: PropTypes.bool.isRequired
}
