import React, { Component } from 'react'
import { View, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'

class CreationScreen extends Component {
  handleNavigation = () => {
    Actions.formPartOne()
  }

  render () {
    return (
      <View>
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

export default CreationScreen
