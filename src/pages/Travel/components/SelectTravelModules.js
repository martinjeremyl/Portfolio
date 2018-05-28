import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from 'material-ui/ExpansionPanel'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Icon from 'material-ui/Icon'

import ModuleIcon from './ModuleIcon'

const styles = {
  root: {
    flexGrow: 1
  }
}

@inject('appStore', 'routingStore')
@observer
class SelectTravelModules extends Component {
  state = {
    expanded: null,
    selected: {}
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    })
  }

  toggleModule = (id, e) => {
    // La ligne du dessous empêche le panneau de s'ouvrir ou se fermer
    // Par contre, cela ne met pas à jour le composant en changeant la couleur de fond et l'icone
    // e.stopPropagation()
    this.handleChange(id)
    this.state.selected[id] = 1 - (this.state.selected[id] !== undefined ? this.state.selected[id] : 0)
  }

  render () {
    const { classes } = this.props
    const { expanded } = this.state

    return (
      <div className={classes.root}>
        {
          this.props.appStore.allModules.map(({ id, name, icon, description }, iteration) => (
            <ExpansionPanel
              style={
                ((this.state.selected[id] ? this.state.selected[id] : 0) && {backgroundColor: '#DDD'}) ||
                {backgroundColor: 'transparent'}
              }
              key={id}
              expanded={expanded === id}
              onChange={this.handleChange(id)}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <ModuleIcon icon={icon} onClick={(e) => this.toggleModule(id, e)} />
                <Icon onClick={(e) => this.toggleModule(id, e)}>{((this.state.selected[id] ? this.state.selected[id] : 0) && 'remove') || 'add'}</Icon>
                <Typography style={{ fontSize: '20px', margin: 'auto' }}>{name}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  {description}
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))
        }
      </div>
    )
  }
}

SelectTravelModules.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SelectTravelModules)
