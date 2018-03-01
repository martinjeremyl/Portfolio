import React, { Component } from 'react'
import { TextInput, View, Text, StyleSheet } from 'react-native'
import { database } from '../config/firebase'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import { format } from 'date-fns'

export default class CreationDepense extends Component {
  constructor (props) {
    super(props)
    this.state = {
      titre: 'Votre titre',
      montant: '0',
      users: [],
      payeur: {},
      membres: {},
      date: format(Date.now(), 'YYYY-MM-DD')
    }
  }

  componentWillMount () {
    let travelUsersRef = database.ref('voyages/0/membres')
    let users = []
    travelUsersRef.on('value', (travelUsersSnapshot) => {
      travelUsersSnapshot.forEach((child) => {
        child = child.val()
        database.ref('users/' + child).once('value').then(usersSnapshot => {
          let userSnapshotVal = usersSnapshot.val()
          users.push({ 'key': usersSnapshot.key, 'name': userSnapshotVal.name, 'surname': userSnapshotVal.surname })
        })
      })
    })
    this.setState({ users }, () => this.forceUpdate())
  }

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

  loadTravelUsers () {
    let travelUsersRef = database.ref('voyages/0/membres')
    let users = []
    travelUsersRef.on('value', (travelUsersSnapshot) => {
      travelUsersSnapshot.forEach((child) => {
        child = child.val()
        database.ref('users/' + child).once('value').then(usersSnapshot => {
          let userSnapshotVal = usersSnapshot.val()
          users.push({ 'key': usersSnapshot.key, 'name': userSnapshotVal.name, 'surname': userSnapshotVal.surname })
        })
      })
    })
    this.setState({ users })
  }

  render () {
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
          onSelect={(payeur) => this.onSelect(payeur)}>
          {this.state.users.map(user =>
            <RadioButton value={user.key}>
              <Text>a</Text>
            </RadioButton>
          )}
        </RadioGroup>
        <Text style={styles.item}>Personnes concernées</Text>
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
