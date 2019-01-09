import * as cx from 'classnames'
import clone from 'nanoutils/cjs/clone'
import equals from 'nanoutils/cjs/equals'
import lensPath from 'nanoutils/cjs/lensPath'
import over from 'nanoutils/cjs/over'
import React from 'react'

import LazyImage from '../components/LazyImage'
import './Gallery.css'

export default class Gallery extends React.Component {
  state = {
    scrollTop: 0,
    sizes: [],
    fullscreenView: undefined
  }

  handleSizeLoaded = (i, j, { width, height }) => {
    const sizes = clone(this.state.sizes)
    const widthLens = lensPath([i, j])
    const setWidth = () => width * 200 / height
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
            <h1>{ title }</h1>
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

  renderImage = () => {
    const { photoGallery } = this.props.fields
    let i = -1
    let j = -1

    if (this.state.fullscreenView) {
      [i, j] = this.state.fullscreenView
    }

    return (
      <div
        className={cx('Photo-Gallery-Wrapper--Image', {
          fixed: this.state.fullscreenView
        })}
        onClick={() => this.setState({ fullscreenView: undefined })}
        style={i !== -1 && j !== -1 ? {
          backgroundImage: `url(${photoGallery[i].images[j]})`
        } : {}}
      />
    )
  }

  render () {
    return (
      <React.Fragment>
        {this.renderImage()}
        {this.renderGallery()}
      </React.Fragment>
    )
  }
}
