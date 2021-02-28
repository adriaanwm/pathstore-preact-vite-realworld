import {store} from '~/store'
import {url} from '~/utils/url'
import {Link, routeTo} from '~/components/router'
import {Pagination} from '~/components/pagination'
import {onSubmit} from '~/components/form'

const ArticlePreview = ({article, updateArticle, isAuthenticated}) => {
  const {
    author,
    tagList,
    createdAt,
    favorited,
    favoritesCount,
    slug,
    title,
    description
  } = article
  return (
    <div className='article-preview'>
      <div className='article-meta'>
        <Link name='profile' args={{username: `@${author.username}`}} >
          <img src={author.image} alt={author.username} />
        </Link>

        <div className='info'>
          <Link className='author' name='profile' args={{username: `@${author.username}`}}>
            {author.username}
          </Link>
          <span className='date'>
            {new Date(createdAt).toDateString()}
          </span>
        </div>

        <div className='pull-xs-right'>
          <button className={`btn btn-sm ${favorited ? 'btn-primary' : 'btn-outline-primary'}`} onClick={(ev) => {
            if (!isAuthenticated) {
              routeTo(url('login'))
              return
            }
            onSubmit({
              name: `Follow${author.username}`,
              url: url('api.articleFavorite', {args: {slug}}),
              method: favorited ? 'DELETE' : 'POST',
              onSuccess: () => {
                updateArticle({
                  ...article,
                  favorited: !favorited,
                  favoritesCount: favoritesCount + (favorited ? -1 : 1)
                })
              }
            })(ev)
          }}>
            <i className='ion-heart'></i> {favoritesCount}
          </button>
        </div>
      </div>

      <Link name='article' args={{slug}} className='preview-link'>
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
        <ul className='tag-list'>
          {
            tagList.map(tag => {
              return (
                <li className='tag-default tag-pill tag-outline' key={tag}>
                  {tag}
                </li>
              )
            })
          }
        </ul>
      </Link>
    </div>
  )
}


export const Articles = ({namespace}) => {
  const [token] = store.use(['token'])
  const [{name, queries} = {}] = store.use(['articlesUrl', namespace])
  const articlesUrl = name ? url(name, {queries}) : null
  const [{articles, articlesCount} = {}, {setListItem}] = store.useRequest(articlesUrl)
  return (
    !articles ? <div className='article-preview'>Loading...</div>
    : !articles.length ? (
      <div className='article-preview'>
        No articles are here... yet.
      </div>
    )
    : (
      <div>
        {
          articles.map(article =>
            <ArticlePreview isAuthenticated={!!token} article={article} key={article.slug} updateArticle={(article) => setListItem(article, 'slug')} />
          )
        }
        <Pagination path={['articlesUrl', namespace, 'queries']} count={articlesCount} />

      </div>
    )
  )
}

        // <ListPagination
        //   pager={props.pager}
        //   articlesCount={props.articlesCount}
        //   currentPage={props.currentPage} />
