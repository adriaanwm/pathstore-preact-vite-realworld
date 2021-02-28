import {store} from '~/store'

const makeRange = (from, to) =>
  Array(to - from + 1).fill(0).map((_, i) => i + from)


export const Pagination = ({path, count}) => {
  const [limit] = store.use([...path, 'limit'], 10)
  const [offset] = store.use([...path, 'offset'], 0)
  const currentPage = Math.floor(offset / limit) + 1
  const pages = Math.ceil(count / limit)
  const range = makeRange(1, pages)
  return (
    <nav>
      <ul className='pagination'>
        {
          range.map(p =>
            <li
              className={ p === currentPage ? 'page-item active' : 'page-item' }
              onClick={(ev) => {
                ev.preventDefault()
                store.set([...path, 'offset'], (p - 1) * limit)
                window.scrollTo(0, 0)
              }}
              key={p.toString()}
            >
              <a className='page-link' href=''>{p}</a>
            </li>
          )
        }
      </ul>
    </nav>
  )
}
