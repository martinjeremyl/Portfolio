import React from 'react'
import { Scene, Router, Stack } from 'react-native-router-flux'

import CreationScreenOne from './screens/CreationScreenOne'
import CreationScreenTwo from './screens/CreationScreenTwo'
import CreationScreenThree from './screens/CreationScreenThree'
import CreationScreenRecap from './screens/CreationScreenRecap'
import AuthComponent from './components/AuthComponent'
import MenuVoyageComponent from './components/MenuVoyageComponent'

export default () => (
  <Router>
    <Stack key='root'>
      <Scene key='voyage' component={MenuVoyageComponent} title='Voyage' />
      <Scene key='login' component={AuthComponent} title='Login' />
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
