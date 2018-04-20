import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Modal from 'material-ui/Modal'

import ListItem from '../../components/ListItem'
import FixedActionButton from '../../components/FixedActionButton'
import Link from '../../components/Link'
import ConfirmDeleteDialog from '../../components/ConfirmDeleteDialog'
import Navbar from '../../components/Navbar'
import Header from '../../components/Header'

import TravelCreationPage from './TravelCreationPage'

@inject('appStore', 'travelStore')
@observer
class TravelPage extends Component {
  state = {
    open: false
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  deleteTravel = () => {
    // Supprime le voyage dont l'id est stocké dans le store lorsque la fenêtre est ouverte
    this.props.travelStore.delete(this.props.appStore.idObjectToDelete.get())
  }

  render () {
    const { appStore, travelStore } = this.props

    return (
      <div>
        <Header />
        <Navbar />
        {
          travelStore.travels.map(({ id, name }, iteration) => (
            <ListItem
              key={id}
              iteration={iteration}
              onClick={() => travelStore.setCurrentTravelId(id)}
            >
              <div>
                <div>
                  <Link to='/travel/'>
                    <div>{name}</div>
                  </Link>
                  <div
                    onClick={e => {
                      e.stopPropagation()
                      appStore.openConfirmDeleteDialog(id)
                    }}
                  >
                    Supprimer
                  </div>
                </div>
              </div>
            </ListItem>
          ))
        }
        <ConfirmDeleteDialog isOpen={appStore.confirmDeleteDialogStatus.get()} deleteFunction={this.deleteTravel} />
        <Modal
          aria-labelledby='Ajouter un voyage'
          aria-describedby="Fenêtre de création d'un nouveau voyage"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={{
            position: 'absolute',
            top: '33%',
            left: '25%',
            width: '50%',
            backgroundColor: 'white',
            boxShadow: '2px',
            padding: '20px'
          }}>
            <TravelCreationPage parent={this} />
          </div>
        </Modal>
        <FixedActionButton color='secondary' onClick={() => this.handleOpen()} />
      </div>
    )
  }
}

export default TravelPage
