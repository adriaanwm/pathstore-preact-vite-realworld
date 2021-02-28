import { urls } from '~/consts/urls'

export const match = (urls, name) => {
  let ns = ''
  if (name.indexOf('.') !== -1) {
    [ns, name] = name.split('.')
  }
  const scheme = urls.find(({ namespace }) => namespace === ns)
  if (!scheme) return console.warn('No route scheme with namespace', ns)
  return {
    scheme,
    definition: scheme.routes[name]
  }
}

const stringify = queries =>
  Object.keys(queries)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(queries[k])}`)
    .join('&')

export const url = (name, { args = {}, queries = {} } = {}) => {
  const { scheme, definition } = match(urls, name) || {}
  if (!scheme) console.warn('No route scheme for name', name)
  if (!definition) console.warn('No route definition found for name', name)
  const replaced = Object
    .keys(args)
    .reduce((acc, k) => acc.replace(`:${k}`, args[k]), definition)
  const hasQueries = Object.keys(queries).length > 0
  return `${scheme.url}${replaced}${!hasQueries ? '' : '?' + stringify(queries)}`
}
