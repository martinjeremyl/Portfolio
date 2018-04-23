import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'
import Avatar from './Avatar'

const styles = {
  cost: {
    marginTop: '50px',
    textAlign: 'center',
    backgroundColor: '#ddd',
    alignItems: 'center'
  },
  dottedLine: {
    borderRight: 'dashed 3px red',
    width: '50%',
    height: '100%',
    position: 'absolute'
  },
  spender: {
    position: 'relative',
    display: 'flex'
  },
  avatarSpender: {
    // position: 'absolute',
    // left: '50%'
    margin: 'auto'
  },
  amount: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.8em'

  },
  info: {
    textAlign: 'left',
    fontSize: '2em',
    padding: '1%'
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
  }
}

class OneDepense extends Component {
  render () {
    const { classes } = this.props

    return (
      <div className={classes.cost}>
        <Grid container spacing={0}>
          <Grid className={classes.spender} item xs={3}>
            <div className={classes.dottedLine} />
            <Avatar className={classes.avatarSpender} />

          </Grid>
          <Grid className={classes.amount} item xs={3}>
            {this.props.depenseTest.amount} €
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
