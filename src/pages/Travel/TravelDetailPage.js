import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import TravelMenuDrawer from '../../components/TravelMenuDrawer'
import Navbar from '../../components/Navbar'
import Header from '../../components/Header'

@inject('travelStore')
@observer
class TravelDetailPage extends Component {
  state = {
    travelMembers: []
  }

  async componentDidMount () {
    const { travelStore, match } = this.props
    await travelStore.fetchTravels()
    travelStore.setCurrentTravelId(match.params.id)
  }

  renderMenuButton () {
    // Render the burger menu icon with the swapeable drawer
    return (<TravelMenuDrawer />)
  }

  render () {
    const { travelStore } = this.props

    return (
      <div>
        <Header renderLeftButton={this.renderMenuButton} />
        <Navbar />
        <h1>{travelStore.travel.name}</h1>
        <div>Début : {travelStore.travel.startDate}</div>
        <div>Fin : {travelStore.travel.endDate}</div>
        <div>Image : {travelStore.travel.image}</div>
        <div>Description : {travelStore.travel.description}</div>
        <div>Participants : <ul>{travelStore.travel.members.map(
          member => <li key={member.id}>{member.surname} {member.name}</li>
        )}</ul></div>
      </div>
    )
  }
}

export default TravelDetailPage
