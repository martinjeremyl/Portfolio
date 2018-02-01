import React, { Component } from 'react'
import { View, Button } from 'react-native'
import CheckBox from 'react-native-checkbox'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'

import { LOGEMENTS, TRANSPORTS, DEPENSES, ACTIVITES, DOCUMENTS, LISTES } from '../constants'

@inject('travelCreation')
@observer
class CreationScreenTwo extends Component {
  state = {
    modules: {
      [LOGEMENTS]: {
        checked: false,
        value: LOGEMENTS
      },
      [TRANSPORTS]: {
        checked: false,
        value: TRANSPORTS
      },
      [DEPENSES]: {
        checked: false,
        value: DEPENSES
      },
      [ACTIVITES]: {
        checked: false,
        value: ACTIVITES
      },
      [DOCUMENTS]: {
        checked: false,
        value: DOCUMENTS
      },
      [LISTES]: {
        checked: false,
        value: LISTES
      }
    }
  }

  handleNavigation = () => {
    const { modules } = this.state

    this.props.travelCreation.addModules(Object.keys(modules).map(module => modules[module]))

    Actions.formPartThree()
  }

  handelCheck = checkboxId => {
    this.setState(prevState => {
      const { modules } = prevState
      modules[checkboxId].checked = !modules[checkboxId].checked

      return {
        modules
      }
    })
  }

  render () {
    const { modules } = this.state
    return (
      <View>
        {Object.keys(modules).map(checkbox => (
          <CheckBox
            key={checkbox}
            label={modules[checkbox].value}
            checked={modules[checkbox].checked}
            onChange={() => {
              this.handelCheck(checkbox)
            }}
          />
        ))}

        <Button
          onPress={this.handleNavigation}
          title='Etape suivante'
          color='#841584'
          accessibilityLabel='Learn more about this purple button'
        />
      </View>
    )
  }
}

export default CreationScreenTwo
