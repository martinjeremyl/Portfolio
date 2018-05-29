import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import moment from 'moment'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import ListItemHousing from './components/ListItemHousing'
import DateDisplay from '../../components/datetime/DateDisplay'

@inject('travelStore')
@observer
export default class HousingPage extends Component {
  state = {
    sortedHousings: []
  }
  async componentDidMount () {
    const { travelStore } = this.props
    // Get the list of all the startDates
    const startDates = travelStore.travel.housings.map(housing => housing.startDate)
    // Sort housing by the startDate :
    // sortedHousingsbyDate['25-05-2018'] = Array of housings with startDate = '25-05-2018'
    const sortedHousingsbyDate = startDates.reduce((sortedHousingsbyDate, startDate) => {
      sortedHousingsbyDate[startDate] = travelStore.travel.housings.filter(
        housing => housing.startDate === startDate
      )
      return sortedHousingsbyDate
    }, {})
    this.setState({sortedHousings: sortedHousingsbyDate})
  }

  render () {
    return (
      <div>
        <Header />
        <Navbar />
        <div style={{ width: '100%', marginTop: '20px' }}>
          {Object.keys(this.state.sortedHousings).map((date, index) => (
            <div key={index}>
              <h3><DateDisplay date={moment(date, 'DD-MM-YYY').toDate()} /></h3>
              {this.state.sortedHousings[date].map(housing => (
                <ListItemHousing key={housing.id} housing={housing} />
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
}
