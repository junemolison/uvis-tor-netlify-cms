import React from 'react'
import PropTypes from 'prop-types'
import PaginationDot from './PaginationDot'

import './Pagination.css'

const numberify = n => {
  return n === 1
    ? 'st'
    : n === 2
      ? 'nd'
      : n === 3
        ? 'rd'
        : 'th'
}

class Pagination extends React.Component {
  handleClick = (_, index) => {
    this.props.onChangeIndex(index)
  };

  render () {
    const { index, dots } = this.props

    const children = []

    for (let i = 0; i < dots; i += 1) {
      children.push(
        <PaginationDot
          key={i}
          index={i}
          active={i === index}
          label={`${i + 1}${numberify(i + 1)} image`}
          onClick={this.handleClick}
        />
      )
    }

    return (
      <div
        className='Pagination'
        role='navigation'
      >
        {children}
      </div>
    )
  }
}

Pagination.propTypes = {
  dots: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  onChangeIndex: PropTypes.func.isRequired
}

export default Pagination
