import React, { Fragment } from 'react'
import Carousel from 'nuka-carousel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class carouselComponent extends React.Component {
  state = {
    selectedPictureIndex: 0,
    slideIndex: 0
  }

  render () {
    const slides = [
      require('../img/imgVoyages/Aurore.jpg'),
      require('../img/imgVoyages/Champ.jpg'),
      require('../img/imgVoyages/Foret.jpg'),
      require('../img/imgVoyages/Montain.jpg'),
      require('../img/imgVoyages/Neige.jpg'),
      require('../img/imgVoyages/Plage.jpg'),
      require('../img/imgVoyages/Ville.jpg')
    ]

    return (
      <div style={{
        width: 200,
        position: 'relative',
        display: 'block'
      }}>
        <Carousel
          initialSlideHeight={100}
          initialSlideWidth={100}
          width={200}
          renderBottomCenterControls={() => null}
          renderCenterLeftControls={() => null}
          renderCenterRightControls={() => null}
          afterSlide={slideIndex => this.setState({ slideIndex })}
        >
          {
            slides.map((slide, index) => (
              <Fragment>
                <img
                  onLoad={() => window.dispatchEvent(new Event('resize'))}
                  src={slide}
                  onClick={() => this.setState({ selectedPictureIndex: index })}
                />
                {
                  /* display check picture if the current picture is selected */
                  this.state.selectedPictureIndex === index && (
                    <div style={{
                      height: 'auto',
                      position: 'absolute',
                      bottom: 5,
                      right: 5
                    }}>
                      <FontAwesomeIcon style={{color: '#FFF', fontSize: 25}} icon={['fal', 'check-circle']} />
                    </div>
                  )
                }
              </Fragment>
            ))
          }
        </Carousel>
      </div>
    )
  }
}

export default carouselComponent
