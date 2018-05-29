import React, { Component } from 'react'
import Button from 'material-ui/Button'
import AddIcon from '@material-ui/icons/Add'

class FixedActionButton extends Component {
  render () {
    return (
      <Button
        variant='fab'
        color={this.props.color}
        aria-label='add'
        className='mainBackgroundColor'
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px'
        }}
        {...this.props}>
        <AddIcon />
      </Button>
    )
  }
}

export default FixedActionButton
