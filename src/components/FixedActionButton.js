import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

class FixedActionButton extends Component {
  render () {
    return (
      <Button
        bsStyle='danger'
        style={{
          position: 'fixed',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          bottom: '30px',
          right: '30px'
        }}
        {...this.props}
      >
        {this.props.children}
      </Button>
    )
  }
}

export default FixedActionButton
