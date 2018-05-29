import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Card, { CardContent } from 'material-ui/Card'

@inject('appStore', 'userStore')
@observer
class ListItemHousing extends Component {
  render () {
    const housing = this.props.housing
    return (
      <Card>
        <CardContent>
          <h1>
            {housing.name}
          </h1>
          <div>Adresse : {housing.address}</div>
          <div>Contact : {housing.contact}</div>
          <div>Notes : {housing.notes}</div>
          <div>Début : {housing.startDate}</div>
          <div>Fin : {housing.endDate}</div>
        </CardContent>
      </Card>)
  }
}
export default ListItemHousing
