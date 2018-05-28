import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import FixedActionButton from '../../components/buttons/FixedActionButton'
import ConfirmDeleteDialog from '../../components/ConfirmDeleteDialog'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import ListItemSpending from './components/ListItemSpending'
import LabelBottomNavigation from '../../components/LabelBottomNavigation'

@inject('appStore', 'spendingStore')
@observer
class SpendingPage extends Component {
  state = {
    open: false
  }

  componentWillMount () {
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

  render () {
    const { appStore, spendingStore } = this.props
    return (
      <div>
        <Header />
        <Navbar />
        <div style={{ width: '100%', marginTop: '20px', textAlign: 'center' }}>
          {spendingStore.spendings.map(item => <ListItemSpending key={item.uid} spending={item} />)}
        </div>
        <LabelBottomNavigation />
        <ConfirmDeleteDialog
          isOpen={appStore.confirmDeleteDialogStatus.get()}
          deleteFunction={this.deleteSpending}
        />
        <Link to='travels/create'>
          <FixedActionButton color='secondary' />
        </Link>
      </div>
    )
  }
}

export default SpendingPage
