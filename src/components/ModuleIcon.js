import React from 'react'
import Icon from 'material-ui/Icon'

class ModuleIcon extends React.Component {
  render () {
    // const { size } = this.props.size !== undefined ? this.props.size : 15
    return (
      <div style={{
        border: 'solid 3px',
        borderRadius: '50%',
        padding: '3px'
      }} {...this.props}>
        <div style={{
          border: 'dashed 2px',
          borderRadius: '50%',
          padding: '15px'
        }}>
          <Icon style={{ fontSize: this.props.size, color: this.props.color }}>{this.props.icon}</Icon>
        </div>
      </div>
    )
  }
}

export default ModuleIcon
