import React from 'react'
import ascend from 'nanoutils/cjs/ascend'
import sortBy from 'nanoutils/cjs/sortBy'
import prop from 'nanoutils/cjs/prop'

import Content from '../components/Content'
import PageHeader from '../components/PageHeader'
import PostCategoriesNav from '../components/PostCategoriesNav'
import PostSection from '../components/PostSection'

import './Blog.css'

export default ({
  fields,
  posts = [],
  postCategories = [],
  showFeatured = true
}) => {
  const { title, subtitle, featuredImage, body } = fields
  posts = sortBy(ascend(prop('title')), posts)

  return (
    <main className='Blog'>
      <PageHeader
        title={title}
        subtitle={subtitle}
        backgroundImage={featuredImage}
        className='titleFix'
      />

      {!!postCategories.length && (
        <PostCategoriesNav categories={postCategories} />
      )}

      <div>
        <div className='container'>
          <Content source={body} className='text' />
          {!!posts.length && <PostSection posts={posts} />}
        </div>
      </div>
    </main>
  )
}
