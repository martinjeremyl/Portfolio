import React from 'react'
import Icon from 'material-ui/Icon'

class ModuleIcon extends React.Component {
  render () {
    return (
      <div style={{
        border: 'solid 3px white',
        borderRadius: '50%',
        padding: '3px'
      }}>
        <div style={{
          border: 'dashed 2px white',
          borderRadius: '50%',
          padding: '15px'
        }}>
          <Icon className='module-icon'>{this.props.icon}</Icon>
        </div>
      </div>
    )
  }
}

export default ModuleIcon
