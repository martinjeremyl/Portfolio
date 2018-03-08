import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { observer, inject } from 'mobx-react'
import { RoundButton } from '../../components/RoundButton'
import { ModalComponent } from '../../components/ModalComponent'
import { Actions } from 'react-native-router-flux'

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
      notes
    } = selectedHousing

    return (
      <View style={styles.container}>
        <ModalComponent
          isModalVisible={isModalVisible}
          message='Voulez-vous supprimer définitivement cet élément ?'
          confirmLabel='Supprimer'
          closeModal={this.closeModal}
          onConfirm={this.onDeletionConfirm}
          onCancel={this.closeModal}
        />
        <View style={styles.rowInfos}>
          <Text style={styles.champs}>Nom</Text>
          <Text style={styles.infos}>{nom}</Text>
        </View>
        <View style={styles.rowInfos}>
          <Text style={styles.champs}>Adresse</Text>
          <Text style={styles.infos}>{adresse}</Text>
        </View>
        <View style={styles.rowInfos}>
          <Text style={styles.champs}>Contact</Text>
          <Text style={styles.infos}>{contact}</Text>
        </View>

        <View style={styles.rowInfos}>
          <Text style={styles.champs}>Dates</Text>
        </View>
        <View style={styles.rowDates}>
          <Text style={styles.infosDate}>{dateDebut}</Text>
          <View style={styles.infosDate}>
            <Image
              style={styles.arrowDate}
              transform={([{ rotateZ: '180deg' }])}
              source={require('../../img/icons/Arrow_rose.png')}
            />
          </View>

          <Text style={styles.infosDate}>{dateFin}</Text>
        </View>

        <View style={styles.rowNotes}>
          <Text style={styles.champs}>Notes</Text>
          <Text style={styles.infosNotes}>{notes}</Text>
        </View>
        <View style={styles.participants}>
          <Text style={styles.champs}>Liste des participants</Text>
          <Image
            source={'uri:{membres.avatar}'}
          />
          <Text style={styles.infosNotes}>{membres}</Text>
        </View>
        <RoundButton onPress={() => this.setState({ isModalVisible: true })}>
          <Text>
            Delete
          </Text>
        </RoundButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    padding: '10%'
  },
  champs: {
    color: '#646464',
    fontFamily: 'Jura',
    fontSize: 17
  },
  infos: {
    width: '70%',
    color: '#2C3E50',
    fontFamily: 'Jura',
    fontSize: 17
  },
  infosDate: {
    color: '#2C3E50',
    fontFamily: 'Jura',
    fontSize: 17
  },
  containerDate: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  rowDates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '10%'
  },
  arrowDate: {
    height: 30,
    width: 30,
    marginTop: -9
  },
  rowInfos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '10%'
  },
  rowNotes: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: '10%'
  },
  infosNotes: {
    marginTop: '10%',
    color: '#2C3E50',
    fontFamily: 'Jura',
    fontSize: 17
  },
  participants: {
    flex: 1,
    flexDirection: 'column'
  }

})

export default HousingDetails
