import React from 'react'
// import { ChevronLeft, ChevronRight } from 'react-feather'

import SwipeableViews from 'react-swipeable-views'
import Pagination from '../components/Pagination'
import PageHeader from '../components/PageHeader'
import LazyImage from '../components/LazyImage.js'
import './Gallery.css'

export default class Gallery extends React.Component {
  state = {
    indices: Array(this.props.fields.galleryImages.length).fill(0)
  }

  handleIndexChange = blockIndex => index => this.setState(({ indices: prevIndices }) => {
    const indices = prevIndices.slice()
    indices[blockIndex] = index

    return {
      indices
    }
  })

  render () {
    const { indices } = this.state
    const { title, subtitle, featuredImage, galleryImages } = this.props.fields

    return (
      <div className='Gallery'>
        <PageHeader
          title={title}
          subtitle={subtitle}
          backgroundImage={featuredImage}
        />
        <div className='section'>
          {galleryImages && galleryImages.map(({ title, images }, blockIndex) => (
            <div className='container'>
              <h1>{ title }</h1>
              <SwipeableViews index={indices[blockIndex]} onChangeIndex={this.handleIndexChange(blockIndex)}>
                {images && images.map((url, index) => (
                  <LazyImage
                    key={`Gallery--Image-${blockIndex}-${index}`}
                    className='Gallery--Image'
                    src={url}
                    alt='Gallery--Image'
                  />
                ))}
              </SwipeableViews>
              <Pagination dots={images.length} index={indices[blockIndex]} onChangeIndex={this.handleIndexChange(blockIndex)} />
              {/* <div className='Gallery--Pagination'>
                <ChevronLeft />
                <ChevronRight />
              </div> */}
            </div>
          ))}
        </div>
      </div>
    )
  }
}
