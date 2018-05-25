import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Button from 'material-ui/Button'

import TravelMenuDrawer from '../../components/TravelMenuDrawer'
import Navbar from '../../components/Navbar'
import Header from '../../components/Header'
import TravelDetailEditMenu from '../../components/TravelDetailEditMenu'

@inject('travelStore')
@observer
class TravelDetailPage extends Component {
  state = {
    travelMembers: [],
    isEditTravelMenuOpen: false
  }

  openEditTravelMenu = () => this.setState({ isEditTravelMenuOpen: true })

  closeEditTravelMenu = () => this.setState({ isEditTravelMenuOpen: false })

  async componentDidMount () {
    const { travelStore, match } = this.props
    await travelStore.fetchTravels()
    travelStore.setCurrentTravelId(match.params.id)
  }

  render () {
    const { travelStore } = this.props

    return (
      <div>
        <Header renderLeftButton={() => <TravelMenuDrawer />} />
        <Navbar />

        <h1>{travelStore.travel && travelStore.travel.name}</h1>
        <Button onClick={this.openEditTravelMenu}>Edit Travel</Button>
        <div>Début : {travelStore.travel && travelStore.travel.startDate}</div>
        <div>Fin : {travelStore.travel && travelStore.travel.endDate}</div>
        <div>Image : {travelStore.travel && travelStore.travel.image}</div>
        <div>Description : {travelStore.travel && travelStore.travel.description}</div>
        <div>
          Participants :
          <ul>
            {travelStore.travel &&
              travelStore.travel.members.map(member => (
                <li key={member.id}>
                  {member.surname} {member.name}
                </li>
              ))}
          </ul>
        </div>
        <TravelDetailEditMenu
          isEditTravelMenuOpen={this.state.isEditTravelMenuOpen}
          closeEditTravelMenu={this.closeEditTravelMenu}
        />
      </div>
    )
  }
}

export default TravelDetailPage
