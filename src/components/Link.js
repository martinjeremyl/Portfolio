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
    return <a onClick={this.navigate}>{this.props.children}</a>
  }
}

export default Link
