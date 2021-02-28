import { API_URL } from '~/consts'

export const urls = [
  {
    namespace: '',
    url: '',
    routes: {
      home: '/',
      login: '/login',
      register: '/register',
      editor: '/editor',
      editorWithSlug: '/editor/:slug',
      article: '/article/:slug',
      settings: '/settings',
      profileFavorites: '/:username/favorites',
      profile: '/:username'
    }
  },
  {
    namespace: 'api',
    url: API_URL,
    routes: {
      me: '/user',
      login: '/users/login',
      register: '/users',
      tags: '/tags',
      feed: '/articles/feed',
      articles: '/articles',
      article: '/articles/:slug',
      articleFavorite: '/articles/:slug/favorite',
      articleComments: '/articles/:slug/comments',
      profile: '/profiles/:username',
      profileFollow: '/profiles/:username/follow'
    }
  }
]

