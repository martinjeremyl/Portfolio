import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View, Image, Picker, TouchableHighlight } from 'react-native'
import { database, auth } from '../config/firebase'
import { Actions } from 'react-native-router-flux'
import { RoundButton } from './RoundButton'

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
        let key = child.key
        child = child.val()
        console.log('le child ---------------', child)
        // On récupère les informations du payeur
        let payeur = database.ref('utilisateurs/' + child.payeur).once('value').then(payeurSnapshot => {
          return payeurSnapshot.val()
        })
        // On met à jour le prix total
        prixTotal += parseFloat(child.montant)
        sections.push({
          data: [child, payeur, key]
        })
      })
      this.setState({ sections, prixTotal })
    })
  }

  editDepense (depenseKey) {
    Actions.editDepense({ depenseKey: depenseKey, travel: this.props.travel })
  }

  renderItem = ({ item }) => (
    <TouchableHighlight onPress={() => this.editDepense(item.data[2])} style={styles.item}>
      <View>
        <Text style={styles.itemLabel}>
          {item.data[0].intitule}
        </Text>
        <Text style={styles.itemAmount}>
          {this.formatCurrency(item.data[0].montant)}
        </Text>
        <Image
          style={styles.itemBonus}
          source={require('../img/default-avatar.png')}
          resizeMode='contain'
        />
      </View>
    </TouchableHighlight>
  )

  renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: '#334050'
      }}
    />
  )

  formatCurrency = amount => Number(amount).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })

  handleButtonClick = () => Actions.createDepense({ travel: this.props.travel })

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
          ItemSeparatorComponent={this.renderSeparator}
        />
        <View style={styles.item}>
          <Text style={styles.itemLabel}>Total</Text>
          <Text style={styles.itemAmount}>{this.formatCurrency(prixTotal)}</Text>
          <RoundButton onPress={this.handleButtonClick}>
            <Text style={styles.plusButtonText}>
              +
            </Text>
          </RoundButton>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: '#fff',
    paddingLeft: '5%',
    paddingRight: '5%'
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginTop: 15,
    marginBottom: 15
  },
  itemLabel: {
    flex: 1,
    fontSize: 16,
    color: '#334050'
  },
  itemAmount: {
    flex: 0,
    flexBasis: 90,
    fontSize: 16,
    color: '#334050'
  },
  itemBonus: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 20,
    width: undefined,
    height: undefined
  },
  plusButtonText: {
    fontSize: 32,
    fontWeight: '100',
    color: '#fff'
  }
})
