import React from 'react'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'

const styles = theme => ({
  whiteInput: {
    color: '#fff',
    '&::before': {
      backgroundColor: '#fff'
    },
    '&::after': {
      backgroundColor: '#fff'
    }
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
    const { classes, whiteInput, ...props } = this.props

    return (
      <TextField
        {...props}
        InputProps={{
          className: whiteInput ? classes.whiteInput : null
        }}
      />
    )
  }
}

export default withStyles(styles)(Input)
