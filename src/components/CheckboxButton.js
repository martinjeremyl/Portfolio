import React, { Component } from 'react'

class CheckboxButton extends Component {
  render () {
    return (
      <input type='checkbox' {...this.props} />
    )
  }
}

CheckboxButton.defaultProps = {
  value: ''
}

export default CheckboxButton
