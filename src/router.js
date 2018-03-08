import React from 'react'
import { Scene, Router, Stack } from 'react-native-router-flux'

import CreationScreenOne from './screens/CreationScreenOne'
import CreationScreenTwo from './screens/CreationScreenTwo'
import CreationScreenThree from './screens/CreationScreenThree'
import CreationScreenRecap from './screens/CreationScreenRecap'
import HousingDetails from './screens/Housing/DetailsScreen'
import AuthComponent from './components/AuthComponent'
import MenuVoyageComponent from './components/MenuVoyageComponent'
import SignUpComponent from './components/SignUpComponent'
import HousingList from './screens/Housing/ListScreen'
import ListeVoyagesComponent from './components/ListeVoyagesComponent'
import AddHousingComponent from './components/AddHousingComponent'
import DepensesList from './components/DepensesList'
import CreationDepenseComponent from './components/CreationDepenseComponent'

export default () => (
  <Router
    navigationBarStyle={{ backgroundColor: '#8A3148' }}
    titleStyle={{ color: '#fff' }}
    backButtonTextStyle={{ tintColor: '#fff' }}
    backButtonTintColor='#fff'
  >
    <Stack key='root'>
      <Scene key='login' component={AuthComponent} title='Connexion' />
      <Scene key='addHousing' component={AddHousingComponent} title='Ajouter logement' />
      <Scene key='listeVoyages' component={ListeVoyagesComponent} title='Mes voyages' />
      <Scene key='register' component={SignUpComponent} title='Inscription' />
      <Scene key='voyage' component={MenuVoyageComponent} title='Voyage' />
      <Scene key='formPartOne' component={CreationScreenOne} title='Créer un voyage - PARTIE 1' />
      <Scene key='formPartTwo' component={CreationScreenTwo} title='Créer un voyage - PARTIE 2' />
      <Scene
        key='formPartThree'
        component={CreationScreenThree}
        title='Créer un voyage - PARTIE 3'
      />
      <Scene key='formRecap' component={CreationScreenRecap} title='Créer un voyage - RECAP' />
      <Scene key='housingsList' component={HousingList} title='Liste des logements' />
      <Scene key='createDepense' component={CreationDepenseComponent} title='Créer une dépense' />
      <Scene key='editDepense' component={CreationDepenseComponent} title='Modifier une dépense' />
      <Scene key='depensesList' component={DepensesList} title='Liste des dépenses' />
      <Scene key='housingDetails' component={HousingDetails} title='Détail de logement' />
    </Stack>
  </Router>
)
