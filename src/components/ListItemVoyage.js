import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Avatar from './Avatar'
import Card, { CardContent, CardMedia } from 'material-ui/Card'
import { withStyles } from 'material-ui/styles'
import Link from './Link'

const styles = {
  card: {
    width: '90%',
    margin: 'auto',
    marginBottom: '20px'
  },
  cardContent: {
    padding: '0',
    margin: '0'
  },
  cardTitle: {
    fontSize: '22px',
    padding: '0',
    margin: '0',
    color: 'black'
  },
  cardSubTitle: {
    fontSize: '18px',
    padding: '0',
    margin: '0',
    color: 'black'
  }
}
@inject('appStore', 'userStore', 'travelStore')
@observer
class ListItemVoyage extends Component {
  render () {
    const travel = this.props.travel

    const imagePlage = require('../img/imgVoyages/Plage.jpg')
    const imageMontain = require('../img/imgVoyages/Montain.jpg')
    const imageAurore = require('../img/imgVoyages/Aurore.jpg')
    const imageNeige = require('../img/imgVoyages/Neige.jpg')
    const imageVille = require('../img/imgVoyages/Ville.jpg')
    const imageChamp = require('../img/imgVoyages/Champ.jpg')
    const imageForet = require('../img/imgVoyages/Foret.jpg')

    let image

    switch (travel.image) {
      case 'Plage.jpg':
        image = imagePlage
        break
      case 'Foret.jpg':
        image = imageForet
        break
      case 'Montain.jpg':
        image = imageMontain
        break
      case 'Aurore.jpg':
        image = imageAurore
        break
      case 'Neige.jpg':
        image = imageNeige
        break
      case 'Ville.jpg':
        image = imageVille
        break
      case 'Champ.jpg':
        image = imageChamp
        break
      default:
        image = imageChamp
    }
    return (
      <Card style={styles.card} key={travel.id}>
        <Link to={'/travels/' + travel.id} onClick={() => this.props.travelStore.setCurrentTravelId(travel.id)}>
          <CardMedia
            style={{
              width: '100%',
              height: '200px',
              position: 'relative',
              backgroundSize: 'cover'
            }}
            image={image}
          >
            <div
              style={{
                position: 'absolute',
                bottom: '5px',
                left: '5px',
                display: 'flex'
              }}
            >
              {travel.participants &&
                travel.participants.map(item => {
                  return (
                    <Avatar
                      key={item.id}
                      src={item.avatar}
                      style={{
                        width: '25px',
                        height: '25px',
                        fontSize: '25px'
                      }}
                    />
                  )
                })}
            </div>
          </CardMedia>
        </Link>
        <CardContent style={styles.cardContent}>
          <h1 style={styles.cardTitle}>
            <Link to={'/travels/' + travel.id} onClick={() => this.props.travelStore.setCurrentTravelId(travel.id)}>
              {travel.name}
            </Link>
          </h1>
          <h2 style={styles.cardSubTitle}>
            {travel.startDate} - {travel.endDate}
          </h2>
        </CardContent>
      </Card>
    )
  }
}
export default withStyles(styles)(ListItemVoyage)
