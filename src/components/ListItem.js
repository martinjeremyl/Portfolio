import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Transition from 'react-transition-group/Transition'

const duration = 300

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 }
}

@observer
class ListItem extends Component {
  render () {
    return (
      <Transition in timeout={duration}>
        {state => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}
            {...this.props}
          >
            {this.props.children}
          </div>
        )}
      </Transition>
    )
  }
}

export default ListItem
