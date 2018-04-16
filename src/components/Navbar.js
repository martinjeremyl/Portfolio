import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject('appStore', 'userStore')
@observer
class Navbar extends Component {
  render () {
    return (
      <div>
        <nav className='navbar' role='navigation' aria-label='main navigation'>
          <div className='navbar-brand'>
            <a className='navbar-item' href='/'>
              Traveled
            </a>
            <a
              className='is-right navbar-item'
              onClick={() => {
                this.props.userStore.logout()
              }}
            >
              Deconnexion
            </a>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navbar
