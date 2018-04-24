import React, { Fragment } from 'react'
import Carousel from 'nuka-carousel'

class carouselComponent extends React.Component {
  state = {
    selectedPictureIndex: null
  }

  render () {
    const slides = [
      'https://www.farmersmuseum.org/files/images/exhibitions/tfm-exhibitpage-carousel.jpg',
      'http://placehold.it/1000x400/ffffff/c0392b/&text=slide2',
      'http://placehold.it/1000x400/ffffff/c0392b/&text=slide3',
      'http://placehold.it/1000x400/ffffff/c0392b/&text=slide4',
      'http://placehold.it/1000x400/ffffff/c0392b/&text=slide5',
      'http://placehold.it/1000x400/ffffff/c0392b/&text=slide6'
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
                      bottom: 0,
                      right: 0
                    }}>
                      toto
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
