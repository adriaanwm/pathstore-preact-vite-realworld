import {Link} from '~/components/router'
import {CommentForm} from '~/components/comment-form'

const Comment = ({comment}) =>
  <div className='card'>
    <div className='card-block'>
      <p className='card-text'>{comment.body}</p>
    </div>
    <div className='card-footer'>
      <Link
        name='profile'
        args={{username: comment.author.username}}
        className='comment-author'>
        <img src={comment.author.image} className='comment-author-img' alt={comment.author.username} />
      </Link>
      &nbsp;
      <Link
        name='profile'
        args={{username: comment.author.username}}
        className='comment-author'>
        {comment.author.username}
      </Link>
      <span className='date-posted'>
        {new Date(comment.createdAt).toDateString()}
      </span>
      {/* <DeleteButton show={show} slug={props.slug} commentId={comment.id} /> */}
    </div>
  </div>

export const Comments = ({comments, me, slug}) => {
  return (
    <div className='col-xs-12 col-md-8 offset-md-2'>

      {me && <CommentForm slug={slug} me={me} />}

      {!me &&
        <p>
          <Link name='login'>Sign in</Link>
          &nbsp;or&nbsp;
          <Link name='register'>sign up</Link>
          &nbsp;to add comments on this article.
        </p>
      }


      <div>
        {
          comments.map(comment => {
            return (
              <Comment
                comment={comment}
                me={me}
                slug={slug}
                key={comment.id} />
            )
          })
        }
      </div>
    </div>
  )
}

