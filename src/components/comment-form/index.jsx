import {TextArea, Button, onSubmit, ListErrors} from '~/components/form'
import {url} from '~/utils/url'
import {store} from '~/store'

export const CommentForm = ({slug, me}) => {
  const [_, {setListItem}] = store.useRequest(url('api.articleComments', {args: {slug}}), {shouldFetch: false})
  const form = {
    name: 'Comment',
    url: url('api.articleComments', {args: {slug}}),
    clearOnSuccess: true,
    prepareData: comment => ({comment}),
    onSuccess: ({comment}) => {
      setListItem(comment)
    },
    onError: (err) => {
      console.error('comment error', err)
    }
  }
  return (
    <div>
      <ListErrors formName={form.name} />
      <form className="card comment-form" onSubmit={onSubmit(form)}>
        <div className="card-block">
          <TextArea className="form-control"
            name='body'
            formName={form.name}
            placeholder="Write a comment..."
            rows="3">
          </TextArea>
        </div>
        <div className="card-footer">
          <img
            src={me.image}
            className="comment-author-img"
            alt={me.username} />
          <button
            className="btn btn-sm btn-primary"
            type="submit">
            Post Comment
          </button>
        </div>
      </form>
    </div>
  )
}
