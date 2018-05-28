import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'

import Input from '../../components/Input'
import DatePicker from '../../components/datetime/DatePicker'
import CarouselComponent from '../../components/Carousel'

@inject('travelStore', 'userStore')
@observer
class TravelCreationPage extends Component {
  render() {
    const {name, startDate, endDate, note, handleInputsChange, travelStore} = this.props

    return (
      <div style={{textAlign: 'center', marginBottom: '20%', paddingTop: '56px'}}>
        <Input
          name='name'
          onChange={handleInputsChange}
          value={name}
          label='Nom'
          style={{width: '80%', marginTop: '20px'}}
        />
        <DatePicker
          name='startDate'
          label={`Date d'arrivée`}
          getdate={date => {
            travelStore.updateTravelCreation('startDate', date)
          }}
          style={{width: '80%', marginTop: '20px'}}
        />
        <DatePicker
          name='endDate'
          label={`Date de départ`}
          getdate={date => {
            travelStore.updateTravelCreation('endDate', date)
          }}
          style={{width: '80%', marginTop: '20px'}}
        />

        {/*Caroussel pour le choix de l'image*/}
        <div
          style={{
            width: '80%',
            margin: '30px auto 0px auto',
            textAlign: 'left'
          }}>
          <text
            style={{fontSize: '12px', textAlignLast: 'left'}}
          >Choisir une image
          </text>
          <CarouselComponent/>
        </div>


        <div
          style={{
            width: '80%',
            margin: '30px auto 0px auto',
            textAlign: 'left'
          }}>
          <text
            style={{fontSize: '12px', textAlignLast: 'left'}}
          >Notes
          </text>
        </div>
        <div
          style={{
            width: '80%',
            margin: 'auto',
            backgroundColor: '#F6F6F6',
          }}
        >
          <Input
            name='note'
            onChange={handleInputsChange}
            value={note}
            label='Note'
            multiline
            rows="5"
            style={{width: '100%'}}
            label=''
          />
        </div>
      </div>
    )
  }
}

export default TravelCreationPage
