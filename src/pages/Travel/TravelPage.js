import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import FixedActionButton from '../../components/FixedActionButton'
import ConfirmDeleteDialog from '../../components/ConfirmDeleteDialog'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import ListItemVoyage from '../../components/ListItemVoyage'

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
        <div style={{ width: '100%', marginTop: '20px', textAlign: 'center' }}>
          {travelStore.travels.map(item => <ListItemVoyage key={item.id} travel={item} />)}
        </div>
        <ConfirmDeleteDialog
          isOpen={appStore.confirmDeleteDialogStatus.get()}
          deleteFunction={this.deleteTravel}
        />
        <Link to='travels/create'>
          <FixedActionButton color='secondary' />
        </Link>
      </div>
    )
  }
}

export default TravelPage
