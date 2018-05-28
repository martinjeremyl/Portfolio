import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation'
import GroupIcon from '@material-ui/icons/Group'
import PersonIcon from '@material-ui/icons/Person'
import BalanceIcon from '@material-ui/icons/AccountBalance'
import { observer, inject } from 'mobx-react'

const styles = {
  root: {
    width: '100%'
  }
}

@inject('spendingStore')
@observer
class LabelBottomNavigation extends React.Component {
  state = {
    value: 'person'
  }

  fetchSpendings () {
    switch (this.state.value) {
      case 'group':
        this.props.spendingStore.fetchSpendings()
        break
      case 'person':
        this.props.spendingStore.fetchPersonalSpendings()
        break
      case 'balance':
        console.log('balance')
    }
  }
  handleChange = (event, value) => {
    this.setState({ value })
  }

  render () {
    this.fetchSpendings()
    const { classes } = this.props
    const { value } = this.state
    return (
      <BottomNavigation value={value} onChange={this.handleChange} className={classes.root}>
        <BottomNavigationAction value='group' icon={<GroupIcon />} />
        <BottomNavigationAction value='person' icon={<PersonIcon />} />
        <BottomNavigationAction value='balance' icon={<BalanceIcon />} />
      </BottomNavigation>
    )
  }
}

LabelBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LabelBottomNavigation)
