import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Header from '../../components/Header'
import Input from '../../components/Input'
import MaterialDatePicker from '../../components/datetime/DatePicker'
import Avatar from '../../components/Avatar'
import Button from '../../components/buttons/Button'
import AddUsersDialog from '../../components/AddUsersDialog'

@inject('spendingStore')
@observer
class SpendingCreation extends Component {
  state = {
    open: false,
    isMultiple: false,
    dialogEntityType: 'spending'
  }

  updateField = ({ target: {name, value} }) => {
    this.props.spendingStore.updateSpendingCreation(name, value)
  }

  updateDateField = (value) => this.props.spendingStore.updateSpendingCreation('date', value.format())

  handleClickOpen = (multiple) => {
    this.setState({
      open: true,
      isMultiple: multiple,
      errors: {}
    })
  }
  handleClose = () => {
    this.setState({ open: false })
  }

  onLoginSuccessful = () => {
    // On mettra ici la redirection vers la page détail de la dépense ou la liste des dépenses
    this.props.history.push('/travels')
  }
  render () {
    let {spendingStore} = this.props
    const {name, amount, date, creator, recipients} = spendingStore.spendingCreation
    return (
      <div>
        <Header />
        <Input
          name='name'
          placeholder='Nom de la dépense'
          value={name}
          required
          error={spendingStore.errors && spendingStore.errors.name !== undefined}
          label={(spendingStore.errors && spendingStore.errors.name !== undefined) && spendingStore.errors.name}
          onChange={this.updateField}
        />
        <Input
          name='amount'
          placeholder='Montant ( en € )'
          value={amount}
          required
          error={spendingStore.errors && spendingStore.errors.amount !== undefined}
          label={(spendingStore.errors && spendingStore.errors.amount !== undefined) && spendingStore.errors.amount}
          onChange={this.updateField}
        />
        <MaterialDatePicker
          name='date'
          value={date}
          error={spendingStore.errors && spendingStore.errors.date !== undefined}
          label={(spendingStore.errors && spendingStore.errors.date !== undefined) && spendingStore.errors.date}
          onChange={this.updateDateField}
        />
        <h3>Payé par</h3>
        {
          creator && creator.name !== undefined && creator.surname !== undefined && <Avatar name={`${creator.name} ${creator.surname}`} />
        }
        {(spendingStore.errors && spendingStore.errors.creator !== undefined) && spendingStore.errors.creator}
        <Button
          value='Add'
          onClick={() => { return this.handleClickOpen(false) }}
        />
        <h3>Membres concernés :</h3>
        {
          recipients.map(recipient => <Avatar name={`${recipient.name} ${recipient.surname}`} />)
        }
        {(spendingStore.errors && spendingStore.errors.recipients !== undefined) && spendingStore.errors.recipients }
        <Button
          value='Add'
          onClick={() => { return this.handleClickOpen(true) }}
        />
        <AddUsersDialog
          open={this.state.open}
          onClose={this.handleClose}
          match={this.props.match}
          isMultiple={this.state.isMultiple}
          dialogEntityType={this.state.dialogEntityType}
        />
        <Button
          value='Valider'
          onClick={() => {
            spendingStore.create({
              onSuccess: this.onLoginSuccessful,
              onError: () => {
                this.setState({})
              },
              travelId: this.props.match.params.id
            })
          }}
        />
      </div>
    )
  }
}

export default SpendingCreation
