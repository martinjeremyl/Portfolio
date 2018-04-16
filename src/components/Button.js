import React, { Component } from 'react'

class Button extends Component {
  render () {
    const { modifiers, value } = this.props
    return (
      <button className={`button ${modifiers}`} {...this.props}>
        {value}
      </button>
    )
  }
}

Button.defaultProps = {
  value: ''
}

export default Button
