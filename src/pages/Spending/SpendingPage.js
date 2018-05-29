import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import ConfirmDeleteDialog from '../../components/ConfirmDeleteDialog'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import ListItemSpending from './components/ListItemSpending'
import LabelBottomNavigation from '../../components/LabelBottomNavigation'
import IconButton from 'material-ui/IconButton'
import AddIcon from '@material-ui/icons/Add'
import { Link } from 'react-router-dom'

@inject('appStore', 'spendingStore', 'travelStore')
@observer
class SpendingPage extends Component {
  state = {
    open: false
  }

  componentWillMount () {
    this.props.travelStore.setCurrentTravelId(this.props.match.params.id)
    this.props.spendingStore.fetchSpendings()
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  deleteSpending = () => {
    // Supprime la dépense dont l'id est stocké dans le store lorsque la fenêtre est ouverte
    this.props.spendingStore.delete(this.props.appStore.idObjectToDelete.get())
  }
  addButton = () => {
    return (
      <Link to={`/travels/${this.props.travelStore.currentTravelId}/createSpending`}>
        <IconButton color='inherit' aria-label='Menu'>
          <AddIcon style={{color: 'white', fontSize: '36px'}} />
        </IconButton>
      </Link>
    )
  }

  render () {
    const { appStore, spendingStore } = this.props
    return (
      <div>
        <Header renderRightButton={this.addButton} />
        <Navbar />
        <div style={{ width: '100%', marginTop: '20px', textAlign: 'center' }}>
          {spendingStore.spendings.map((item, index) => item !== undefined && <ListItemSpending key={index} index={index} spending={item} />)}
        </div>
        <LabelBottomNavigation />
        <ConfirmDeleteDialog
          isOpen={appStore.confirmDeleteDialogStatus.get()}
          deleteFunction={this.deleteSpending}
        />
      </div>
    )
  }
}

export default SpendingPage
