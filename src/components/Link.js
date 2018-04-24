import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Link as RRLink } from 'react-router-dom'

@inject('appStore')
@observer
class Link extends Component {
  render () {
    return (
      <RRLink
        style={{
          color: 'white',
          textDecoration: 'none',
          fontSize: '20px'
        }}
        to={this.props.to}
      >
        {this.props.children}
      </RRLink>
    )
  }
}

export default Link
