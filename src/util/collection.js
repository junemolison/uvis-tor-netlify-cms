// TODO: replace it with includes from nanoutils (https://github.com/nanoutils/nanoutils/issues/166)
import indexOf from 'nanoutils/cjs/indexOf'
import kebabCase from 'nanoutils/cjs/kebabCase'
import uniq from 'nanoutils/cjs/uniq'
import values from 'nanoutils/cjs/values'

export const getCollectionTerms = (
  collection = [],
  taxonomyName,
  orderBy = 'asc'
) => {
  // collection: array of items in a collection
  // taxonomyName: taxonomy field title, comma-separated string form each collection item
  // orderBy: ['asc', 'desc'] capitals are allowed

  if (!collection.length) {
    return []
  }
  let terms = collection
    .filter(collectionItem => collectionItem[taxonomyName])
    .reduce((acc, collectionItem) => {
      const termField = collectionItem[taxonomyName]
      const collectionItemTerms =
        typeof termField === 'string'
          ? termField.split(',').map(term => kebabCase(term.trim()))
          : termField.map(term => kebabCase(values(term)[0]))
      return uniq([...acc, ...collectionItemTerms])
    }, [])
    .sort()
  terms = orderBy.toLowerCase() === 'asc' ? terms : terms.reverse()
  return terms
}

export const documentHasTerm = (doc, taxonomyName, term) => {
  const termField = doc[taxonomyName]
  if (!termField) return false
  const terms =
    typeof termField === 'string'
      ? termField.split(',').map(term => kebabCase(term))
      : termField.map(term => kebabCase(values(term)[0]))

  return indexOf(kebabCase(term), terms) !== -1
}
