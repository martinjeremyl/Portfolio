import React, { Component } from 'react'

class Loader extends Component {
  render () {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div className='spinner'>
          <div className='double-bounce1' />
          <div className='double-bounce2' />
        </div>
      </div>
    )
  }
}

export default Loader
