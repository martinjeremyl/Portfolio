import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router'

import Input from '../../components/Input'
import Button from '../../components/Button'
import ImageUpload from '../../components/ImageUpload'

@inject('userStore')
@observer
class Registration extends Component {
  render () {
    const {
      userStore: { authenticatingUser },
      updateField,
      userStore
    } = this.props
    const { email, password, name, passwordConfirmation, phone } = authenticatingUser
    console.log(authenticatingUser)
    return (
      <Fragment>
        <Input name='name' placeholder='Nom' value={name} onChange={updateField} />
        <Input name='email' placeholder='Email' type='email' value={email} onChange={updateField} />
        <Input name='phone' placeholder='Téléphone' value={phone} onChange={updateField} />
        <Input
          name='password'
          type='password'
          placeholder='Mot de passe'
          value={password}
          onChange={updateField}
        />
        <Input
          name='passwordConfirmation'
          type='password'
          placeholder='Confiormation du mot de passe'
          value={passwordConfirmation}
          onChange={updateField}
        />
        <ImageUpload
          imageCallback={image => {
            userStore.setUserCreation('avatar', image)
          }}
        />
        <Button onClick={() => { userStore.register(authenticatingUser) }}>
          S'inscrire
        </Button>
      </Fragment>
    )
  }
}

export default withRouter(Registration)
