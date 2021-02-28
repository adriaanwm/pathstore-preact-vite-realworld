import {onSubmit} from '~/components/form'
import {url} from '~/utils/url'
import {store} from '~/store'

export const FollowButton = ({user}) => {
  const [_, {set}] = store.useRequest(url(
    'api.profile',
    {args: {username: user.username}}
  ), {shouldFetch: false})
  const form = {
    name: 'Follow',
    url: url('api.profileFollow', {args: {username: user.username}}),
    onSuccess: () => {
      set({user: {...user, following: !user.following}})
    },
    method: user.following ? 'DELETE' : 'POST'
  }
  return (
    <button
      className={`btn btn-sm action-btn ${user.following ? 'btn-secondary' : 'btn-outline-secondary'}`}
      onClick={onSubmit(form)}>
      <i className='ion-plus-round'></i>
      &nbsp;
      {user.following ? 'Unfollow' : 'Follow'} {user.username}
    </button>
  )
}
