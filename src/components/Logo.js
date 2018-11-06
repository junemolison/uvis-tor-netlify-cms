import React from 'react'

import './Logo.css'

export default ({ src = '/images/logo.svg' }) => (
  <div
    className='Logo'
    style={{
      backgroundImage: `url(${src})`
    }}
  />
)
