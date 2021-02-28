import {store} from '~/store'
import {url} from '~/utils/url'
import {Link, routeTo} from '~/components/router'

export const ArticleActions = ({article}) => {
  const [isDeleting, setIsDeleting] = store.use(
    ['DeleteArticle', article.id, 'submitting'],
    false,
    {cleanup: true, override: true}
  )
  const onClickDelete = () => {
    fetch(
      url('api.article', {args: {slug: article.slug}}),
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${store.get(['token'])}`,
        }
      }
    )
      .then(() => {
        routeTo(url('home'))
      })
      .catch((err) => {
        console.error('Unabel to delete', err)
      })
  }
  return (
    <span>
      <Link
        name='editorWithSlug'
        args={{slug: article.slug}}
        className='btn btn-outline-secondary btn-sm'>
        <i className='ion-edit'></i> Edit Article
      </Link>
      <button className='btn btn-outline-danger btn-sm' onClick={onClickDelete} disabled={isDeleting} >
        <i className='ion-trash-a'></i> Delete Article
      </button>
    </span>
  )
}
