import React, { Component } from 'react'
import { Text, View } from 'react-native'
import PropTypes from 'prop-types'
import DatePicker from '@m5r/react-native-datepicker'

import { style } from './style'

export default class BirthdayInputComponent extends Component {
  propTypes = {
    propMethodParent: PropTypes.func.isRequired
  }

  render () {
    return (
      <View style={style.field}>
        <Text style={style.label}>Date de naissance :</Text>
        <DatePicker
          style={{ width: 200 }}
          date={this.props.birthday}
          mode='date'
          placeholder='Choisissez une date'
          format='YYYY-MM-DD'
          minDate='1944-04-04'
          maxDate={new Date().toISOString().slice(0, 10)}
          confirmBtnText='Confirmer'
          cancelBtnText='Annuler'
          customStyles={{
            dateText: {
              color: 'white'
            },
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
          onDateChange={birthday => {
            this.props.propMethodParent({ birthday })
          }}
        />
      </View>
    )
  }
}

BirthdayInputComponent.propTypes = {
  propMethodParent: PropTypes.func.isRequired,
  birthday: PropTypes.string.isRequired
}
