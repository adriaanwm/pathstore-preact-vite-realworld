import {store} from '~/store'

export const ListErrors = ({formName}) => {
  const [errors] = store.use(['forms', formName, 'errors'])
  return !errors ? null : (
    <ul className="error-messages">
      {
        Object.keys(errors).map(key => {
          return (
            <li key={key}>
              {key} {errors[key]}
            </li>
          );
        })
      }
    </ul>
  )
}

