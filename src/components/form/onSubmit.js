import { store } from '~/store'
import { API_URL } from '~/consts'

export const fetch = (url, { data, method, headers }) => {
  let result
  return window.fetch(url, {
    method,
    headers,
    body: JSON.stringify(data)
  })
    .then(res => {
      result = res
      if (method !== 'DELETE') { return res.json() }
      return {}
    })
    .then(res => {
      if (result.status > 299) {
        throw { result, json: res }
      }
      return res
    })
}

const ConduitOnSubmit = ({
  name,
  url,
  method = 'POST',
  validations = {},
  isAuthenticated = true,
  clearOnSuccess = true,
  onSuccess,
  onError,
  prepareData
}) => (ev) => {
  ev.preventDefault()
  let data = store.get(['forms', name, 'values']) || {}
  data = prepareData ? prepareData(data) : data
  const token = isAuthenticated ? store.get(['token']) : false
  store.set(['forms', name, 'isSubmitting'], true)
  fetch(url, {
    data,
    method,
    headers: {
      'Content-Type': 'application/json',
      ...!token ? {} : {
        'Authorization': `Token ${store.get(['token'])}`,
      }
    }
  })
    .then((res) => {
      clearOnSuccess && store.set(['forms', name], null)
      onSuccess && onSuccess(res)
    })
    .catch(err => {
      console.error('Error submitting form', name, err)
      if (err.json) {
        store.set(['forms', name, 'errors'], err.json.errors)
      }
      onError && onError(err)
    })
    .finally(() => store.set(['forms', name, 'isSubmitting'], false))
}

export const onSubmits = [
  {
    match: ({ url }) => url.includes(API_URL),
    onSubmit: ConduitOnSubmit
  }
]

export const onSubmit = (args) => ev => {
  const { onSubmit: matchedOnSubmit } = onSubmits.find(({ match }) => match(args))
  if (!matchedOnSubmit) {
    console.log('No matching onSubmit found.', args)
  }
  return matchedOnSubmit(args)(ev)
}
