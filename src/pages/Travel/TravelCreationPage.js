import React, { Component } from 'react'

import Input from '../../components/Input'
import Button from '../../components/Button'
import { observer, inject } from 'mobx-react'

@inject('travelStore')
@observer
class TravelCreationPage extends Component {
  state = {
    name: '',
    dateBegin: Date.now(),
    dateEnd: Date.now(),
    participants: [],
    modules: []
  }

  updateField = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    })
  }

  render () {
    const { name } = this.state

    return (
      <div className='container is-fluid'>
        <Input name='name' onChange={this.updateField} value={name} />
        {/* <Input
          name='dateBegin'
          onChange={this.updateField}
          value={dateBegin}
        />
        <Input name='dateEnd' onChange={this.updateField} value={dateEnd} />
        */}
        <Button color='primary' onClick={() => {
          this.props.travelStore.create(this.state)
          this.props.parent.handleClose()
        }}>
          Ajouter
        </Button>
      </div>
    )
  }
}

export default TravelCreationPage
