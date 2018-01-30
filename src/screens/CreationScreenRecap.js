import React, { Component } from 'react'
import { View, Button, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'

@inject('travelCreation')
@observer
class CreationScreenRecap extends Component {
  handleNavigation = () => {
    this.props.travelCreation.createTravel()
    // Crade mais temporaire
    Actions.pop()
    Actions.pop()
    Actions.pop()
  }

  render () {
    const { dateBegin, dateEnd, emails, modules, name } = this.props.travelCreation
    return (
      <View>
        <Text>
          {dateBegin} - {dateEnd}
        </Text>
        <Text>{JSON.stringify(emails)}</Text>
        <Text>{JSON.stringify(modules)}</Text>
        <Text>{name}</Text>
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
