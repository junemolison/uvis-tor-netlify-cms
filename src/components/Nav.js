import React from 'react'
import { Link } from 'react-router-dom'

import Logo from './Logo'
import NavLink from './NavLink'
import Sandwich from './Sandwich'
import './Nav.css'

export default class Nav extends React.Component {
  state = {
    opened: false
  }

  handleOpen = () => this.setState((prevState) => ({ opened: !prevState.opened }))

  render () {
    return (
      <nav className='Nav'>
        <div className='Nav--Container container'>
          <Sandwich handleOpen={this.handleOpen} />
          <Link className='Link' to='/'>
            <Logo />
          </Link>
          <div className='Nav--Desktop'>
            <NavLink to='/gallery/' exact>
              Галерея
            </NavLink>
            <NavLink to='/benefits/' exact>
              Почему мы
            </NavLink>
            <NavLink to='/blog/' exact>
              Новости
            </NavLink>
            <NavLink to='/contact/' exact>
              Контакты
            </NavLink>
          </div>
        </div>
      </nav>
    )
  }
}
