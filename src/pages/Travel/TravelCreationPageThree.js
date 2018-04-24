import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import Input from '../../components/Input'
@inject('travelStore', 'userStore')
@observer
class TravelCreationPage extends Component {
  state = {
    newEmail: ''
  }

  componentDidMount () {
    const { userStore, travelStore } = this.props
    travelStore.updateTravelCreation('participants', [userStore.user.email])
  }

  handleNewEmail = ({ target: { value } }) => {
    this.setState({
      newEmail: value
    })
  }

  render () {
    const { travelStore } = this.props
    const { newEmail } = this.state
    console.log(travelStore.participants)
    return (
      <div>
        <div>Step 3</div>

        {travelStore.participants.map(
          (participant, key) =>
            key === 0 ? (
              <div>
                <Input value={participant} disabled />
              </div>
            ) : (
              <div>
                <Input value={participant} />
              </div>
            )
        )}
        <Input onChange={this.handleNewEmail} value={newEmail} />
        <button
          onClick={() => {
            travelStore.updateTravelCreation('participants', [
              ...travelStore.participants,
              newEmail
            ])
            this.setState({
              newEmail: ''
            })
          }}
        >
          Ajouter
        </button>
      </div>
    )
  }
}

export default TravelCreationPage
