import React from 'react'

import Content from '../components/Content'
import PageHeader from '../components/PageHeader'
import LazyImage from '../components/LazyImage'
import './Benefits.css'

export default ({ fields }) => {
  const { title, subtitle, featuredImage, benefits, body } = fields
  return (
    <main className='Benefits'>
      <PageHeader
        title={title}
        subtitle={subtitle}
        backgroundImage={featuredImage}
      />
      <div className='section'>
        <div className='container'>
          <div>
            <Content source={body} />
            {benefits.map(({ image, benefit }, key) => (
              <div className='Benefit' key={`benefit-${key}`}>
                <LazyImage src={image} alt={`benifit-${key}`} />
                <Content source={benefit} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
