import React, { Component } from 'react'

class TabNavigation extends Component {
  render () {
    return (
      <div
        className='tabs is-fullwidth'
        style={{
          marginTop: '50px',
          width: '100%',
          padding: '0'
        }}
      >
        <div>{this.props.children}</div>
      </div>
    )
  }
}

export default TabNavigation
