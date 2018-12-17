import kebabCase from 'nanoutils/cjs/kebabCase'

export const slugify = (string = '') =>
  // keeps forward slashes
  string
    .toLowerCase()
    .split('/')
    .map(kebabCase)
    .join('/')
