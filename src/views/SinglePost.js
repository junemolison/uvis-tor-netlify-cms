import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'react-feather'

import Content from '../components/Content'
import BackgroundImage from '../components/BackgroundImage'
import './SinglePost.css'

export default ({ fields, nextPostURL, prevPostURL }) => {
  const { title, postFeaturedImage, body = [] } = fields

  return (
    <article className='SinglePost section light'>
      {postFeaturedImage && (
        <BackgroundImage
          className='SinglePost--BackgroundImage'
          src={postFeaturedImage}
          alt={title}
        />
      )}
      <div className='Container--Post'>
        <Link className='SinglePost--BackButton' to='/blog/'>
          <ChevronLeft /> Назад
        </Link>
        <div className='SinglePost--Content relative'>
          {title && <h1 className='SinglePost--Title'>{title}</h1>}

          <div className='SinglePost--InnerContent'>
            <Content source={body} />
          </div>

          <div className='SinglePost--Pagination'>
            {prevPostURL && (
              <Link
                className='SinglePost--Pagination--Link prev'
                to={prevPostURL}
              >
                К предыдущему оборудованию
              </Link>
            )}
            {nextPostURL && (
              <Link
                className='SinglePost--Pagination--Link next'
                to={nextPostURL}
              >
                К следующему оборудованию
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
