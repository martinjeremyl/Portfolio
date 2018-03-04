import React, { Component } from 'react'
import { SectionList, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'

@inject('housing')
@observer
export default class HousingList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sections: []
    }
  }

  componentDidMount () {
    const { housings } = this.props.housing

    const dateDebut = housings.map(logement => logement.date_debut)
    const sortedLogements = dateDebut.reduce((sortedLogements, dateDebut) => {
      sortedLogements[dateDebut] = housings.filter(logement => logement.date_debut === dateDebut)
      return sortedLogements
    }, {})
    const sections = Object.keys(sortedLogements).map(dateDebut => ({
      title: dateDebut,
      data: sortedLogements[dateDebut].map(logement => logement.nom)
    }))
    this.setState({ sections })
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          Actions.housingDetails({ selectedTravel: item })
        }}
      >
        <View style={styles.item}>
          <View style={styles.infos}>
            <Text style={styles.text}>{item}</Text>
            <Text style={styles.text}>pictos</Text>
          </View>
          <View style={styles.btnRejoindre}>
            <Button color='#D42B64' title='Rejoindre' onPress={() => {}} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderSectionHeader = ({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>

  render () {
    const { sections } = this.state
    return (
      <View style={styles.container}>
        <SectionList
          sections={sections}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          keyExtractor={(item, index) => index}
        />
        <TouchableOpacity style={styles.btnAjout}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  /* tout le contenu de la page */
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 22
  },
  btnAjout: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: '#D42B64',
    borderRadius: 30,
    bottom: 10,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnRejoindre: {
    borderRadius: 0,
    backgroundColor: '#D42B64'
  },
  plus: {
    color: 'white',
    fontSize: 40
  },
  /*  date  */
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold'
    /* fontSize: 18 */
  },
  infos: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2C3E50'
  },

  text: {
    color: 'white',
    padding: 10,
    fontFamily: 'Jura',
    fontSize: 18
  },

  /* texte du contenu du logement */
  item: {
    fontSize: 18,
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 10,
    textAlign: 'left',
    paddingVertical: 10,
    alignItems: 'stretch',
    justifyContent: 'space-between'
  }
})
