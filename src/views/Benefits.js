import React from 'react'

import Content from '../components/Content'
import PageHeader from '../components/PageHeader'
import LazyImage from '../components/LazyImage'
import './Benefits.css'

export default ({ fields }) => {
  const { title, subtitle, featuredImage, benefits } = fields
  return (
    <main className='Benefits'>
      <PageHeader
        title={title}
        subtitle={subtitle}
        backgroundImage={featuredImage}
      />
      <div className='section'>
        <div className='container'>
          {benefits.map(({ image, body }, key) => (
            <div
              className='Benefit'
              key={`benefit-${key}`}
            >
              <LazyImage src={image} />
              <Content source={body} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
