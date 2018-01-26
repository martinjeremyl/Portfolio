import React, { Component } from 'react'
import { View, TextInput, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'

class CreationScreenThree extends Component {
  state = {
    emails: [{ text: '' }]
  }

  handleNavigation = () => {
    Actions.formRecap()
  }

  handleEmailChange = (text, key) => {
    this.setState(prevState => {
      const { emails } = prevState
      emails[key] = text

      return {
        emails
      }
    })
  }

  addEmail = () => {
    this.setState(prevState => ({
      emails: [...prevState.emails, { text: '' }]
    }))
  }

  render () {
    const { emails } = this.state

    return (
      <View>
        {emails.map((email, key) => (
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.handleEmailChange(text, key)}
            value={emails[key].text}
          />
        ))}
        <Button
          onPress={this.addEmail}
          title='Ajouter un Email'
          color='#841584'
          accessibilityLabel='Learn more about this purple button'
        />
        <Button
          onPress={this.handleNavigation}
          title='Learn More'
          color='#841584'
          accessibilityLabel='Learn more about this purple button'
        />
      </View>
    )
  }
}

export default CreationScreenThree
