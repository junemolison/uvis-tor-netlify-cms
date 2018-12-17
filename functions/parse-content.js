const fs = require('fs')
const path = require('path')
const lensPath = require('nanoutils/cjs/lensPath')
// TODO: refactor mergeWith to allow multiple objects to merge (https://github.com/nanoutils/nanoutils/issues/168)
const mergeWith = require('nanoutils/cjs/mergeWith')
const globCb = require('glob')
const util = require('util')

const glob = util.promisify(globCb)
const readFile = util.promisify(fs.readFile)
const matter = require('gray-matter')
const yaml = require('js-yaml')

const options = {
  contentDir: './content/',
  outputFile: './src/data.json'
}

const getCollectionPath = filePath => {
  const pathParsed = path.parse(filePath)

  return pathParsed.dir
    .replace(options.contentDir, '')
    .split('/')
}

const getDocumentName = filePath => {
  const pathParsed = path.parse(filePath)
  return `${pathParsed.name}`
}

const getDocumentExt = filePath => {
  const pathParsed = path.parse(filePath)
  return `${pathParsed.ext}`
}

const parseMarkdown = data => {
  data = matter(data)
  data = { ...data, ...data.data }
  delete data.data
  return JSON.stringify(data)
}

const parseYaml = data => {
  data = yaml.safeLoad(data, 'utf8') || {}
  return JSON.stringify(data)
}

const getFileContents = filePath => {
  return readFile(filePath, 'utf8').then(data => {
    if (getDocumentExt(filePath) === '.md') {
      data = parseMarkdown(data)
    }
    if (['.yaml', '.yml'].includes(getDocumentExt(filePath))) {
      data = parseYaml(data)
    }
    let documentData = JSON.parse(data)
    documentData.name = getDocumentName(filePath)
    documentData.body = documentData.body || documentData.content
    const obj = lensPath(getCollectionPath(filePath))({}).set([documentData])
    console.log(`✨  Processed ${filePath}`)
    return obj
  })
}

const readFiles = async paths => Promise.all(paths.map(getFileContents))

const combineJSON = async () => {
  // mergeCustomiser concats arrays items
  const mergeCustomiser = (objValue, srcValue) => Array.isArray(objValue)
    ? objValue.concat(srcValue)
    : objValue
  console.log(`✨  Reading JSON files in ${options.contentDir}`)
  const paths = await glob(`${options.contentDir}/**/**.+(json|md|yaml|yml)`)
  const results = await readFiles(paths)
  let data = {}
  for (let i = 0; i < results.length; i++) {
    data = mergeWith(mergeCustomiser, data, results[i])
  }
  return JSON.stringify(data, null, 2)
}

const writeJSON = async () => {
  const json = await combineJSON()
  fs.writeFileSync(options.outputFile, json)
  console.log(`✅  Data saved to ${options.outputFile}`)
  process.exit()
}

writeJSON()
