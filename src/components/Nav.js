import React from 'react'
import { Link } from 'react-router-dom'

import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'

import Logo from './Logo'
import NavLink from './NavLink'
import Sandwich from './Sandwich'
import './Nav.css'

export default class Nav extends React.Component {
  state = {
    open: false
  }

  handleOpen = () => this.setState({ open: true })

  handleClose = () => this.setState({ open: false })

  render () {
    const { open } = this.state

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
        <Drawer
          className='Nav--Drawer'
          variant='temporary'
          anchor='left'
          open={open}
          classes={{}}
          onBlur={this.handleClose}
        >
          <Link className='Link' to='/'>
            <Logo />
          </Link>
          <Divider />
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
          <Divider />
        </Drawer>
      </nav>
    )
  }
}
