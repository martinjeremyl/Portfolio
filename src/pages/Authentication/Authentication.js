import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import Login from './Login'
import Registration from './Registration'

import Route from '../../modules/router/Route'

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
        <div className='columns is-vcentered '>
          <div className='section'>
            <Route path='/login'>
              <Login updateField={this.updateField} />
            </Route>
            <Route path='/register'>
              <Registration updateField={this.updateField} />
            </Route>
          </div>
        </div>

        <TabNavigation>
          <li>
            <Link to='/login'>Connexion</Link>
          </li>
          <li>
            <Link to='/register'>Inscription</Link>
          </li>
        </TabNavigation>
      </div>
    )
  }
}

export default Authentication
