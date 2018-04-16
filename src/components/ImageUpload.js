import React, { Component } from 'react'

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
          width: '150px',
          height: '150px',
          background: imagePreviewUrl ? 'transparent' : '#888',
          borderRadius: '50%',
          position: 'relative',
          border: '1px solid grey'
        }}
      >
        <input
          style={{
            opacity: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            zIndex: 1000,
            position: 'absolute',
            top: 0,
            left: 0
          }}
          type='file'
          onChange={e => this.handleImageChange(e)}
        />

        <img
          style={{
            opacity: imagePreviewUrl ? 1 : 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 100
          }}
          src={imagePreviewUrl || ''}
        />
      </div>
    )
  }
}

export default ImageUpload
