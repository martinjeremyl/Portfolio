import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  }
})

class Input extends React.Component {
  state = {
    name: '',
    age: '',
    multiline: '',
    currency: 'EUR'
  }
  render () {
    return (
      <TextField {...this.props} />
    )
  }
}

TextField.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Input)
