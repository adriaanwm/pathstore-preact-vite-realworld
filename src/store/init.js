import {currentRoute} from '~/components/router/definitionMatch'

// starting point for the store,
// call this right after creating store,
// and when user logs out.
export const createInit = store => () =>
  store.set([], {
    route: currentRoute() || {},
    token: localStorage.getItem('token')
  })
