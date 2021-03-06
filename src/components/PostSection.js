import React from 'react'
import ascend from 'nanoutils/cjs/descend'
import prop from 'nanoutils/cjs/prop'
import sortBy from 'nanoutils/cjs/sortBy'

import PostCard from '../components/PostCard'
import './PostSection.css'

class PostSection extends React.Component {
  static defaultProps = {
    posts: [],
    title: '',
    limit: 12,
    showLoadMore: true,
    loadMoreTitle: 'Load More',
    perPageLimit: 12
  }

  state = {
    limit: this.props.limit
  }

  increaseLimit = () => {
    this.setState(prevState => ({
      limit: prevState.limit + this.props.perPageLimit
    }))
  }

  render () {
    const { posts, title, showLoadMore, loadMoreTitle } = this.props
    const { limit } = this.state

    const visiblePosts = sortBy(ascend(prop('number')), posts)
      // show all unless you set a limit
      .slice(0, limit || posts.length)

    return (
      <div className='PostSection'>
        <div className='container2'>
          {title && <h2 className='PostSection--Title'>{title}</h2>}
          {!!visiblePosts.length && (
            <div className='PostSection--Grid'>
              {visiblePosts.map((postItem, index) => (
                <PostCard key={postItem.title + index} postItem={postItem} />
              ))}
            </div>
          )}
          {showLoadMore && visiblePosts.length < posts.length && (
            <div className='taCenter'>
              <button className='button' onClick={this.increaseLimit}>
                {loadMoreTitle}
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default PostSection
