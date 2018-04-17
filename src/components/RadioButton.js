import React, { Component } from 'react'

class RadioButton extends Component {
  render () {
    return (
      <input type='radio' {...this.props} />
    )
  }
}

RadioButton.defaultProps = {
  value: ''
}

export default RadioButton
