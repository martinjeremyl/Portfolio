import React, { Component } from 'react'
import { dateFormatter } from '../../utils/dateTimeFormatter'

export default class DateDisplay extends Component {
  render () {
    const { date } = this.props

    return (
      <div>
        {dateFormatter.format(date)}
      </div>
    )
  }
}
