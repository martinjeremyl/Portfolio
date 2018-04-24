import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'

import ListItem from '../../components/ListItem'
import FixedActionButton from '../../components/FixedActionButton'
import ConfirmDeleteDialog from '../../components/ConfirmDeleteDialog'
import Navbar from '../../components/Navbar'
import Header from '../../components/Header'

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
        {travelStore.travels.map(({ id, name }, iteration) => (
          <ListItem
            key={id}
            iteration={iteration}
            onClick={() => travelStore.setCurrentTravelId(id)}
          >
            <div>
              <div>
                <Link to={`/travel/${id}`}>
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
        ))}
        <ConfirmDeleteDialog
          isOpen={appStore.confirmDeleteDialogStatus.get()}
          deleteFunction={this.deleteTravel}
        />
        <Link to='/travels/create'>
          <FixedActionButton color='secondary' />
        </Link>
      </div>
    )
  }
}

export default TravelPage
