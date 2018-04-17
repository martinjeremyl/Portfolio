import React from 'react'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'

class DatePicker extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment()
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (date) {
    this.setState({
      startDate: date
    })
  }

  render () {
    return <ReactDatePicker
      selected={this.state.startDate}
      locale='fr'
      onChange={this.handleChange}
      placeholder={this.props.placeholder}
    />
  }
}
export default DatePicker
