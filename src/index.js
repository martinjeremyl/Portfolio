import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import 'jquery'
import 'popper.js'

import App from './App'
import store from './stores/RootStore'

// Pour le HMR
window.stores = window.stores || store

ReactDOM.render(
  <Provider {...window.stores}>
    <App />
  </Provider>,
  document.getElementById('app')
)

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('../public/serviceWorker.js')
// }
