import React, { Component } from 'react'
import { View, TextInput, Button, StyleSheet, Text, Platform } from 'react-native'
import DatePicker from '@m5r/react-native-datepicker'
import StepIndicator from 'react-native-step-indicator'
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
  constructor (props) {
    super(props)
    this.state = {
      currentPosition: 0

    }
  }

  render () {
    const { dateBegin, dateEnd } = this.state
    const customStyles = {
      stepIndicatorSize: 25,
      currentStepIndicatorSize:30,
      separatorStrokeWidth: 2,
      currentStepStrokeWidth: 3,
      stepStrokeCurrentColor: '#f63274',
      stepStrokeWidth: 3,
      stepStrokeFinishedColor: '#f63274',
      stepStrokeUnFinishedColor: '#aaaaaa',
      separatorFinishedColor: '#f63274',
      separatorUnFinishedColor: '#aaaaaa',
      stepIndicatorFinishedColor: '#f63274',
      stepIndicatorUnFinishedColor: '#ffffff',
      stepIndicatorCurrentColor: '#ffffff',
      stepIndicatorLabelFontSize: 13,
      currentStepIndicatorLabelFontSize: 13,
      stepIndicatorLabelCurrentColor: '#f63274',
      stepIndicatorLabelFinishedColor: '#ffffff',
      stepIndicatorLabelUnFinishedColor: '#aaaaaa',
      labelColor: '#999999',
      labelSize: 13,
      currentStepLabelColor: '#f63274'
    }

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Informations principales</Text>
        <TextInput style={styles.input}
          placeholder='Nom voyage'
          onChangeText={text => {
            this.setState({ text })
          }}
          value={this.state.text}
        />
        <View style={styles.datePickerContainer}>
          <DatePicker style={styles.datePick}
            date={dateBegin}
            mode='date'
            placeholder='Date de début'
            format='YYYY-MM-DD'
            minDate={format(Date.now(), 'YYYY-MM-DD')}
            confirmBtnText='Confirm'
            cancelBtnText='Cancel'
            iconSource={null}
            onDateChange={date => {
              this.setState({ dateBegin: date })
            }}
          />
          <DatePicker
            style={styles.datePick}
            date={dateEnd}
            mode='date'
            placeholder='Date de fin'
            format='YYYY-MM-DD'
            minDate={format(Date.now(), 'YYYY-MM-DD')}
            confirmBtnText='Confirm'
            cancelBtnText='Cancel'
            iconSource={null}
            onDateChange={date => {
              this.setState({ dateEnd: date })
            }}
          />
        </View>
        <StepIndicator
          currentPosition={this.state.currentPosition}
          customStyles={customStyles}
          stepCount={4}
        />
        <Button
          onPress={this.handleNavigation}
          title='Next'
          color='#00a8ff'
          accessibilityLabel='Next step about this Blue button'
        />
      </View>
    )
  }
}

export default CreationScreenOne

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff'
  },
  input: {
    margin: 15,
    height: 40,
    borderBottomColor: '#aaa',
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 0
  },
  text: {
    margin: 15,
    fontSize: 20
  },
  datePick: {
    height: 20,
    width: 193
  },
  datePickerContainer: {
    margin: 15,
    flex: 1,
    flexDirection: 'row'
  }
})
