import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog'

@inject('appStore')
@observer
class ConfirmDeleteDialog extends Component {
  handleClose = () => {
    this.props.appStore.closeConfirmDeleteDialog()
  }

  handleCloseAndDelete = () => {
    this.props.deleteFunction()
    this.handleClose()
  }

  render () {
    return (
      <Dialog
        open={this.props.isOpen}
        onClose={this.handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Confirmation de suppression'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Êtes-vous sûr de vouloir supprimer cet objet ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color='secondary'>
            Annuler
          </Button>
          <Button onClick={this.handleCloseAndDelete} color='primary' autoFocus>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default ConfirmDeleteDialog
