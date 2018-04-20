import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

const routesTitle = {
  '/login': 'Connexion',
  '/register': 'Inscription',
  '/travels': 'Mes voyages',
  '/travel/': 'Détails du voyage'
}
const routesTitleProxy = new Proxy(routesTitle, {
  get (target, property) { return target[property] !== undefined ? target[property] : 'Traveled' }
})

@inject('routingStore')
@observer
export class Header extends Component {
  render () {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div
          style={{ margin: '0 .5rem', cursor: 'pointer' }}
          onClick={this.props.routingStore.goBack}
        >
          <svg width={24} height={24}>
            <path d='M20.016 11.016v1.969H7.828l5.578 5.625L12 20.016 3.984 12 12 3.984l1.406 1.406-5.578 5.625h12.188z' />
          </svg>
        </div>
        <h3 style={{ margin: 0, padding: 0 }}>
          {routesTitleProxy[this.props.routingStore.location.pathname]}
        </h3>
      </div>
    )
  }
}
