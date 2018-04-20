import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Button from 'material-ui/Button'

import TravelMenuDrawer from '../../components/TravelMenuDrawer'

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

  render () {
    return (
      <div>
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
