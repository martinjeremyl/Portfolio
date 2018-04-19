import React, { Component } from 'react'
import Checkbox from 'material-ui/Checkbox'
const styles = {
  block: {
    maxWidth: 250
  },
  checkbox: {
    marginBottom: 16
  }
}
class CheckboxButton extends Component {
  state = {
    checked: false
  }

  render () {
    return (
      <div style={styles.block}>
        <Checkbox
          label={this.props.label}
          style={styles.checkbox}
        />
      </div>
    )
  }
}

export default CheckboxButton
