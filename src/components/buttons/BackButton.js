import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'

class BackButton extends Component {
  render () {
    return (
      <IconButton
        color='inherit'
        aria-label='Menu'
        onClick={this.props.onClick}
      >
        <ArrowBack style={{fontSize: '30px'}} />
      </IconButton>
    )
  }
}

export default BackButton
