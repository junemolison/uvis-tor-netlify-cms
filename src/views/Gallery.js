import React from 'react'

import PageHeader from '../components/PageHeader'
import Carousel from '../components/Carousel'
import './Gallery.css'

export default class Gallery extends React.Component {
  render () {
    const { title, subtitle, featuredImage, galleryCarousels } = this.props.fields

    return (
      <div className='Gallery'>
        <PageHeader
          title={title}
          subtitle={subtitle}
          backgroundImage={featuredImage}
        />
        <div className='section'>
          {galleryCarousels.map(({ title, images }, key) => (
            <Carousel
              key={key}
              title={title}
              images={images}
            />
          ))}
        </div>
      </div>
    )
  }
}
