import React from 'react'

import LazyImage from '../components/LazyImage'
import './Gallery.css'

export default class Gallery extends React.Component {
  state = {}

  handleSizeLoaded = (i, j, { width, height }) => {
    this.setState({
      [`${i}-${j}`]: width * 200 / height
    })
  }

  render () {
    const { photoGallery } = this.props.fields

    return (
      <div className='Gallery container'>
        {photoGallery.map(({ title, images }, galleryIndex) => (
          <section key={`Photo-Gallery-${galleryIndex}`}>
            <h1>{ title }</h1>
            {images.map((image, index) => {
              const width = this.state[`${galleryIndex}-${index}`]

              const divStyle = {
                width,
                flexGrow: width
              }

              return (
                <div
                  key={`Photo-Gallery-${galleryIndex}-${index}`}
                  className='Photo-Gallery-Wrapper--Image'
                  style={divStyle}
                >
                  <LazyImage
                    className='Photo-Gallery--Image'
                    src={image}
                    alt='Photo-Gallery--Image'
                    onSizeLoaded={size => this.handleSizeLoaded(galleryIndex, index, size)}
                  />
                </div>
              )
            })}
          </section>
        ))}
      </div>
    )
  }
}
