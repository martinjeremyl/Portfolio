import React, { Component } from 'react'
import { View, TextInput, Button } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
import { format } from 'date-fns'

@inject('travelCreation')
@observer
class CreationScreenOne extends Component {
  state = {
    text: '',
    dateBegin: '',
    dateEnd: ''
  }

  handleNavigation = () => {
    const { travelCreation } = this.props
    const { dateBegin, dateEnd, text } = this.state

    travelCreation.addName(text)
    travelCreation.addDateBegin(dateBegin)
    travelCreation.addDateEnd(dateEnd)

    Actions.formPartTwo()
  }

  render () {
    const { dateBegin, dateEnd } = this.state
    return (
      <View>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => {
            this.setState({ text })
          }}
          value={this.state.text}
        />
        <DatePicker
          style={{ width: 200 }}
          date={dateBegin}
          mode='date'
          placeholder='select date'
          format='YYYY-MM-DD'
          minDate={format(Date.now(), 'YYYY-MM-DD')}
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
            this.setState({ dateBegin: date })
          }}
        />
        <DatePicker
          style={{ width: 200 }}
          date={dateEnd}
          mode='date'
          placeholder='select date'
          format='YYYY-MM-DD'
          minDate={format(Date.now(), 'YYYY-MM-DD')}
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
            this.setState({ dateEnd: date })
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
