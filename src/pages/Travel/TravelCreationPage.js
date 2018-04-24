import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Stepper, { Step, StepButton } from 'material-ui/Stepper'

import TravelCreationPageOne from './TravelCreationPageOne'
import TravelCreationPageTwo from './TravelCreationPageTwo'
import TravelCreationPageThree from './TravelCreationPageThree'

import Header from '../../components/Header'
import Navbar from '../../components/Navbar'

@inject('userStore', 'travelStore')
@observer
class TravelCreationPage extends Component {
  state = {
    participants: [this.props.userStore.user.uid],
    activeStep: 0,
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
    }
  }

  render () {
    return (
      <div>
        <Header />
        <Navbar />
        {this.renderSwitch()}

        <Stepper alternativeLabel nonLinear activeStep={this.state.activeStep}>
          {['Select campaign settings', 'Create an ad group', 'Create an ad'].map(
            (label, index) => {
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
            }
          )}
        </Stepper>
      </div>
    )
  }
}

export default TravelCreationPage
