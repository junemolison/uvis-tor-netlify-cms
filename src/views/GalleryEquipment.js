import clone from 'nanoutils/cjs/clone'
import equals from 'nanoutils/cjs/equals'
import lensPath from 'nanoutils/cjs/lensPath'
import over from 'nanoutils/cjs/over'
import React from 'react'

import LazyImage from '../components/LazyImage'
import './Gallery.css'
import FullscreenImage from '../components/FullscreenImage'
import { adjustSizeInGallery } from '../util/size'

export default class Gallery extends React.Component {
  state = {
    scrollTop: 0,
    sizes: [],
    fullscreenView: undefined
  }

  handleSizeLoaded = (i, j, image) => {
    const sizes = clone(this.state.sizes)
    const widthLens = lensPath([i, j])
    const setWidth = () => adjustSizeInGallery(image).width
    this.setState({
      sizes: over(widthLens, setWidth, sizes)
    })
  }

  toggleView = (i, j) => {
    const willBeClosed = equals(this.state.fullscreenView, [i, j])
    this.setState({
      fullscreenView: willBeClosed ? undefined : [i, j]
    })
  }

  renderGallery = () => {
    const { photoGallery } = this.props.fields

    return (
      <div className='Gallery container'>
        {photoGallery.map(({ title, images }, galleryIndex) => (
          <section key={`Photo-Gallery-${galleryIndex}`}>
            {images.map((image, index) => {
              const widthLens = lensPath([galleryIndex, index])
              const width = widthLens(this.state.sizes).get()
              const divStyle = {
                width,
                flexGrow: width
              }

              return (
                <div
                  key={`Photo-Gallery-${galleryIndex}-${index}`}
                  className={'Photo-Gallery-Wrapper--Image'}
                  style={divStyle}
                  onClick={() => this.toggleView(galleryIndex, index)}
                >
                  <LazyImage
                    className='Photo-Gallery--Image'
                    src={image}
                    alt='Photo-Gallery--Image'
                    onSizeLoaded={size =>
                      this.handleSizeLoaded(galleryIndex, index, size)
                    }
                  />
                </div>
              )
            })}
          </section>
        ))}
      </div>
    )
  }

  renderFullscreenImage = () => {
    const { photoGallery } = this.props.fields

    if (this.state.fullscreenView) {
      const [i, j] = this.state.fullscreenView

      return (
        <FullscreenImage
          className='Photo-Gallery--Image'
          src={photoGallery[i].images[j]}
          alt='Photo-Gallery--Image'
          onClick={() => this.setState({ fullscreenView: undefined })}
        />
      )
    }

    return undefined
  }

  render () {
    return (
      <React.Fragment>
        {this.renderFullscreenImage()}
        {this.renderGallery()}
      </React.Fragment>
    )
  }
}
