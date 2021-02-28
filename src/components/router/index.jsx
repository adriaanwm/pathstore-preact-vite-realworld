import { urls } from '~/consts/urls'
import { url, match } from '~/utils/url'
import { store } from '~/store'
import { findDefinition } from './definitionMatch'

window.addEventListener('popstate', (ev) => {
  const scheme = urls[0]
  const path = ev.target.location.pathname + ev.target.location.search
  const match = findDefinition(scheme, path)
  if (!match) {
    console.warn('could not find definition for route', path)
    return
  }
  store.set(['route'], match)
})

export const routeTo = (path) => {
  const scheme = urls[0]
  const match = findDefinition(scheme, path)
  if (!match) {
    console.warn('could not find definition for route', path)
    return
  }
  window.history.pushState(null, null, path)
  store.set(['route'], match)
}

export const Link = ({ name, args, queries, ...props }) => {
  const href = url(name, { args, queries })
  return <a
    href={href}
    onClick={ev => {
      ev.preventDefault()
      const { definition } = match(urls, name) || {}
      if (definition) {
        window.history.pushState(null, null, href)
        store.set(['route'], {
          path: href,
          definition,
          args,
          queries
        })
      }
    }}
    {...props}
  />
}

export const ActiveLink = ({ name, args, queries, className = '', ...props }) => {
  const [currentPath] = store.use(['route', 'path'])
  const href = url(name, { args, queries })
  const active = currentPath === href
  return <Link
    args={args}
    queries={queries}
    className={`${className} ${active ? 'active' : ''}`}
    name={name}
    {...props}
  />
}

const findMatch = (definition, routes) =>
  routes.find(([defs, component]) =>
    typeof defs === 'string'
      ? defs === definition
      : findMatch(definition, defs)
  )

export const Router = ({ routes, NotFound }) => {
  const [route] = store.use(['route'])
  const { definition, args, queries } = route
  const match = findMatch(definition, routes)
  if (!match) return <NotFound />
  const Component = match[1]
  return <Component {...args} {...queries} />
}
