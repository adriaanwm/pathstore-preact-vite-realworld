import {store} from '~/store'
import {url} from '~/utils/url'

export const Tags = ({namespace}) => {
  const [tags] = store.useRequest(url('api.tags'))
  if (!tags) return <div>Loading Tags...</div>
  return (
    <div className='tag-list'>
      {
        tags.map(tag =>
          <a
            href=''
            className='tag-default tag-pill'
            key={tag}
            onClick={(ev) => {
              ev.preventDefault()
              store.set(['articlesUrl', namespace, 'queries', 'tag'], tag, {noPublish: true})
              store.set(['articlesUrl', namespace, 'name'], 'api.articles')
            }}>
            {tag}
          </a>
        )
      }
    </div>
  )
}

