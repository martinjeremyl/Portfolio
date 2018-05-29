import React from 'react'
import {Spring, animated, config} from 'react-spring'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import TravelDetailEditMenuItem from './TravelDetailEditMenuItem'

const TravelDetailEditMenu = ({isEditTravelMenuOpen, closeEditTravelMenu}) => (
  <Spring
    to={{
      transform: `scaleY(${isEditTravelMenuOpen ? 1 : 0})`,
      opacity: isEditTravelMenuOpen ? 1 : 0.5,
      pointerEvents: isEditTravelMenuOpen ? 'auto' : 'none'
    }}
    config={config.gentle}
  >
    {styles => (
      <animated.div style={{
        ...styles,
        display: 'flex',
        flexFlow: 'column nowrap',
        backgroundColor: 'rgba(0, 0, 0, .8)',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        marginTop: '56px',
      }}>
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: 25,
            height: 25,
            padding: 50,
            margin: -35
          }}
          onClick={closeEditTravelMenu}
        >
          <FontAwesomeIcon
            style={{
              color: '#FFF',
              fontSize: 25,
            }}
            icon={['fal', 'times']}
          />

        </div>
        <TravelDetailEditMenuItem onClick={closeEditTravelMenu}>
          <FontAwesomeIcon className='iconMenuTravel' icon={['fal', 'info-circle']}/>
          <div
            className='labelMenuTravel'>
            Modifier les infos du voyage
          </div>
        </TravelDetailEditMenuItem>
        <TravelDetailEditMenuItem onClick={closeEditTravelMenu}>
          <FontAwesomeIcon className='iconMenuTravel' icon={['fal', 'users']}/>
          <div
            className='labelMenuTravel'>
            Ajouter des participants
          </div>
        </TravelDetailEditMenuItem>
        <TravelDetailEditMenuItem onClick={closeEditTravelMenu}>
          <FontAwesomeIcon className='iconMenuTravel' icon={['fal', 'cogs']}/>
          <div
            className='labelMenuTravel'>
            Ajouter des fonctionnalités
          </div>
        </TravelDetailEditMenuItem>
      </animated.div>
    )}
  </Spring>
)

export default TravelDetailEditMenu
