import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import SwipeableDrawer from 'material-ui/SwipeableDrawer'
import { withStyles } from 'material-ui/styles'
import List, { ListItem } from 'material-ui/List'
import Icon from 'material-ui/Icon'

import ModuleIcon from './ModuleIcon'

const styles = {
  list: {
    width: 250
  },
  moduleText: {
    fontSize: 17,
    color: 'white',
    marginLeft: '15px'
  }
}

@inject('appStore', 'routingStore')
@observer
class TravelMenuDrawer extends Component {
  render () {
    const { classes, parent } = this.props
    const backgroundImage = require('../img/backgrounds/module_background.png')

    const sideList = (
      <div className={classes.list}>
        <List style={{color: 'white'}}>
          {
            this.props.appStore.allModules.map(({ id, name, icon }, iteration) => (
              <ListItem button key={id}>
                <ModuleIcon icon={icon} size='60px' color='white' />
                <div className={classes.moduleText}>
                  {name}
                </div>
              </ListItem>
            ))
          }
          <ListItem button onClick={this.props.routingStore.goBack}>
            <Icon className='module-icon'>
              arrow_back
            </Icon>
          </ListItem>
        </List>
      </div>
    )

    return (
      <SwipeableDrawer
        open={parent.state.left}
        onClose={parent.toggleDrawer(false)}
        onOpen={parent.toggleDrawer(true)}
        style={{ height: '100%' }}
      >
        <div
          tabIndex={0}
          role='button'
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            height: '100%'
          }}
          onClick={parent.toggleDrawer(false)}
          onKeyDown={parent.toggleDrawer(false)}
        >
          {sideList}
        </div>
      </SwipeableDrawer>
    )
  }
}

TravelMenuDrawer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TravelMenuDrawer)
