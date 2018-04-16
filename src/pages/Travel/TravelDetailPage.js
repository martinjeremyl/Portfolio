import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('travelStore')
@observer
class TravelDetailPage extends Component {
  render () {
    return <div>{JSON.stringify(this.props.travelStore.travel)}</div>
  }
}

export default TravelDetailPage
