import React from 'react'
import { TimePicker } from 'material-ui-pickers'
import moment from 'moment'
import MomentUtils from 'material-ui-pickers/utils/moment-utils'
import 'moment/locale/fr'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'
class MaterialTimePicker extends React.Component {
  constructor (props) {
    moment.locale('fr')
    super(props)
    this.state = {
      selectedDate: moment()
    }
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date })
  }

  render () {
    const { selectedDate } = this.state
    return (
      <MuiPickersUtilsProvider
        utils={MomentUtils}
        moment={moment}
        locale='fr'
      >
        <div className='pickers'>
          <TimePicker
            value={selectedDate}
            onChange={this.handleDateChange}
          />
        </div>
      </MuiPickersUtilsProvider>
    )
  }
}
export default MaterialTimePicker
