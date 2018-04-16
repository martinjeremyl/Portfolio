import React, { Component } from 'react'

class Input extends Component {
  render () {
    return (
      <div className='field'>
        <div className='control'>
          <input className='input' {...this.props} />
        </div>
      </div>
    )
  }
}

Input.defaultProps = { placeholder: '', type: 'text', value: '' }

export default Input
