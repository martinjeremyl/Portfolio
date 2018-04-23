import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router'

import Input from '../../components/Input'
import Button from '../../components/Button'
import ImageUpload from '../../components/ImageUpload'
import TabNavigation from '../../components/TabNavigation'
import Link from '../../components/Link'

@inject('userStore')
@observer
class Registration extends Component {
  updateField = ({ target: { name, value } }) => this.props.userStore.setUserCreation(name, value)

  render () {
    const {
      userStore: { authenticatingUser },
      userStore
    } = this.props
    const { email, password, name, passwordConfirmation, phone } = authenticatingUser
    console.log(authenticatingUser)
    return (
      <Fragment>
        <Input name='name' placeholder='Nom' value={name} onChange={this.updateField} />
        <Input name='email' placeholder='Email' type='email' value={email} onChange={this.updateField} />
        <Input name='phone' placeholder='Téléphone' value={phone} onChange={this.updateField} />
        <Input
          name='password'
          type='password'
          placeholder='Mot de passe'
          value={password}
          onChange={this.updateField}
        />
        <Input
          name='passwordConfirmation'
          type='password'
          placeholder='Confirmation du mot de passe'
          value={passwordConfirmation}
          onChange={this.updateField}
        />
        <ImageUpload
          imageCallback={image => {
            userStore.setUserCreation('avatar', image)
          }}
        />
        <Button onClick={() => { userStore.register(authenticatingUser) }}>
          S'inscrire
        </Button>

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
      </Fragment>
    )
  }
}

export default withRouter(Registration)
