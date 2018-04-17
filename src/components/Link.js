import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject('appStore')
@observer
class Link extends Component {
  navigate = () => {
    const { appStore, to } = this.props
    appStore.pushToHistory(to)
  }

  render () {
    return <a
      style={{
        backgroundColor: 'transparent',
        color: '#000'
      }}
      className='badge badge-light'
      onClick={this.navigate}>{this.props.children}</a>
  }
}

export default Link
