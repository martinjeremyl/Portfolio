import React from 'react'
import { Provider } from 'mobx-react'

import Router from './src/router'
import stores from './src/stores'

export default class App extends React.Component {
  render () {
    return (
      <Provider {...stores}>
        <Router />
      </Provider>
    )
  }
}
