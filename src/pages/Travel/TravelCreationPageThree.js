import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import Avatar from '../../components/Avatar'
import Input from '../../components/Input'

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

    return (
      <div>
        {travelStore.participants.map(
          (participant, key) =>
            key === 0 ? (
              <div key={key}>
                <Avatar style={{ display: 'inline-block' }} />
                <Input value={participant} disabled />
              </div>
            ) : (
              <div key={key}>
                <Avatar style={{ display: 'inline-block' }} />
                <Input value={participant} />
                <button
                  onClick={() => {
                    travelStore.updateTravelCreation(
                      'participants',
                      travelStore.participants.filter((_, particpantKey) => particpantKey !== key)
                    )
                  }}
                >
                  Effacer
                </button>
              </div>
            )
        )}
        <Input onChange={this.handleNewEmail} value={newEmail} />
        <button
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
          }}
        >
          Ajouter
        </button>
      </div>
    )
  }
}

export default TravelCreationPage
