import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject('travelStore', 'userStore')
@observer
class TravelCreationPage extends Component {
  render () {
    return (
      <div>
        <div>Step one</div>
      </div>
    )
  }
}

export default TravelCreationPage
