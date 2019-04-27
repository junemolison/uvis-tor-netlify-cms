import React from 'react'
import descend from 'nanoutils/cjs/descend'
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
  posts = sortBy(descend(prop('date')), posts)

  return (
    <main className='Blog'>
      <PageHeader
        title={title}
        subtitle={subtitle}
        backgroundImage={featuredImage}
      />
      <Content source={body} />
      {!!postCategories.length && (
        <PostCategoriesNav categories={postCategories} />
      )}

      {!!posts.length && <PostSection posts={posts} />}
    </main>
  )
}
