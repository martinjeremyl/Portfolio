import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation'
import GroupIcon from '@material-ui/icons/Group'
import PersonIcon from '@material-ui/icons/Person'
import BalanceIcon from '@material-ui/icons/AccountBalance'

const styles = {
  root: {
    width: 500
  }
}

class LabelBottomNavigation extends React.Component {
  state = {
    value: 'recents'
  };

  handleChange = (event, value) => {
    this.setState({ value })
  };

  render () {
    const { classes } = this.props
    const { value } = this.state

    return (
      <BottomNavigation value={value} onChange={this.handleChange} className={classes.root}>
        <BottomNavigationAction value='person' icon={<PersonIcon />} />
        <BottomNavigationAction value='group' icon={<GroupIcon />} />
        <BottomNavigationAction value='balance' icon={<BalanceIcon />} />
      </BottomNavigation>
    )
  }
}

LabelBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LabelBottomNavigation)
