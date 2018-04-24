import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import { Route, Router, Switch } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import red from 'material-ui/colors/red'

import Authentication from './pages/Authentication/Authentication'
import Login from './pages/Authentication/Login'
import Registration from './pages/Authentication/Registration'
import Travel from './pages/Travel/TravelPage'
import TravelDetail from './pages/Travel/TravelDetailPage'
import TravelCreation from './pages/Travel/TravelCreationPage'

import Loader from './components/Loader'
import { PrivateRoute } from './components/PrivateRoute'

const appColorPalette = {
  light: '#ffb09c',
  main: '#d8806e',
  dark: '#a35243',
  contrastText: '#fff'
}

const theme = createMuiTheme({
  palette: {
    primary: appColorPalette,
    secondary: appColorPalette,
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2
  }
})

@inject('appStore', 'routingStore')
@observer
class App extends Component {
  render () {
    const { appStore, routingStore } = this.props

    return (
      <MuiThemeProvider theme={theme}>
        <Router history={routingStore.history}>
          {appStore.isLoading ? (
            <Loader />
          ) : (
            <Fragment>
              <Switch>
                <Route exact path='/' component={Authentication} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Registration} />
                <PrivateRoute
                  exact
                  path='/travels'
                  isConnected={appStore.isConnected}
                  component={Travel}
                />
                <PrivateRoute
                  exact
                  path='/travels/create'
                  isConnected={appStore.isConnected}
                  component={TravelCreation}
                />
                <PrivateRoute
                  exact
                  path='/travels/:id'
                  isConnected={appStore.isConnected}
                  component={TravelDetail}
                />

                {/* fallback route to redirect the user */}
                <Route path='*' component={Authentication} />
              </Switch>
            </Fragment>
          )}
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default App
