import cx from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import 'intersection-observer'

import './FullscreenImage.css'
import BackgroundImage from './BackgroundImage'

class FullscreenImage extends React.Component {
  state = {
    window: {
      width: window.innerWidth,
      height: window.innerHeight
    },
    image: {}
  }

  componentDidMount () {
    window.addEventListener('resize', this.updateSize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateSize)
  }

  updateSize = event => {
    this.setState({
      window: {
        width: event.target.innerWidth,
        height: event.target.innerHeight
      }
    })
  }

  loadImageSize = ({ width, height }) => {
    this.setState({
      image: {
        width,
        height
      }
    })
  }

  render () {
    const { alt, className, src, onClick } = this.props

    return (
      <div
        className='FullscreenImage--Container'
        onClick={onClick}
      >
        <BackgroundImage
          className={cx('FullscreenImage', className)}
          contain
          src={src}
          alt={alt}
          onSizeLoaded={this.loadImageSize}
        />
      </div>
    )
  }
}

FullscreenImage.propTypes = {
  alt: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default FullscreenImage
