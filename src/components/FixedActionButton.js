import React, { Component } from 'react'

class FixedActionButton extends Component {
  render () {
    return (
      <button
        style={{
          position: 'fixed',
          borderRadius: '100%',
          width: '50px',
          height: '50px',
          bottom: '30px',
          right: '30px'
        }}
        {...this.props}
      >
        {this.props.children}
      </button>
    )
  }
}

export default FixedActionButton
