import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { observer, inject } from 'mobx-react'

@inject('housing')
@observer
class HousingDetails extends Component {
  render () {
    const {
      adresse,
      contact,
      date_debut: dateDebut,
      date_fin: dateFin,
      membres,
      nom,
      note
    } = this.props.housing.housings.filter(housing => housing.nom === this.props.selectedTravel)[0]

    return (
      <View>
        <Text>{adresse}</Text>
        <Text>{contact}</Text>
        <Text>{dateDebut}</Text>
        <Text>{dateFin}</Text>
        <Text>{membres}</Text>
        <Text>{nom}</Text>
        <Text>{note}</Text>
      </View>
    )
  }
}

export default HousingDetails
