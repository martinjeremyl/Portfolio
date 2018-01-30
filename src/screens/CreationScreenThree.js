import React, { Component } from 'react'
import { View, TextInput, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'

@inject('travelCreation')
@observer
class CreationScreenThree extends Component {
  state = {
    emails: [{ text: '' }]
  }

  handleNavigation = () => {
    this.props.travelCreation.addEmails(this.state.emails.map(email => email.text))
    Actions.formRecap()
  }

  handleEmailChange = (text, key) => {
    this.setState(prevState => {
      const { emails } = prevState
      emails[key].text = text

      return {
        emails
      }
    })
  }

  addEmail = () => {
    this.setState(prevState => {
      return {
        emails: [...prevState.emails, { text: '' }]
      }
    })
  }

  render () {
    const { emails } = this.state

    return (
      <View>
        {emails.map((email, key) => (
          <TextInput
            key={key}
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
