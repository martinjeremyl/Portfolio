import React, { Component } from 'react'
import {Radio} from 'material-ui/Radio'
import { withStyles } from 'material-ui/styles'
import orange from 'material-ui/colors/orange'

const styles = {
  root: {
    color: orange[600],
    '&$checked': {
      color: orange[500]
    }
  },
  checked: {},
  size: {
    width: 40,
    height: 40
  },
  sizeIcon: {
    fontSize: 20
  }
}

class RadioButton extends Component {
  state = {
    checked: false
  }

  render () {
    return (
      <Radio
        checked={this.props.checked}
        onChange={this.handleChange}
        value={this.props.value}
        name={this.props.name}
      />
    )
  }
}
export default withStyles(styles)(RadioButton)
