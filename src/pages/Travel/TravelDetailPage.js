import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Button from 'material-ui/Button'

import TravelMenuDrawer from '../../components/TravelMenuDrawer'
import Navbar from '../../components/Navbar'
import Header from '../../components/Header'

@inject('travelStore')
@observer
class TravelDetailPage extends Component {
  state = {
    left: false
  }

  toggleDrawer = open => () => {
    this.setState({
      left: open
    })
  }

  async componentDidMount () {
    const { travelStore, match } = this.props
    await travelStore.fetchTravels()
    travelStore.setCurrentTravelId(match.params.id)
  }

  render () {
    return (
      <div>
        <Header />
        <Navbar />
        <h1>{this.props.travelStore.travel.name}</h1>
        {/*
          <div>
            {JSON.stringify(this.props.travelStore.travel)}
          </div>
        */}
        <Button onClick={this.toggleDrawer(true)}>Open Drawer</Button>
        <TravelMenuDrawer parent={this} />
      </div>)
  }
}

export default TravelDetailPage
