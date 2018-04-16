import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SideMenu extends Component {
  render () {
    return (
      <aside
        className='menu'
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '80%',
          zIndex: 1000,
          background: 'white',
          transform: `translateX(${this.props.show ? 0 : '-80vw'} )`,
          transition: 'transform 200ms ease'
        }}
      >
        <ul className='menu-list'>
          <li>
            <Link to='/travels'>Mes voyages</Link>
          </li>
          <li>
            <Link to='/foo'>Mes voyages</Link>
          </li>
        </ul>
      </aside>
    )
  }
}

export default SideMenu
