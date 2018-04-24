import React, { PureComponent } from 'react'
import { DatePicker } from 'material-ui-pickers'
import moment from 'moment'
import MomentUtils from 'material-ui-pickers/utils/moment-utils'
import 'moment/locale/fr'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'
import { InputAdornment } from 'material-ui/Input'
import EventIcon from '@material-ui/icons/Event'
import { MuiThemeProvider, createMuiTheme } from 'material-ui'

const materialTheme = createMuiTheme({
  overrides: {
    MuiInput: {
      underline: {
        '&::before': {
          backgroundColor: 'white'
        },
        '&::after': {
          backgroundColor: 'white'
        }
      },
      root: {
        color: 'white'
      }
    },
    MuiPickersToolbar: {
      toolbar: {
        background: 'linear-gradient(to left, #F2BF95, #E45C55)'
      }
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        // backgroundColor: lightBlue.A200,
        // color: 'white',
      }
    },
    MuiPickersDay: {
      day: {
        color: '#E45C55'
      },
      selected: {
        background: 'linear-gradient(to left, #F2BF95, #E45C55)'
      },
      current: {
        color: 'black'
      }
    },
    MuiPickersModal: {
      dialogAction: {
        '& > button': {
          color: '#E45C55'
        }
      }
    },
    MuiButton: {
      flatPrimary: {
        color: '#E45C55'
      }
    },
    MuiInputAdornment: {
      positionStart: {
        marginBottom: '5px'
      }
    }
  }
})

class MaterialDatePicker extends PureComponent {
  constructor (props) {
    moment.locale('fr')
    super(props)
    this.state = {
      selectedDate: moment()
    }
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  componentDidUpdate () {
    if (this.props.getdate) {
      this.props.getdate(this.state.selectedDate.toString())
    }
  }

  handleDateChange = date => {
    this.setState({ selectedDate: date })
  }

  render () {
    const { selectedDate } = this.state
    const newProps = { ...this.props }
    delete newProps['getdate']

    return (
      <MuiPickersUtilsProvider
        utils={MomentUtils}
        moment={moment}
        DateTimeFormat={Intl.DateTimeFormat}
        locale='fr'
        formatDate={date => moment(date).format('DD-MM-YYYY')}
      >
        <MuiThemeProvider theme={materialTheme}>
          <div className='pickers'>
            <DatePicker
              value={selectedDate}
              onChange={this.handleDateChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <EventIcon />
                  </InputAdornment>
                )
              }}
              {...newProps}
            />
          </div>
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    )
  }
}

export default MaterialDatePicker
