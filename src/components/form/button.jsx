import { store } from '~/store'

export const Button = ({ formName, children, ...props }) => {
  const [isSubmitting] = store.use(['forms', formName, 'isSubmitting'])
  return <button
    disabled={isSubmitting}
    type='submit'
    {...props}
  >
    {/* {isSubmitting ? <LoadingIndicator /> : children} */}
    {children}
  </button>
}
