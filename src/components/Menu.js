import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class MenuHamburgerComponant extends React.Component {
  render () {
    return (
      <FontAwesomeIcon style={{color: '#FFF', fontSize: 25}} icon={['fal', 'bars']} />
    )
  }
}

export default MenuHamburgerComponant
