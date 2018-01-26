import React from 'react'
import { Scene, Router, Stack } from 'react-native-router-flux'

import Example from '~/components/ExampleComponent'
import AuthComponent from '~/components/AuthComponent'
import MenuVoyageComponent from '~/components/MenuVoyageComponent'

export default () => (
  <Router>
    <Stack key='root'>
      <Scene key='voyage' component={MenuVoyageComponent} title='Voyage' />
      <Scene key='login' component={AuthComponent} title='Login' />
      <Scene key='home' component={Example} />
      <Scene key='home' component={Example} />
    </Stack>
  </Router>
)
