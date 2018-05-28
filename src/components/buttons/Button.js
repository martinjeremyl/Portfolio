import React, { Component } from 'react'
import MaterialButton from 'material-ui/Button'

class Button extends Component {
  render () {
    return (
      <MaterialButton {...this.props}>{this.props.value}</MaterialButton>
    )
  }
}
export default Button
