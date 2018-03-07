import React, { Component } from 'react'
import { TextInput, View, Text, StyleSheet, Button } from 'react-native'
import { database } from '../config/firebase'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import { format } from 'date-fns'
import SelectMultiple from 'react-native-select-multiple'
import { Actions } from 'react-native-router-flux'
import { snapshotToArray } from '../util'

export default class CreationDepense extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // Le titre de la dépense
      titre: 'Votre titre',
      // Le montant de la dépense
      montant: '0',
      // La liste des membres du voyage
      users: [],
      // Le membre qui paye la dépense
      payeur: {},
      // Tableau semblable a users sous la forme : label: nom prenom value: key
      membres: [],
      // Les personnes qui sont concernées par la dépense
      concernedMembers: [],
      // La date de la dépense, par défaut la date d'aujourd'hui
      date: format(Date.now(), 'YYYY-MM-DD')
    }
  }

  onSelectionsChange = (concernedMembers) => {
    this.setState({ concernedMembers })
  }

  // Si on est en édition on remplit les champs
  componentWillMount () {
    this.props.depenseKey !== undefined ? this.hydrateInputsFromDepense(this.props.depenseKey) : this.loadTravelUsers()
  }
  // Fonction de validation de saisi sur l'input montant ( à optimiser avec du regex dans un second temps )
  checkNumber (montant) {
    if (!Number.isNaN(Number(montant))) {
      this.setState({ montant })
    } else {
      alert('Vous ne pouvez écrire que des nombres !')
      this.setState({ montant: 0 })
    }
  }

  formatCurrency = amount => Number(amount).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })

  onSelect (payeur) {
    this.setState({ payeur })
  }

  async loadTravelUsers () {
    // On récupère tous les membres du voyages
    let travelUsersRef = database.ref('voyages/0/membres')
    let users = []
    let membres = []
    travelUsersRef.on('value', async (travelUsersSnapshot) => {
      const userIds = snapshotToArray(travelUsersSnapshot)
      await Promise.all(
        userIds.map(async (user) => {
          // On récupère la "clé étrangère" et on récupère les informations du user depuis cette clé
          const userSnapshotFromDb = await database.ref('users/' + user).once('value')
          const userFromDb = userSnapshotFromDb.val()
          // On push dans user
          users.push({ 'key': user, 'name': userFromDb.name, 'surname': userFromDb.surname })
          // On push dans membres ( membres pourra être remplacé par un appel de la fonction map() sur users )
          membres.push({ label: userFromDb.surname + userFromDb.name, value: user })
        })
      )
      this.setState({ users, membres })
    })
  }
  // Fonction qui remplit les champs si on est en mode édition
  hydrateInputsFromDepense (id) {
    database.ref(`voyages/0/depenses/${id}`).once('value').then((depenseSnapshot) => {
      let snapShotVal = depenseSnapshot.val()
      let montant = snapShotVal.montant
      let titre = snapShotVal.intitule
      let date = snapShotVal.date
      let payeur = snapShotVal.payeur
      let concernedMembers = snapShotVal.membres
      // On doit appeller loadTravelUsers pour générer les checkboxs et les radios buttons
      this.loadTravelUsers()
      this.setState({ montant, titre, date, concernedMembers, payeur })
    })
  }

  async createOrUpdateDepense () {
    let depenseRef = this.props.depenseKey !== undefined ? database.ref(`voyages/0/depenses/${this.props.depenseKey}`) : database.ref('voyages/0/depenses')
    const depense = {
      date: this.state.date,
      intitule: this.state.titre,
      montant: this.state.montant,
      payeur: this.state.payeur,
      membres: this.state.concernedMembers
    }
    await Promise.all(this.props.depenseKey !== undefined ? depenseRef.set(depense) : depenseRef.push(depense)).then(() => {
      Actions.depensesList({ 'travel': this.props.travel })
    })
  }

  findPayeurIndex () {
    return this.state.users.findIndex((element) => {
      return element.key === this.state.payeur
    })
  }

  render () {
    const prixParPersonne = this.state.concernedMembers.length !== 0 ? this.state.montant / this.state.concernedMembers.length : 0
    return (
      <View style={styles.container}>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={titre => {
            this.setState({ titre })
          }}
          value={this.state.titre}
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          keyboardType='numeric'
          onChangeText={(montant) => this.checkNumber(montant)}
          value={this.state.montant}
        />
        <Text style={styles.item}>Payé par</Text>
        <RadioGroup
          onSelect={(index, payeur) => this.onSelect(payeur)}
          selectedIndex={
            this.findPayeurIndex()
          }>
          {this.state.users.map(user =>
            <RadioButton value={user.key}>
              <Text>{user.surname} {user.name}</Text>
            </RadioButton>
          )}
        </RadioGroup>
        <Text style={styles.item}>Personnes concernées</Text>
        <SelectMultiple
          items={this.state.membres}
          selectedItems={this.state.concernedMembers}
          onSelectionsChange={this.onSelectionsChange} />
        {/* Vu que le montant du remboursement est le même pour tous on peut le spécifié dans un seul champ   */}
        <Text style={styles.item}>Prix par personne concernée : {this.formatCurrency(prixParPersonne)}</Text>

        <Button
          title='Valider ma dépense'
          onPress={() => { this.createOrUpdateDepense() }}
          color='black'
        />
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
