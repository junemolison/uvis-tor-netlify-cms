import React from 'react'
import { Link } from 'react-router-dom'

import Logo from './Logo'
import NavLink from './NavLink'
import './Nav.css'

export default ({ handlePopupOpen }) => (
  <nav className='Nav'>
    <div className='Nav--Container container'>
      <Link to='/'>
        <Logo />
      </Link>
      <NavLink to='/gallery/' exact>
        Галерея
      </NavLink>
      <NavLink to='/blog/' exact>
        Новости
      </NavLink>
      <NavLink to='/contact/' exact>
        Контакты
      </NavLink>
    </div>
  </nav>
)
