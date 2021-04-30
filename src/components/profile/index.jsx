import {useEffect} from 'preact/hooks'
import {store} from '~/store'
import {url} from '~/utils/url'
import {Articles} from '~/components/articles'
import {Link} from '~/components/router'
import {FollowButton} from '~/components/follow-button'

export const Profile = () => {
  const [token] = store.use(['token'])
  const [me] = store.useRequest(token ? url('api.me') : null)
  const [routeDef] = store.use(['route', 'definition'])
  const isFavorites = routeDef.includes('/favorites')
  const [username] = store.use(['route', 'args', 'username'])
  const [profile] = store.useRequest(url('api.profile', {args: {username}}))
  useEffect(() => {
    store.set(
      ['articlesUrl', username], 
      isFavorites
      ? {name: 'api.articles', queries: {limit: 5, offset: 0, favorited: username}}
      : {name: 'api.articles', queries: {limit: 5, offset: 0, author: username}}
    )
  }, [isFavorites, username])
  if (!profile) return null
  return (
    <div className='profile-page'>

      <div className='user-info'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-10 offset-md-1'>

              <img src={profile.image} className='user-img' alt={profile.username} />
              <h4>{profile.username}</h4>
              <p>{profile.bio}</p>

              {me && me.username === username &&
                <Link
                  name="settings"
                  className="btn btn-sm btn-outline-secondary action-btn"
                >
                  <i className="ion-gear-a"></i> Edit Profile Settings
                </Link>
              }


              {((me && me.username !== username) || !token) &&
                <FollowButton user={profile} />
              }

            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='row'>

          <div className='col-xs-12 col-md-10 offset-md-1'>

            <div className='articles-toggle'>
              <ul className='nav nav-pills outline-active'>
                <li className='nav-item'>
                  <Link
                    className={`nav-link ${!isFavorites ? 'active' : ''}`}
                    name={'profile'}
                    args={{username: profile.username}} >
                    My Articles
                  </Link>
                </li>

                <li className='nav-item'>
                  <Link
                    className={`nav-link ${isFavorites ? 'active' : ''}`}
                    name='profileFavorites'
                    args={{username: profile.username}} >
                    Favorited Articles
                  </Link>
                </li>
              </ul>
            </div>

            <Articles namespace={username} />

          </div>

        </div>
      </div>

    </div>
  )
}
