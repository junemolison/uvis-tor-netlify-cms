import React from 'react';
import Logo from './Logo';
import './Footer.css';

const removeAtSign = str => str.slice(1)
const removeNonNumbers = str => str.replace(/[^\w]/g, '')

class LogoLink extends React.Component {
  state = {
    hover: false
  };

  render () {
    const { hover } = this.state
    const { alt, className, href } = this.props

    if (hover) {
    }

    return (
      <a
        aria-label={alt}
        alt={alt}
        className={className}
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        role='button'
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <React.Fragment>
          <Logo
            className={!hover ? 'hovered' : 'not_hovered'}
            src={this.props.logo}
          />
          <Logo
            className={hover ? 'idle' : 'not_idle'}
            src={this.props.hoverLogo}
          />
        </React.Fragment>
      </a>
    )
  }
}

export default ({ globalSettings, socialMediaCard, navLinks }) => {
  const {
    twitter,
    facebook,
    instagram,
    vkontakte,
    whatsapp,
    whatsappMessage
  } = socialMediaCard

  const textToWhatsApp = whatsappMessage
    ? `?text=${encodeURI(whatsappMessage)}`
    : '';

  return (
    <footer className='Footer'>
      <div className='container taCenter'>
        <div className='Footer--Links'>
          {twitter && (
            <LogoLink
              alt='Link to Twitter'
              className='Link Link--Twitter'
              href={`https://twitter/${twitter}`}
              logo='/images/tw.svg'
              hoverLogo='/images/tw-hover.svg'
            />
          )}
          {vkontakte && (
            <LogoLink
              alt='Link to VKontakte'
              className='Link Link--VKontakte'
              href={`https://vk.com/${removeAtSign(vkontakte)}`}
              logo='/images/vk.svg'
              hoverLogo='/images/vk-hover.svg'
            />
          )}
          {facebook && (
            <LogoLink
              alt='Link to Facebook'
              className='Link Link--Facebook'
              href={`https://www.facebook.com/${removeAtSign(facebook)}`}
              logo='/images/fb.svg'
              hoverLogo='/images/fb-hover.svg'
            />
          )}
          {instagram && (
            <LogoLink
              alt='Link to Instagram'
              className='Link Link--Instagram'
              href={`https://www.instagram.com/${removeAtSign(instagram)}`}
              logo='/images/ig.svg'
              hoverLogo='/images/ig-hover.svg'
            />
          )}
          {whatsapp && (
            <LogoLink
              alt='Link to WhatsApp'
              className='Link Link--WhatsApp'
              href={`https://wa.me/${removeNonNumbers(
                whatsapp
              )}${textToWhatsApp}`}
              logo='/images/wa.svg'
              hoverLogo='/images/wa-hover.svg'
            />
          )}
        </div>
        <span>© 2019 Все права защищены</span>
      </div>
    </footer>
  )
};
