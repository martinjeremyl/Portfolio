import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'

import Login from './Login'
import Registration from './Registration'

import TabNavigation from '../../components/TabNavigation'
import Link from '../../components/Link'

@inject('userStore')
@observer
class Authentication extends Component {
  updateField = ({ target: { name, value } }) => {
    this.props.userStore.setUserCreation(name, value)
  }

  render () {
    return (
      <div>
        <div className='columns is-vcentered'>
          <div className='section'>
            <Route path='/login' render={() => <Login updateField={this.updateField} />} />
            <Route path='/register' render={() => <Registration updateField={this.updateField} />} />
          </div>
        </div>

        <TabNavigation>
          <li
            style={{
              listStyleType: 'none'
            }}>
            <Link to='/login'>Connexion</Link>
          </li>
          <li
            style={{
              listStyleType: 'none'
            }}>
            <Link to='/register'>Inscription</Link>
          </li>
        </TabNavigation>
      </div>
    )
  }
}

export default withRouter(Authentication)
