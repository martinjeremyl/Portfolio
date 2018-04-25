import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import Input from '../../components/Input'
import DatePicker from '../../components/DatePicker'

@inject('travelStore', 'userStore')
@observer
class TravelCreationPage extends Component {
  render () {
    const { name, startDate, endDate, note, handleInputsChange, travelStore } = this.props

    return (
      <div style={{ textAlign: 'center' }}>
        <Input
          name='name'
          onChange={handleInputsChange}
          value={name}
          label='Nom'
          style={{ width: '70%', marginTop: '20px' }}
        />
        <DatePicker
          name='startDate'
          label={`Date d'arrivée`}
          getdate={date => {
            travelStore.updateTravelCreation('startDate', date)
          }}
          value={startDate}
        />
        <DatePicker
          name='endDate'
          value={endDate}
          label={`Date de départ`}
          getdate={date => {
            travelStore.updateTravelCreation('endDate', date)
          }}
        />

        <div
          style={{
            width: '70%',
            margin: 'auto',
            padding: '15px 10px',
            marginTop: '30px',
            backgroundColor: '#F6F6F6',
            borderRadius: '10px'
          }}
        >
          <Input
            name='note'
            onChange={handleInputsChange}
            value={note}
            label='Note'
            style={{ width: '100%' }}
          />
        </div>
      </div>
    )
  }
}

export default TravelCreationPage
