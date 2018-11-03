import React from 'react'

import SwipeableViews from 'react-swipeable-views'
import Pagination from './Pagination'
import LazyImage from './LazyImage'
import './Carousel.css'

export default class Carousel extends React.Component {
  state = {
    index: 0
  }

  handleIndexChange = index => this.setState({ index })

  render () {
    const { index } = this.state
    const { title, images } = this.props

    return (
      <div className='container'>
        <h1>{ title }</h1>
        <SwipeableViews index={index} onChangeIndex={this.handleIndexChange}>
          {images.map((image, index) => (
            image && (
              <LazyImage
                key={`Carousel-${index}`}
                className='Carousel--Image'
                src={image}
                alt='Carousel--Image'
              />
            )
          ))}
        </SwipeableViews>
        {images && images.length > 1 && (
          <Pagination
            dots={images.length}
            index={index}
            onChangeIndex={this.handleIndexChange}
          />
        )}
      </div>
    )
  }
}
