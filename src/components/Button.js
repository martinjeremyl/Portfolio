import React, { Component } from 'react'
import MaterialButton from 'material-ui/Button'

class Button extends Component {
  render () {
    const { modifiers, value } = this.props
    return (
      <MaterialButton className={`button ${modifiers}`} {...this.props}>
        {value}
      </MaterialButton>
    )
  }
}

Button.defaultProps = {
  value: ''
}

export default Button
