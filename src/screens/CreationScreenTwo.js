import React, { Component } from 'react'
import { View, Button } from 'react-native'
import CheckBox from 'react-native-checkbox'
import { Actions } from 'react-native-router-flux'

class CreationScreenTwo extends Component {
  state = {
    checkboxs: {
      1: false,
      2: true
    }
  }

  handleNavigation = () => {
    Actions.formPartThree()
  }

  handelCheck = checkboxId => {
    this.setState(prevState => {
      const { checkboxs } = prevState
      checkboxs[checkboxId] = !checkboxs[checkboxId]

      return {
        checkboxs
      }
    })
  }

  render () {
    const { checkboxs } = this.state
    return (
      <View>
        <CheckBox
          label='Label'
          checked={checkboxs[1]}
          onChange={() => {
            this.handelCheck(1)
          }}
        />

        <CheckBox
          label='Label'
          checked={checkboxs[2]}
          onChange={() => {
            this.handelCheck(2)
          }}
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

export default CreationScreenTwo
