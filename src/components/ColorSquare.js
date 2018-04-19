import React from 'react'

class ColorSquare extends React.Component {
  state = {
    value: 'recents'
  };

  handleChange = (event, value) => {
    this.setState({ value })
  };

  render () {
    return (
      <div style={{
        height: '40px',
        width: '40px',
        background: this.props.color
      }}
      />
    )
  }
}

export default ColorSquare
