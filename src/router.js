import React from 'react'
import { Scene, Router, Stack } from 'react-native-router-flux'

import CreationScreenOne from '~/screens/CreationScreenOne'
import CreationScreenTwo from '~/screens/CreationScreenTwo'
import CreationScreenThree from '~/screens/CreationScreenThree'
import CreationScreenRecap from '~/screens/CreationScreenRecap'
import Example from '~/components/ExampleComponent'
import AuthComponent from '~/components/AuthComponent'

export default () => (
  <Router>
    <Stack key='root'>
      <Scene key='login' component={AuthComponent} title='Login' />
      <Scene key='register' component={Example} title='Register' />
      <Scene key='home' component={Example} />
      <Scene key='formPartInit' component={Example} title='Créer un voyage' />
      <Scene key='formPartOne' component={CreationScreenOne} title='Créer un voyage - PARTIE 1' />
      <Scene key='formPartTwo' component={CreationScreenTwo} title='Créer un voyage - PARTIE 2' />
      <Scene
        key='formPartThree'
        component={CreationScreenThree}
        title='Créer un voyage - PARTIE 3'
      />
      <Scene key='formRecap' component={CreationScreenRecap} title='Créer un voyage - RECAP' />
    </Stack>
  </Router>
)
