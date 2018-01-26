import React from 'react'
import { Scene, Router, Stack } from 'react-native-router-flux'

import Example from '~/components/ExampleComponent'
import AuthComponent from '~/components/AuthComponent'

export default () => (
  <Router>
    <Stack key='root'>
      <Scene key='login' component={AuthComponent} title='Login' />
      <Scene key='register' component={Example} title='Register' />
      <Scene key='home' component={Example} />
    </Stack>
  </Router>
)
