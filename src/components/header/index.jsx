import {compose} from 'ramda'
import {ActiveLink, Link} from '~/components/router'
import {store} from '~/store'
import {url} from '~/utils/url'

export const Header = ({}) => {
  const [token] = store.use(['token'])
  const [me] = store.useRequest(token && url('api.me'))
  return (
    <nav className='navbar navbar-light'>
      <div className='container'>
        <Link name='home' class='navbar-brand'>conduit</Link>

        {!token &&
          <ul className='nav navbar-nav pull-xs-right'>
            <li className='nav-item'>
              <ActiveLink name='home' className='nav-link'>
                Home
              </ActiveLink>
            </li>
            <li className='nav-item'>
              <ActiveLink name='login' className='nav-link'>
                Sign in
              </ActiveLink>
            </li>
            <li className='nav-item'>
              <ActiveLink name='register' className='nav-link'>
                Sign up
              </ActiveLink>
            </li>
          </ul>
        }
        {me &&
          <ul className='nav navbar-nav pull-xs-right'>
            <li className='nav-item'>
              <ActiveLink name='home' className='nav-link'>
                Home
              </ActiveLink>
            </li>
            <li className='nav-item'>
              <ActiveLink name='editor' className='nav-link'>
                <i className='ion-compose'></i>&nbsp;New Post
              </ActiveLink>
            </li>
            <li className='nav-item'>
              <ActiveLink name='settings' className='nav-link'>
              <i className='ion-gear-a'></i>&nbsp;Settings
              </ActiveLink>
            </li>
            <li className='nav-item'>
              <ActiveLink
                name='profile'
                args={{username: `@${me.username}`}}
                className='nav-link'>
                <img src={me.image} className='user-pic' alt={me.username} />
                {me.username}
              </ActiveLink>
            </li>
          </ul>
        }
      </div>
    </nav>
  )
}


