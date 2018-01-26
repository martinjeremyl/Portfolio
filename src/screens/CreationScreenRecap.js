import React, { Component } from 'react'
import { View, Button, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'

class CreationScreenRecap extends Component {
  handleNavigation = () => {
    Actions.pop()
    Actions.pop()
    Actions.pop()
  }

  render () {
    return (
      <View>
        <Text>Recap voyage...</Text>
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

export default CreationScreenRecap
