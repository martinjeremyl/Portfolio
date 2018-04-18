import React, { Component } from 'react'

import ReactAvatar from 'react-avatar'

class Avatar extends Component {
  /* Generate random color from avatar if user don't add picture on his avatar */
  generateColor () {
    return '#' + Math.random().toString(16).substr(-6)
  }

  render () {
    return (
      <ReactAvatar color={this.generateColor()} name={this.props.name} size={this.props.size} maxInitials={2} round />
    )
  }
}

export default Avatar
