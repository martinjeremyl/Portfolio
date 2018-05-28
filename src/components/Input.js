import React from 'react'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import { MuiThemeProvider, createMuiTheme } from 'material-ui'

const materialWhiteTheme = createMuiTheme({
  overrides: {
    MuiInput: {
      root: {
        color: 'white'
      },
      underline: {
        '&::before': {
          backgroundColor: '#fff'
        },
        '&::after': {
          backgroundColor: '#fff'
        }
      }
    }
  }
})

const materialDefaultTheme = createMuiTheme({
  overrides: {
    MuiInput: {
      root: {
        color: '#313C47'
      },
      underline: {
        '&::before': {
          backgroundColor: '#313C47'
        },
        '&::after': {
          backgroundColor: '#313C47'
        }
      }
    },
    MuiFormLabel: {
      focused: {
        color: '#313C47 !important'
      }
    }
  }
})

class Input extends React.Component {
  state = {
    name: '',
    age: '',
    multiline: '',
    currency: 'EUR'
  }

  render () {
    const { classes, whiteInput, ...props } = this.props

    return (
      <MuiThemeProvider theme={whiteInput ? materialWhiteTheme : materialDefaultTheme}>
        <TextField
          {...props}
          InputProps={{
            className: whiteInput ? classes.whiteInput : null
          }}
        />
      </MuiThemeProvider>
    )
  }
}

export default withStyles()(Input)
