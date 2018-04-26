import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

import BackButton from './BackButton'

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

@inject('routingStore')
@observer
class Header extends Component {
  render () {
    const { classes, renderRightButton, routingStore, title } = this.props

    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar disableGutters>
            {
              this.props.routingStore.location.pathname === '/travels'
                ? ''
                : <BackButton onClick={routingStore.goBack} />
            }
            <Typography variant='title' color='inherit' className={classes.flex}>
              {
                title !== undefined
                  ? title
                  : routesTitleProxy[this.props.routingStore.location.pathname]
              }
            </Typography>
            {
              renderRightButton && renderRightButton()
            }
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(Header)
