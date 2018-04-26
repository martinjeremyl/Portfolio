import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import { MuiThemeProvider, createMuiTheme } from 'material-ui'

const routesTitle = {
  '/login': 'Connexion',
  '/register': 'Inscription',
  '/travels': 'Mes voyages',
  '/travel/': 'Détails du voyage'
}
const routesTitleProxy = new Proxy(routesTitle, {
  get (target, property) {
    return target[property] !== undefined ? target[property] : 'Traveled'
  }
})

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1,
    textAlign: 'center'
  }
}

const materialTheme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        background: 'linear-gradient(to left, #F2BF95, #E45C55)',
        textAlign: 'center'
      }
    }
  }
})

@inject('routingStore')
@observer
class Header extends Component {
  render () {
    const { classes, renderRightButton, title } = this.props

    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={materialTheme}>
          <AppBar position='static'>
            <Toolbar disableGutters>
              <Typography variant='title' color='inherit' className={classes.flex}>
                {title !== undefined
                  ? title
                  : routesTitleProxy[this.props.routingStore.location.pathname]}
              </Typography>
              {renderRightButton && renderRightButton()}
            </Toolbar>
          </AppBar>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default withStyles(styles)(Header)
