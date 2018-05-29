import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Card, { CardMedia } from 'material-ui/Card'
import TravelMenuDrawer from './components/TravelMenuDrawer'
import Button from '../../components/buttons/Button'
import Avatar from '../../components/Avatar'
import TravelDetailEditMenu from './components/TravelDetailEditMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

@inject('travelStore')
@observer
class TravelDetailPage extends Component {
  state = {
    isEditTravelMenuOpen: false
  }

  openEditTravelMenu = () => this.setState({ isEditTravelMenuOpen: true })

  closeEditTravelMenu = () => this.setState({ isEditTravelMenuOpen: false })

  async componentDidMount () {
    const { travelStore, match } = this.props
    await travelStore.fetchTravels()
    travelStore.setCurrentTravelId(match.params.id)
  }

  renderMenuButton = () => {
    // Render the burger menu icon with the swapeable drawer
    return (<TravelMenuDrawer travelId={this.props.travelStore.currentTravelId} />)
  }

  render () {
    const { travelStore } = this.props
    const styles = {
      card: {
        width: '100%',
        height: '250px',
        margin: 'auto',
        position: 'relative'
      }
    }
    const { travel } = travelStore

    const imagePlage = require('../../img/imgVoyages/Plage.jpg')
    const imageMontain = require('../../img/imgVoyages/Montain.jpg')
    const imageAurore = require('../../img/imgVoyages/Aurore.jpg')
    const imageNeige = require('../../img/imgVoyages/Neige.jpg')
    const imageVille = require('../../img/imgVoyages/Ville.jpg')
    const imageChamp = require('../../img/imgVoyages/Champ.jpg')
    const imageForet = require('../../img/imgVoyages/Foret.jpg')

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
      <div style={{width: '100%', height: '100%'}}>
        {/*  Gère le bouton "edit" */}
        <Button
          onClick={() => this.openEditTravelMenu()}
          variant='fab'
          color={this.props.color}
          aria-label='add'
          className='mainBackgroundColor'
          style={{
            position: 'absolute',
            zIndex: '1',
            top: '222px',
            right: '2%'
          }}
          value={<FontAwesomeIcon icon={['fal', 'pen']} style={{color: 'white'}} />}
          {...this.props}
        />
        {/*  La page est divisée en 2, Card est utilisé pour gerer le contenu qui se situe dans l'image */}
        <Card style={styles.card} key={travel.id}>
          <div style={{marginLeft: '-3%', marginTop: '2%', position: 'absolute', zIndex: '1'}}>
            <TravelMenuDrawer />
          </div>
          <div style={{ color: 'white', fontSize: '18px', fontFamily: 'Proxima-Nova-Alt-Regular', marginLeft: '5%', bottom: '5%', position: 'absolute', zIndex: '1' }}>
            <h1>{travelStore.travel.name}</h1>
            <div style={{ backgroundColor: 'white', height: '1pt', width: '80%', marginLeft: '5%', marginBottom: '10%' }} />
            <div>{travelStore.travel.startDate}  -  {travelStore.travel.endDate}</div>
          </div>
          <CardMedia style={{ width: '100%', height: '100%', position: 'absolute', backgroundSize: 'cover' }} image={image} />
          <div style={{background: '#4B5C6D', zIndex: '1', opacity: '0.5', width: '100%', height: '100%'}} />
        </Card>
        <div style={{ marginTop: '15%', marginLeft: '5%', marginRight: '5%', padding: '5%', textAlign: 'justify', backgroundColor: '#FDF5F4' }}>
          <div>{travelStore.travel.description}</div>
        </div>
        <div style={{ margin: '8%' }}>
          <div>Participants :
            <div style={{display: 'flex'}}>
              {travelStore.travel && travelStore.travel.members.map(
                (member, index) => {
                  if (index < 3) {
                    return (<Avatar name={`${member.name} ${member.surname}`} />)
                  } else if (index === travelStore.travel.members.length - 1) {
                    return (<Avatar name={`+ ${travelStore.travel.members.length - 3}`} />)
                  }
                })}
            </div>
          </div>
          <TravelDetailEditMenu
            isEditTravelMenuOpen={this.state.isEditTravelMenuOpen}
            closeEditTravelMenu={this.closeEditTravelMenu}
          />
        </div>

      </div>
    )
  }
}

export default TravelDetailPage
