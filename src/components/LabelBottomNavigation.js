import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation'
import { observer, inject } from 'mobx-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const styles = {
  root: {
    width: '100%',
    background: 'linear-gradient(to left, #F2BF95, #E45C55)',
    bottom: '0%',
    position: 'fixed'
  },
  button: {
    color: 'white',
    fontSize: '32px'
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
        <BottomNavigationAction value='group' icon={<FontAwesomeIcon className={classes.button} icon={['fal', 'users']} />} />
        <BottomNavigationAction value='person' icon={<FontAwesomeIcon className={classes.button} icon={['fal', 'user']} />} />
        <BottomNavigationAction value='balance' icon={<FontAwesomeIcon className={classes.button} icon={['fal', 'balance-scale']} />} />
      </BottomNavigation>
    )
  }
}

LabelBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LabelBottomNavigation)
