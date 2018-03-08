import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
import { RoundButton } from '../../components/RoundButton'
import { ModalComponent } from '../../components/ModalComponent'

@inject('housing')
@observer
class HousingDetails extends Component {
  state = {
    isModalVisible: false,
    selectedHousing: null
  }

  componentWillMount () {
    this.setState({
      selectedHousing: this.props.housing.housings.filter(housing => housing.nom === this.props.selectedHousingName)[0]
    })
  }

  closeModal = () => this.setState({ isModalVisible: false })

  onDeletionConfirm = () => {
    this.props.housing.removeHousing(this.props.selectedTravelKey, this.props.selectedHousingName)
    this.closeModal()
    Actions.housingsList()
  }

  render () {
    const { isModalVisible, selectedHousing } = this.state
    const {
      adresse,
      contact,
      date_debut: dateDebut,
      date_fin: dateFin,
      membres,
      nom,
      note
    } = selectedHousing

    return (
      <View>
        <ModalComponent
          isModalVisible={isModalVisible}
          message='Voulez-vous supprimer définitivement cet élément ?'
          confirmLabel='Supprimer'
          closeModal={this.closeModal}
          onConfirm={this.onDeletionConfirm}
          onCancel={this.closeModal}
        />
        <Text>{adresse}</Text>
        <Text>{contact}</Text>
        <Text>{dateDebut}</Text>
        <Text>{dateFin}</Text>
        <Text>{membres}</Text>
        <Text>{nom}</Text>
        <Text>{note}</Text>
        <RoundButton onPress={() => this.setState({ isModalVisible: true })}>
          <Text>
            Delete
          </Text>
        </RoundButton>
      </View>
    )
  }
}

export default HousingDetails
