import React, { Component } from 'react'
import { Image, TextInput, View, Text, StyleSheet, Button } from 'react-native'
import { database, auth } from '../config/firebase'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import { format } from 'date-fns'
import SelectMultiple from 'react-native-select-multiple'
import { Actions } from 'react-native-router-flux'
import { formatCurrency, snapshotToArray } from '../util'
import { RoundButton } from './RoundButton'
import { ModalComponent } from './ModalComponent'

export default class CreationDepense extends Component {
  state = {
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
    date: format(Date.now(), 'YYYY-MM-DD'),
    isModalVisible: false
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
      membres: this.state.concernedMembers,
      createur: auth.currentUser.uid
    }
    await Promise.all(this.props.depenseKey !== undefined ? depenseRef.set(depense) : depenseRef.push(depense)).then(() => {
      Actions.depensesList({ travel: this.props.travel })
    })
  }

  findPayeurIndex () {
    return this.state.users.findIndex((element) => {
      return element.key === this.state.payeur
    })
  }

  closeModal = () => this.setState({ isModalVisible: false })

  onDeletionConfirm = async () => {
    this.closeModal()
    await database.ref(`voyages/0/depenses/${this.props.depenseKey}`)
      .remove()
    Actions.depensesList({ travel: this.props.travel })
  }

  render () {
    const { concernedMembers, isModalVisible, membres, montant, titre, users } = this.state
    const prixParPersonne = concernedMembers.length !== 0 ? montant / concernedMembers.length : 0
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
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={titre => {
            this.setState({ titre })
          }}
          value={titre}
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          keyboardType='numeric'
          onChangeText={(montant) => this.checkNumber(montant)}
          value={montant}
        />
        <Text style={styles.item}>Payé par</Text>
        <RadioGroup
          onSelect={(index, payeur) => this.onSelect(payeur)}
          selectedIndex={
            this.findPayeurIndex()
          }>
          {users.map(user =>
            <RadioButton value={user.key}>
              <Text>{user.surname} {user.name}</Text>
            </RadioButton>
          )}
        </RadioGroup>
        <Text style={styles.item}>Personnes concernées</Text>
        <SelectMultiple
          items={membres}
          selectedItems={concernedMembers}
          onSelectionsChange={this.onSelectionsChange} />
        {/* Vu que le montant du remboursement est le même pour tous on peut le spécifié dans un seul champ   */}
        <Text style={styles.item}>Prix par personne concernée : {formatCurrency(prixParPersonne)}</Text>
        {
          this.props.depenseKey !== undefined && (
            <RoundButton
              onPress={() => this.setState({ isModalVisible: true })}
            >
              <Image
                style={styles.buttonImage}
                source={require('../img/icons/Bin.png')}
                resizeMode='contain'
              />
            </RoundButton>
          )
        }

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
  },
  buttonImage: {
    flex: 1
  }
})
