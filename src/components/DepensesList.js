import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View, Button, Picker } from 'react-native'
import { database, auth } from '../config/firebase'
import { Actions } from 'react-native-router-flux'

export default class DepenseList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sections: [],
      dataSource: [],
      prixTotal: 0,
      // Travel key correspondra à l'id du voyage
      travelKey: ''
    }
  }

  componentWillMount () {
    // Tableau que l'on affectera au state
  //  this.getTravelKeyByName()
    this.updateDepenses()
  }
  // Cette fonction sera appellée pour récupérer les dépenses du voyage avec un ref('voyages/travelKey/depenses')
  // getTravelKeyByName () {
  //   let TravelRef = database.ref('travels').orderByChild('name').equalTo(this.props.travel)
  //   TravelRef.once('value').then(TravelSnapshot => {
  //     const travelKey = TravelSnapshot.val().getKey()
  //     console.log('travelKey ----------------' + travelKey)
  //     this.setState({ travelKey })
  //   })
  // }

  updateDepenses () {
    console.log(this.props.travel)
    const sections = []
    let prixTotal = 0
    let depensesRef
    // Si isPersonalDepense === true c'est qu'on souhaite afficher uniquement les dépenses de l'utilisateurs
    if (this.state.isPersonalDepense === 'myDepense') {
      // On sélectionne les dépenses du voyage puis on filtre celles qui ont un payeur = à l'utilisateur connecté
      depensesRef = database.ref('voyages/0/depenses').orderByChild('payeur').equalTo(auth.currentUser.uid)
    } else {
      depensesRef = database.ref('voyages/0/depenses')
    }
    // .on value permet de mettre à jour la liste quand une dépense est ajoutée
    depensesRef.on('value', (depensesSnapshot) => {
      depensesSnapshot.forEach((child) => {
        child = child.val()
        // On récupère les informations du payeur
        let payeur = database.ref('utilisateurs/' + child.payeur).once('value').then(payeurSnapshot => {
          return payeurSnapshot.val()
        })
        // On met à jour le prix total
        prixTotal += parseFloat(child.montant)
        sections.push({
          data: [child, payeur]
        })
      })
      this.setState({ sections, prixTotal })
    })
  }
  renderItem = ({ item }) => {
    return (
      <View>
        <Text style={styles.item}>
          {item.data[0].intitule} {item.data[0].montant} € </Text>
      </View>
    )
  }

  render () {
    const { sections } = this.state
    const { prixTotal } = this.state
    return (
      <View style={styles.container}>
        <Picker
          selectedValue={this.state.isPersonalDepense}
          onValueChange={(itemValue) => {
            // Quand le picker change on change le state puis on met à jour la liste des dépenses. On utilise une fonction callback car aucune méthode lifecycle avant 'render' ne permet d'utiliser setState qui est appelé par updateDepenses()
            this.setState({ isPersonalDepense: itemValue }, () => { this.updateDepenses() })
          }
          }>
          {/* Les values sont des strings car il ne semble pas y avoir de moyen d'utiliser de boolean pour ce composant */}
          <Picker.Item label='Toutes les dépenses' value='allDepense' />
          <Picker.Item label='Mes dépenses' value='myDepense' />
        </Picker>
        <FlatList
          data={sections}
          renderItem={this.renderItem}
        />
        <Text style={styles.item}>Total : {prixTotal} €</Text>
        <Button
          onPress={() => {
            Actions.createDepense()
          }}
          title='ajouter une dépense' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: 'rgba(0,0,0,1.0)'
  }

})
