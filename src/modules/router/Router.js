import React, { Component } from 'react'

import Context from './Context'

class Router extends Component {
  render () {
    return (
      <Context.Provider
        value={{ path: this.props.path !== '' ? this.props.path : window.location.pathname }}
      >
        {this.props.children}
      </Context.Provider>
    )
  }
}

export default Router
