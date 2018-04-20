import React, { Component } from 'react'
import MaterialButton from 'material-ui/Button'

class Button extends Component {
  render () {
    const { modifiers, children, color } = this.props
    return (
      <MaterialButton variant='raised' color={color} className={`button ${modifiers}`} {...this.props}>
        {children}
      </MaterialButton>
    )
  }
}

Button.defaultProps = {
  value: ''
}

export default Button
