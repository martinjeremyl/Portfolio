import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'
import Avatar from './Avatar'

const styles = {
  cost: {
    marginTop: '50px',
    textAlign: 'center',
    // backgroundColor: '#ddd',
    alignItems: 'center'
  },
  dottedLine: {
    borderRight: 'dashed 3px red',
    width: '50%',
    height: '100%'
  },
  spender: {
    position: 'relative'
  },
  avatarSpender: {
    position: 'absolute',
    left: '50%'
  },
  amount: {
  },
  info: {
    textAlign: 'left'
  },
  rowAvatar: {
    display: 'flex'
  },
  avatarRecipients: {
    width: 30,
    height: 30,
    margin: 2
  }
}

class OneDepense extends Component {
  render () {
    const { classes } = this.props

    return (
      <div className={classes.cost}>
        <Grid container spacing={0}>
          <Grid className={classes.spender} item xs={3}>
            <div className={classes.dottedLine}>
              <Avatar className={classes.avatarSpender} />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className={classes.amount} >
              <span>{this.props.depenseTest.amount} €</span>
            </div>
          </Grid>
          <Grid className={classes.info} item xs={6}>
            <div className={classes.title}>{this.props.depenseTest.name}</div>
            <div className={classes.rowAvatar}>
              <Avatar className={classes.avatarRecipients} />
              <Avatar className={classes.avatarRecipients} />
              <Avatar className={classes.avatarRecipients} />
              <Avatar className={classes.avatarRecipients} />
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(OneDepense)
