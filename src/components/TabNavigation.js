import React, { Component } from 'react'

class TabNavigation extends Component {
  render () {
    return (
      <div
        className='tabs is-fullwidth'
        style={{ position: 'fixed', bottom: 0, width: '100%' }}
      >
        <ul>{this.props.children}</ul>
      </div>
    )
  }
}

export default TabNavigation
