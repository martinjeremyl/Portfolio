import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog'
import Avatar from './Avatar'
import ListItem from './ListItem'

@inject('appStore', 'travelStore', 'spendingStore')
@observer
class AddUsersDialog extends Component {
  // Pour rendre la modale d'ajout de membres générique, il faut spécifier l'entité visée et le fait de pouvoir ou non ajouter plusieurs membres
    state = {
      members: undefined
    }
    addRecipient (member) {
      this.props.spendingStore.addRecipient(member)
    }
    setCreator (member) {
      this.props.spendingStore.setCreator(member)
    }
    addMember (member) {
      if (this.props.isMultiple === false && this.props.dialogEntityType === 'spending') {
        this.setCreator(member)
      } else if (this.props.isMultiple === true && this.props.dialogEntityType === 'spending') {
        this.addRecipient(member)
      }
    }
    async componentDidMount () {
      this.props.travelStore.setCurrentTravelId(this.props.match.params.id)
      let members = await this.props.travelStore.fetchCurrentTravelParticipants()
      this.setState({members})
    }
    render () {
      return (
        <Dialog
          open={this.props.open}
          onClose={this.onClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{'Ajouter des membres'}</DialogTitle>
          <DialogContent>
            { this.state.members !== undefined && this.state.members.map(member => {
              return (
                <ListItem onClick={() => { return this.addMember(member) }} key={member.id}>
                  <Avatar name={`${member.name} ${member.surname}`} />
                  <h4>{`${member.name} ${member.surname}`}</h4>
                </ListItem>
              )
            })
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClose} color='secondary'>
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
      )
    }
}

export default AddUsersDialog
