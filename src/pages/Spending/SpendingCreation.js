import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import Header from '../../components/Header'
import Input from '../../components/Input'
import MaterialDatePicker from '../../components/datetime/DatePicker'
import Avatar from '../../components/Avatar'
import Button from '../../components/buttons/Button'
import AddUsersDialog from '../../components/AddUsersDialog'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

@inject('spendingStore')
@observer
class SpendingCreation extends Component {
  state = {
    open: false,
    isMultiple: false,
    dialogEntityType: 'spending',
    isModification: this.props.location.pathname.includes('edit')
  }

  updateField = ({target: {name, value}}) => {
    this.props.spendingStore.updateSpendingCreation(name, value)
  }

  componentDidMount () {
    this.state.isModification || this.props.spendingStore.currentSpendingId.get().length === 0 ? this.getSpending() : this.props.spendingStore.clearSpendingCreation()
  }
  updateDateField = value => {
    this.props.spendingStore.updateSpendingCreation('date', value.format())
  }

  async getSpending () {
    await this.props.spendingStore.fetchSpendings()
    this.props.spendingStore.setSpendingCreation(this.props.spendingStore.spendings[this.props.match.params.index])
  }
  handleClickOpen = (multiple) => {
    this.setState({
      open: true,
      isMultiple: multiple,
      errors: {}
    })
  }
  handleClose = () => {
    this.setState({open: false})
  }

  onLoginSuccessful = () => {
    // On mettra ici la redirection vers la page détail de la dépense ou la liste des dépenses
    this.props.history.push('/travels')
  }

  render() {
    let {spendingStore} = this.props
    const {name, amount, date, creator, recipients} = spendingStore.spendingCreation
    return (
      <div>

        <Header/>
        <div style={{
          textAlign: 'center',
        }}>
          <Input
            name='name'
            placeholder='Nom de la dépense'
            value={name}
            required
            error={spendingStore.errors && spendingStore.errors.name !== undefined}
            label={(spendingStore.errors && spendingStore.errors.name !== undefined) && spendingStore.errors.name}
            onChange={this.updateField}
            style={{width: '80%', marginTop: '20px'}}
            className='smallLabelInputFontSize'
          />
          <Input
            name='amount'
            placeholder='Montant ( en € )'
            value={amount}
            required
            error={spendingStore.errors && spendingStore.errors.amount !== undefined}
            label={(spendingStore.errors && spendingStore.errors.amount !== undefined) && spendingStore.errors.amount}
            onChange={this.updateField}
            style={{width: '80%', marginTop: '20px'}}
            className='smallLabelInputFontSize'
          />
          <MaterialDatePicker
            name='date'
            value={date}
            error={spendingStore.errors && spendingStore.errors.date !== undefined}
            label={(spendingStore.errors && spendingStore.errors.date !== undefined) && spendingStore.errors.date}
            onChange={this.updateDateField}
            style={{width: '80%', marginTop: '20px'}}
            className='smallLabelInputFontSize'
          />

          <div
            style={{
              width: '80%',
              margin: '30px auto 0px auto',
              textAlign: 'left',
            }}>
            <text style={{
              fontSize: '12px',
              textAlignLast: 'left',
            }}>Payé par :
            </text>
            <div
              style={{display: 'flex'}}>
              {
                creator && creator.name !== undefined && creator.surname !== undefined &&
                <Avatar style={{margin: '10px 10px 10px 0'}} name={`${creator.name} ${creator.surname}`}/>
              }
              {(spendingStore.errors && spendingStore.errors.creator !== undefined) && spendingStore.errors.creator}
              <Button
                value={<FontAwesomeIcon icon={['fal', 'pen']} className='mainColor' style={{fontSize: '20px'}}/>}
                onClick={() => {
                  return this.handleClickOpen(false)
                }}
                style={{
                  width: '40px',
                  height: '40px',
                  minWidth: '40px',
                  margin: '10px 10px 10px 0',
                  padding: '0px',
                  borderRadius: '50%',
                  border: '1px solid #F57464'
                }}
              />
            </div>
          </div>

          <div
            style={{
              width: '80%',
              margin: '30px auto 0px auto',
              textAlign: 'left'
            }}>
            <text
              style={{
                fontSize: '12px',
                textAlignLast: 'left'
              }}>Membres concernés :
            </text>
            <div
              style={{display: 'flex'}}>
              {
                recipients.map((recipient, index) => {
                  if (index < 3) {
                    return (
                      <Avatar style={{margin: '10px 10px 10px 0'}} name={`${recipient.name} ${recipient.surname}`} />

                    )
                  } else if (index === recipients.length - 1) {
                    return (<Avatar
                      style={{

                        margin: '10px 10px 10px 0'
                      }}
                      onClick={() => {
                        return this.handleClickOpen(true)
                      }}
                      name={`+ ${recipients.length - 3}`}/>)
                  }
                })
              }
              {(spendingStore.errors && spendingStore.errors.recipients !== undefined) && spendingStore.errors.recipients}
              <Button
                value={<FontAwesomeIcon icon={['fal', 'pen']} className='mainColor' style={{ fontSize: '20px'}}/>}
                onClick={() => {
                  return this.handleClickOpen(true)
                }}
                style={{
                  width: '40px',
                  height: '40px',
                  minWidth: '40px',
                  margin: '10px 10px 10px 0',
                  padding: '0px',
                  borderRadius: '50%',
                  border: '1px solid #F57464'
                }}
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
                style={{
                  position: 'fixed',
                  width: '100%',
                  bottom: '0px',
                  left: '0px',
                  background: 'linear-gradient(90deg, #E45C55, #F2BF95)',
                  borderRadius: '0px',
                  color: '#ffffff',
                  fontFamily: 'Proxima-Nova-Alt-Regular'

                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SpendingCreation
