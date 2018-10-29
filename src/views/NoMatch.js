import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import './NoMatch.css'

const NoMatch = ({ siteUrl }) => (
  <div className='NoMatch'>
    <section className='section thick'>
      <div className='container taCenter'>
        <h1>404 - Страница не найдена</h1>
        <p>
          Мы не можем найти страницу, которую Вы ищете!<br />Обратно на домашнюю страницу{' '}
          <a href={siteUrl}>
            {siteUrl.replace(/(^https?:\/\/)/, '').replace(/\/$/, '')}
          </a>
        </p>
      </div>
    </section>
    <Helmet>
      <title>404 – Страница не найдена</title>
      <body className='body--NoMatch' />
    </Helmet>
  </div>
)

NoMatch.propTypes = {
  siteUrl: PropTypes.string.isRequired
}

export default NoMatch
