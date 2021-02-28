import {useEffect} from 'preact/hooks'
import {Articles} from '~/components/articles'
import {Tags} from '~/components/tags'
import {store} from '~/store'
import {withPath} from '~/store/with'

const Tab = ({active, name, children, urlName}) =>
  <li className='nav-item'>
    <a href=''
      className={active ? 'nav-link active' : 'nav-link'}
      onClick={(ev) => {
        ev.preventDefault()
        store.set(['articlesUrl', 'home'], {
          name: urlName,
          queries: {
            offset: 0,
            limit: 10
          }
        })
      }}>
      {children}
    </a>
  </li>

export const Home = () => {
  const [token] = store.use(['token'])
  const [tag] = store.use(['articlesUrl', 'home', 'queries', 'tag'])
  const [articlesUrl] = store.use(['articlesUrl', 'home'])
  const articlesUrlName = articlesUrl && articlesUrl.name

  useEffect(() => {
    store.set(['articlesUrl', 'home'], {
      name: (token && !tag) ? 'api.feed' : 'api.articles',
      queries: {
        offset: 0,
        limit: 10,
        ...tag ? {tag} : {}
      }
    })
  }, [])

  return (
    <div className='home-page'>
      {!token &&
        <div className='banner'>
          <div className='container'>
            <h1 className='logo-font'>conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>
      }
      <div className='container page'>
        <div className='row'>
          <div className='col-md-9'>
            <div className='feed-toggle'>
              <ul className='nav nav-pills outline-active'>
                {token && <Tab urlName='api.feed' active={articlesUrlName === 'api.feed'} name='feed' key='feed-tab' >Your Feed</Tab>}
                <Tab urlName='api.articles' active={articlesUrlName === 'api.articles' && !tag} name='all' key='all-tab' >Global Feed</Tab>
                {tag &&
                  <li className='nav-item'>
                    <a href='' className='nav-link active' >
                      <i className='ion-pound'></i> {tag}
                    </a>
                  </li>
                }
              </ul>
            </div>
            <Articles namespace='home' />
            {/*   pager={props.pager} */}
            {/*   articles={props.articles} */}
            {/*   loading={props.loading} */}
            {/*   articlesCount={props.articlesCount} */}
            {/*   currentPage={props.currentPage} /> */}
          </div>
          <div className='col-md-3'>
            <div className='sidebar'>
              <p>Popular Tags</p>
              <Tags namespace='home' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
