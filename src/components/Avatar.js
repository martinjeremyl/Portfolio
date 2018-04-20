import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import { withStyles } from 'material-ui/styles'

class AvatarProfile extends Component {
  /* Generate random color from avatar if user don't add picture on his avatar */
  getInitial (name = 'tot pp') {
    return name.split(' ').map(value => value.toUpperCase()[0]).join('')
  }

  render () {
    return (
      <Avatar className={`${this.props.classes.avatar} ${this.props.classes.row}`} {...this.props}>{this.getInitial(this.props.name)}</Avatar>
    )
  }
}

const bgColor = `#${Math.random().toString(16).substr(-6)}`

const styles = {
  avatar: {
    margin: 10,
    backgroundColor: bgColor,
    width: 100,
    height: 100,
    fontSize: 50
  },
  row: {
    display: 'flex',
    justifyContent: 'center'
  }
}

export default withStyles(styles)(AvatarProfile)
