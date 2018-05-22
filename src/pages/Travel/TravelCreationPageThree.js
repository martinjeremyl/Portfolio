import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import Avatar from '../../components/Avatar'
import Input from '../../components/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MAIL_REGEX =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
@inject('travelStore', 'userStore')
@observer
class TravelCreationPage extends Component {
  state = {
    newEmail: ''
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
      newEmail: value
    })
  }

  render () {
    const { travelStore } = this.props
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
                <div
                  style={styles.deletePerson}
                  onClick={() => {
                    travelStore.updateTravelCreation(
                      'participants',
                      travelStore.participants.filter((_, particpantKey) => particpantKey !== key)
                    )
                  }}
                >
                  <FontAwesomeIcon icon={['fal', 'trash-alt']} className={'fa-2x'} style={styles.iconDelete} />
                </div>
              </div>
            )
        )}
        <div style={styles.newPersonContainer}>
          <FontAwesomeIcon
            style={styles.iconStyle}
            icon={['fal', 'envelope']}
            className={'fa-2x'}
          />

          <Input
            onChange={this.handleNewEmail}
            value={newEmail}
            label='Inviter : '
            style={styles.newMail}
          />
          <FontAwesomeIcon
            style={styles.iconStyle}
            className={'fa-2x'}
            icon={['fal', 'user-plus']}
            onClick={() => {
              if (MAIL_REGEX.test(newEmail)) {
                travelStore.updateTravelCreation('participants', [
                  ...travelStore.participants,
                  newEmail
                ])
                this.setState({
                  newEmail: ''
                })
              }
            }} />
        </div>

      </div>
    )
  }
}

export default TravelCreationPage
