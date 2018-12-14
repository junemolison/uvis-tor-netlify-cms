import cx from 'classnames'
import React from 'react'

import './Logo.css'

export default ({ className, src = '/images/logo.svg' }) => (
  <div
    className={cx('Logo', className)}
    style={{
      backgroundImage: `url(${src})`
    }}
  />
)
