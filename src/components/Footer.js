import React from 'react'

import Logo from './Logo'

import './Footer.css'

const removeAtSign = str => str.slice(1)
const removeNonNumbers = str => str.replace(/[^\w]/g, '')

const LogoLink = ({ className, href, logo }) => (
  <a
    className={className}
    href={href}
    target='_blank'
    rel='noopener noreferrer'
  >
    <Logo src={logo} />
  </a>
)

export default ({ globalSettings, socialMediaCard, navLinks }) => {
  const { twitter, facebook, instagram, vkontakte, whatsapp, whatsappMessage } = socialMediaCard

  const textToWhatsApp = whatsappMessage
    ? `?text=${encodeURI(whatsappMessage)}`
    : ''

  return (
    <footer className='Footer'>
      <div className='container taCenter'>
        <div className='Footer--Links'>
          {twitter && (
            <LogoLink
              className='Link Link--Twitter'
              href={`https://twitter/${twitter}`}
              logo='/images/tw.svg'
            />
          )}
          {vkontakte && (
            <LogoLink
              className='Link Link--VKontakte'
              href={`https://vk.com/${removeAtSign(vkontakte)}`}
              logo='/images/vk.svg'
            />
          )}
          {facebook && (
            <LogoLink
              className='Link Link--Facebook'
              href={`https://www.facebook.com/${removeAtSign(facebook)}`}
              logo='/images/fb.svg'
            />
          )}
          {instagram && (
            <LogoLink
              className='Link Link--Instagram'
              href={`https://www.instagram.com/${removeAtSign(instagram)}`}
              logo='/images/ig.svg'
            />
          )}
          {whatsapp && (
            <LogoLink
              className='Link Link--WhatsApp'
              href={`https://wa.me/${removeNonNumbers(whatsapp)}${textToWhatsApp}`}
              logo='/images/wa.svg'
            />
          )}
        </div>
        <span>© 2018 Все права защищены</span>
        <div className='Footer--License'>
          Icons made by
          <a href='http://www.freepik.com' title='Freepik'>Freepik</a>
          from
          <a href='https://www.flaticon.com/' title='Flaticon'>www.flaticon.com</a>
          is licensed by
          <a href='http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0' rel='noopener noreferrer' target='_blank'>CC 3.0 BY</a>
        </div>
      </div>
    </footer>
  )
}
