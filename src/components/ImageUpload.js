import React, { Component } from 'react'
import Avatar from './Avatar'

class ImageUpload extends Component {
  state = { file: '', imagePreviewUrl: '' }

  handleImageChange (e) {
    e.preventDefault()

    let reader = new FileReader()
    let file = e.target.files[0]

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      })
    }

    reader.readAsDataURL(file)
  }

  render () {
    let { imagePreviewUrl, file } = this.state

    this.props.imageCallback(file)

    return (
      <div
        style={{
          marginTop: '20px',
          marginLeft: '15%',
          width: '70px',
          height: '70px',
          background: 'transparent',
          borderRadius: '50%',
          position: 'relative',
          border: `1px solid ${imagePreviewUrl ? '#F57464' : 'transparent'}`
        }}
      >
        <input
          style={{
            opacity: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            zIndex: 1000
          }}
          type='file'
          onChange={e => this.handleImageChange(e)}
        />
        {
          imagePreviewUrl
            ? (
              <img
                style={{
                  pointerEvents: 'none',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 100
                }}
                src={imagePreviewUrl}
              />
            )
            : (
              <Avatar name={this.props.fullName} style={{
                margin: '-70px 0 0 0',
                pointerEvents: 'none',
                width: 70,
                height: 70
              }} />
            )
        }
      </div>
    )
  }
}

export default ImageUpload
