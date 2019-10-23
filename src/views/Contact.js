import React from 'react'
import { MapPin, Smartphone, Mail } from 'react-feather'

import PageHeader from '../components/PageHeader'
import EnquiryFormSimpleAjax from '../components/EnquiryFormSimpleAjax'
import Content from '../components/Content'
import './Contact.css'

export default ({ fields }) => {
  const { body, title, subtitle, featuredImage, addresses, email } = fields
  return (
    <div className='Contact'>
      <PageHeader
        title={title}
        subtitle={subtitle}
        backgroundImage={featuredImage}
      />

      <div className='section Contact--Section1'>
        <div className='container Contact--Section1--Container'>
          <div>
            <Content source={body} />

            <div className='Contact--Details'>
              {addresses &&
                addresses.map(({ address, phone }) => (
                  <React.Fragment key={address + phone}>
                    {address && (
                      <a
                        className='Contact--Details--Item'
                        href={`https://www.google.com.au/maps/search/${encodeURI(
                          address
                        )}`}
                        rel='noopener noreferrer'
                        target='_blank'
                      >
                        <MapPin /> {address}
                      </a>
                    )}
                    {phone && (
                      <a
                        className='Contact--Details--Item'
                        href={`tel:${phone}`}
                      >
                        <Smartphone /> {phone}
                      </a>
                    )}
                  </React.Fragment>
                ))}
              {email && (
                <a className='Contact--Details--Item' href={`mailto:${email}`}>
                  <Mail /> {email}
                </a>
              )}
            </div>
          </div>

          <div>
            <EnquiryFormSimpleAjax name='Simple Form Ajax' />
          </div>
        </div>
      </div>
    </div>
  )
}
