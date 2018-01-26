import React, { Component } from 'react'
import { View, TextInput, Button } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { Actions } from 'react-native-router-flux'

class CreationScreenOne extends Component {
  state = {
    text: '',
    date: ''
  }

  handleNavigation = () => {
    Actions.formPartTwo()
  }

  render () {
    return (
      <View>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <DatePicker
          style={{ width: 200 }}
          date={this.state.date}
          mode='date'
          placeholder='select date'
          format='YYYY-MM-DD'
          minDate='2016-05-01'
          maxDate='2016-06-01'
          confirmBtnText='Confirm'
          cancelBtnText='Cancel'
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={date => {
            this.setState({ date: date })
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

export default CreationScreenOne
