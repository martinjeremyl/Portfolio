import React from 'react'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
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
      <TextField className={this.props.classes.textField} />
    )
  }
}

export default withStyles(styles)(Input)
