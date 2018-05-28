import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Avatar from '../../../components/Avatar'
// import Card, { CardContent } from 'material-ui/Card'
import { withStyles } from 'material-ui/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Grid from '@material-ui/core/Grid'

const styles = {
  card: {
    padding: '8px',
    borderBottom: '1px solid #eee'
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
    fontSize: '1.5em',
    padding: '1%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  icone: {
    border: '1px solid',
    borderRadius: '50%',
    padding: '11px'
  }
}

@inject('appStore', 'userStore')
@observer
class ListItemSpending extends Component {
  render () {
    const spending = this.props.spending

    return (
      <div style={styles.card}>
        <Grid container spacing={0}>
          <Grid item xs={2} style={styles.spender}>
            <div style={styles.dottedLine} />
            <Avatar src={spending.creator.avatar} style={{margin: 'auto'}} />
          </Grid>
          <Grid item xs={3} style={styles.amount}>
            {spending.amount} €
          </Grid>
          <Grid item xs={5}>
            <div style={styles.spendName}>
              {spending.name}
            </div>
            <div style={styles.rowAvatar}>
              {spending.recipients && spending.recipients.map((item) => {
                return <Avatar key={item.id} src={item.avatar} style={styles.avatarRecipients} />
              })}
            </div>
          </Grid>
          <Grid item xs={2} style={styles.amount}>
            <FontAwesomeIcon icon={['fal', 'pen']} className={'fa-lg mainColor'} style={styles.icone} />
          </Grid>
        </Grid>
      </div>
    )
  }
}
export default withStyles(styles)(ListItemSpending)
