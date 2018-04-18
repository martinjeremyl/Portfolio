import React, {Component} from 'react'

const dateFormatter = new Intl.DateTimeFormat('fr', {
  hour12: false,
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
})

const timeFormatter = new Intl.DateTimeFormat('fr', {
  hour12: false,
  hour: 'numeric',
  minute: 'numeric'
})

export class DateDisplay extends Component {
  render () {
    const {date} = this.props

    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        <div>
          {dateFormatter.format(date)}
        </div>
        <div>
          {timeFormatter.format(date)}
        </div>
      </div>
    )
  }
}
