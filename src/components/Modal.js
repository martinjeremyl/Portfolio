import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import FixedActionButton from './FixedActionButton'

@inject('appStore')
@observer
class Modal extends Component {
  render () {
    const { isOpen, children } = this.props
    return (
      <div className={`modal ${isOpen && 'is-active'}`}>
        <div
          className='modal-background'
          onClick={() => {
            this.props.appStore.switchModalStatus()
          }}
        />
        {children}

        <FixedActionButton
          onClick={() => {
            this.props.appStore.switchModalStatus()
          }}
        >
          X
        </FixedActionButton>
      </div>
    )
  }
}

export default Modal
