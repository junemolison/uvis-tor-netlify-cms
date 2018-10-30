import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import './PaginationDot.css'

class PaginationDot extends React.Component {
  handleClick = event => {
    this.props.onClick(event, this.props.index)
  };

  render () {
    const { active } = this.props

    return (
      <button
        type='button'
        className='PaginationDot'
        onClick={this.handleClick}
      >
        <div className={cx(
          'PaginationDot__Dot',
          { 'PaginationDot__Dot--active': active }
        )} />
      </button>
    )
  }
}

PaginationDot.propTypes = {
  active: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

export default PaginationDot
