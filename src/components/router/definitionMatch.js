import { urls } from '~/consts/urls'

const segmentize = url => {
  return url.replace(/(^\/+|\/+$)/g, '').split('/')
}

// route matching logic, taken from preact-router
export const definitionMatch = (url, definition) => {
  const reg = /(?:\?([^#]*))?(#.*)?$/
  const c = url.match(reg)
  const matches = { args: {}, queries: {} }
  let ret
  if (c && c[1]) {
    const p = c[1].split('&')
    for (let i = 0; i < p.length; i++) {
      const r = p[i].split('=')
      matches.queries[decodeURIComponent(r[0])] = decodeURIComponent(
        r.slice(1).join('=')
      )
    }
  }
  url = segmentize(url.replace(reg, ''))
  definition = segmentize(definition || '')
  const max = Math.max(url.length, definition.length)
  for (let i = 0; i < max; i++) {
    if (definition[i] && definition[i].charAt(0) === ':') {
      const param = definition[i].replace(/(^:|[+*?]+$)/g, '')
      const flags = (definition[i].match(/[+*?]+$/) || {})[0] || ''
      const plus = ~flags.indexOf('+')
      const star = ~flags.indexOf('*')
      const val = url[i] || ''
      if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
        ret = false
        break
      }
      matches.args[param] = decodeURIComponent(val)
      if (plus || star) {
        matches.args[param] = url
          .slice(i)
          .map(decodeURIComponent)
          .join('/')
        break
      }
    } else if (definition[i] !== url[i]) {
      ret = false
      break
    }
  }
  if (ret === false) return false
  return matches
}

export const findDefinition = (scheme, path) => {
  const routes = scheme.routes
  return Object.keys(routes).reduce((acc, name) => {
    if (acc) return acc
    const m = definitionMatch(path, routes[name])
    if (!m) return
    return {
      path,
      args: m.args,
      queries: m.queries,
      name: name,
      definition: routes[name]
    }
  }, null)
}

export const currentRoute = () => {
  const scheme = urls[0]
  const path = window.location.pathname + window.location.search
  return findDefinition(scheme, path)
}
