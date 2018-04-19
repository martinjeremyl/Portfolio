import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Route } from 'react-router-dom'

import ListItem from '../../components/ListItem'
import Modal from '../../components/Modal'
import FixedActionButton from '../../components/FixedActionButton'
import Link from '../../components/Link'
import TravelCreationPage from './TravelCreationPage'

import TravelDetail from './TravelDetailPage'

@inject('appStore', 'travelStore')
@observer
class TravelPage extends Component {
  render () {
    const { appStore, travelStore } = this.props

    return (
      <div>
        {
          travelStore.travels.map(({ id, name }, iteration) => (
            <ListItem
              key={id}
              iteration={iteration}
              onClick={() => travelStore.setCurrentTravelId(id)}
            >
              <Link to='/travels/detail'>
                <div className='card'>
                  <div className='card-content'>
                    <div className='content'>{name}</div>
                    <div
                      onClick={e => {
                        e.stopPropagation()
                        travelStore.delete(id)
                      }}
                      className='is-right'
                    >
                      Supprimer
                    </div>
                  </div>
                </div>
              </Link>
            </ListItem>
          ))
        }
        <Route path='/travels/detail' component={TravelDetail} />
        <Modal isOpen={appStore.isModalOpen}>
          <TravelCreationPage />
        </Modal>
        <FixedActionButton onClick={() => appStore.switchModalStatus()}>+</FixedActionButton>
      </div>
    )
  }
}

export default TravelPage
