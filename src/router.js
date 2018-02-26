import React from 'react'
import { Scene, Router, Stack } from 'react-native-router-flux'

import CreationScreenOne from './screens/CreationScreenOne'
import CreationScreenTwo from './screens/CreationScreenTwo'
import CreationScreenThree from './screens/CreationScreenThree'
import CreationScreenRecap from './screens/CreationScreenRecap'
import AuthComponent from './components/AuthComponent'
import MenuVoyageComponent from './components/MenuVoyageComponent'
import LogementsList from './components/LogementsList'
import ListeVoyagesComponent from './components/ListeVoyagesComponent'

export default () => (
  <Router>
    <Stack key='root'>
      <Scene key='login' component={AuthComponent} title='Login' />
      <Scene key='listeVoyages' component={ListeVoyagesComponent} title='Mes voyages' />
      <Scene key='voyage' component={MenuVoyageComponent} title='' />
      <Scene key='formPartOne' component={CreationScreenOne} title='Créer un voyage - PARTIE 1' />
      <Scene key='formPartTwo' component={CreationScreenTwo} title='Créer un voyage - PARTIE 2' />
      <Scene
        key='formPartThree'
        component={CreationScreenThree}
        title='Créer un voyage - PARTIE 3'
      />
      <Scene key='formRecap' component={CreationScreenRecap} title='Créer un voyage - RECAP' />
      <Scene key='logementsList' component={LogementsList} title='Liste des logements' />
    </Stack>
  </Router>
)
