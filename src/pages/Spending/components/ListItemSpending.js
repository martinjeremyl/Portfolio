import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Avatar from '../../../components/Avatar'
import Card from 'material-ui/Card'
import { withStyles } from 'material-ui/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Grid from '@material-ui/core/Grid'
// import moment from 'moment'
// import DateDisplay from '../../../components/datetime/DateDisplay'

const styles = {
  card: {
    width: '100%'
  },
  spender: {
    position: 'relative',
    display: 'flex'
  },
  dottedLine: {
    borderRight: 'dashed 3px red',
    width: '50%',
    height: '100%',
    position: 'absolute'
  },
  rowAvatar: {
    display: 'flex',
    padding: '1%'
  },
  avatarRecipients: {
    width: 20,
    height: 20,
    margin: 2,
    fontSize: '14px',
    padding: '3px'
  },
  amount: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2em'
  },
  spendName: {
    textAlign: 'left',
    fontSize: '1.2em',
    padding: '1%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  }
}
@inject('spendingStore', 'travelStore', 'routingStore')
@observer
class ListItemSpending extends Component {
  render () {
    const { spending, spendingStore, routingStore, travelStore, index } = this.props
    return (

      <Card style={styles.card}>
        <Grid container spacing={0} style={{padding: '8px'}}>
          <Grid item xs={2} style={styles.spender}>
            <div style={styles.dottedLine} className='mainColor' />
            <Avatar
              src={spending.creator && spending.creator.avatar}
              name={`${spending.creator.name} ${spending.creator.surname}`}
              style={{margin: 'auto'}}
            />
          </Grid>
          <Grid item xs={3} style={styles.amount}>
            {spending.amount} €
          </Grid>
          <Grid item xs={5}>
            <div style={styles.spendName}>
              {spending.name}
            </div>
            <div style={styles.rowAvatar}>
              {spending.recipients && spending.recipients.map((recipient, index) => {
                if (index < 3) {
                  return <Avatar key={recipient.id} src={recipient.avatar} name={`${recipient.name} ${recipient.surname}`} style={styles.avatarRecipients} />
                } else if (index === spending.recipients.length - 1) {
                  return (<Avatar style={styles.avatarRecipients}
                    name={`+ ${spending.recipients.length - 3}`} />)
                }
              })}

            </div>
          </Grid>
          <Grid item xs={2} style={styles.amount}>
            <FontAwesomeIcon icon={['fal', 'pen']} className={'fa-lg mainColor'}
              onClick={() => {
                spendingStore.setSpendingCreation(spending)
                spendingStore.setCurrentSpendingId(index)
                routingStore.history.push(`/travels/${travelStore.currentTravelId}/editSpending/${index}`)
              }} />
          </Grid>
        </Grid>
      </Card>
    )
  }
}
export default withStyles(styles)(ListItemSpending)
