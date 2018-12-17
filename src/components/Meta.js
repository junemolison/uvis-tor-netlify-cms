import React from 'react'
import Helmet from 'react-helmet'
import pickBy from 'nanoutils/cjs/pickBy'
import compact from 'nanoutils/cjs/compact'
import lensPath from 'nanoutils/cjs/lensPath'

const onlyTruthyValues = obj => pickBy(compact, obj)

const Meta = props => {
  const {
    title,
    url,
    description,
    absoluteImageUrl,
    twitter,
    facebook,
    headerScripts,
    noindex,
    canonicalLink
    // overwrite { title, description } if in fields or fields.meta
  } = {
    ...props,
    ...onlyTruthyValues(lensPath(['fields'])(props)),
    ...onlyTruthyValues(lensPath(['fields', 'meta'])(props))
  }

  // write headerScripts
  const headerScriptsElement = document.head.querySelector('#headerScripts')
  if (headerScripts && headerScriptsElement) {
    headerScriptsElement.outerHTML = headerScripts
  }

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {title && <meta property='og:title' content={title} />}
      {description && <meta name='description' content={description} />}
      {description && <meta property='og:description' content={description} />}
      {url && <meta property='og:type' content='website' />}
      {url && <meta property='og:url' content={url} />}
      {absoluteImageUrl && (
        <meta name='twitter:card' content='summary_large_image' />
      )}
      {absoluteImageUrl && (
        <meta property='og:image' content={absoluteImageUrl} />
      )}
      {twitter && (
        <meta name='twitter:site' content={twitter} />
      )}
      {twitter && (
        <meta name='twitter:creator' content={twitter} />
      )}
      {facebook && (
        <meta name='fb:admins' content={facebook} />
      )}
      {noindex && <meta name='robots' content='noindex' />}
      {canonicalLink && <link rel='canonical' href={canonicalLink} />}
    </Helmet>
  )
}

export default Meta
