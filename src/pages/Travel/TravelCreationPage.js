import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Stepper, { Step, StepButton } from 'material-ui/Stepper'

import TravelCreationPageOne from './TravelCreationPageOne'
import TravelCreationPageTwo from './TravelCreationPageTwo'
import TravelCreationPageThree from './TravelCreationPageThree'

import Header from '../../components/Header'

@inject('userStore', 'travelStore')
@observer
class TravelCreationPage extends Component {
  state = {
    participants: [this.props.userStore.user.uid],
    activeStep: 2,
    completed: new Set(),
    skipped: new Set()
  }

  handleInputsChange = ({ target: { name, value } }) => {
    this.props.travelStore.updateTravelCreation(name, value)
  }

  handleStep = step => {
    this.setState({
      activeStep: step
    })
  }

  isStepComplete (step) {
    return this.state.completed.has(step)
  }

  renderSwitch = () => {
    switch (this.state.activeStep) {
      case 0:
        return <TravelCreationPageOne handleInputsChange={this.handleInputsChange} />

      case 1:
        return <TravelCreationPageTwo handleInputsChange={this.handleInputsChange} />

      case 2:
        return <TravelCreationPageThree handleInputsChange={this.handleInputsChange} />

      default:
        return null
    }
  }

  render () {
    return (
      <div style={{ width: '100%' }}>
        <Header />
        {this.renderSwitch()}

        <Stepper
          alternativeLabel
          nonLinear
          activeStep={this.state.activeStep}
          style={{ position: 'fixed', bottom: '10px', width: '100%', padding: '0' }}
        >
          {[1, 2, 3, 4].map((label, index) => {
            return (
              <Step key={label}>
                <StepButton
                  onClick={() => {
                    this.handleStep(index)
                  }}
                  completed={this.isStepComplete(index)}
                />
              </Step>
            )
          })}
        </Stepper>
      </div>
    )
  }
}

export default TravelCreationPage
