import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import Avatar from '../../components/Avatar'
import Input from '../../components/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '../../components/Button'

const MAIL_REGEX =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
@inject('travelStore', 'userStore')
@observer
class TravelCreationPage extends Component {
  state = {
    newEmail: '',
    hasEmailError: false
  }

  componentDidMount () {
    const { userStore, travelStore } = this.props
    travelStore.updateTravelCreation(
      'participants',
      travelStore.travelCreation.participants.value.length === 0
        ? [userStore.user.email]
        : travelStore.travelCreation.participants.value
    )
  }

  handleNewEmail = ({ target: { value } }) => {
    this.setState({
      newEmail: value,
      hasEmailError: false
    })
  }

  render () {
    const { travelStore } = this.props
    const { newEmail, hasEmailError } = this.state

    const { newEmail } = this.state
    const styles = {
      fullContainer: {
        padding: '20px'
      },
      personContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignContent: 'center'
      },
      Avatar: {
        flewGrow: '1'
      },
      myMail: {
        flexGrow: '5'
      },
      newMail: {
        flexGrow: '3',
        marginRight: '15px',
        marginLeft: '15px'
      },
      deletePerson: {
        flexGrow: '1',
        color: 'red' // TODO color
      },
      iconDelete: {
        marginRight: '15px',
        marginLeft: '15px'
      },
      iconStyle: {
        flewGrow: '1'
      },
      newPersonContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignContent: 'center',
        marginTop: '20px'
      }
    }

    return (
      <div style={styles.fullContainer}>
        {travelStore.participants.map(
          (participant, key) =>
            key === 0 ? (
              <div key={key} style={styles.personContainer}>
                <Avatar style={styles.Avatar} />
                <Input value={participant} style={styles.myMail} disabled />
              </div>
            ) : (
              <div key={key} style={styles.personContainer}>
                <Avatar style={styles.avatar} />
                <Input value={participant} />
                <Button
                  onClick={() => {
                    travelStore.updateTravelCreation(
                      'participants',
                      travelStore.participants.filter((_, participantKey) => participantKey !== key)
                    )
                  }}
                  value='Effacer'
                />
              </div>
            )
        )}
        <Input onChange={this.handleNewEmail} value={newEmail} error={hasEmailError} />
        <Button
          onClick={() => {
            if (MAIL_REGEX.test(newEmail)) {
              travelStore.updateTravelCreation('participants', [
                ...travelStore.participants,
                newEmail
              ])

              this.setState({
                newEmail: ''
              })
            } else {
              this.setState({
                hasEmailError: true
              })
            }
          }}
          value='Ajouter'
        />
      </div>
    )
  }
}

export default TravelCreationPage
