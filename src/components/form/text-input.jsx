import { store } from '~/store'

export const TextInput = ({ name, formName, ...props }) => {
  const [value, setValue] = store.use(['forms', formName, 'values', name])
  return <input
    type='text'
    onInput={ev => {
      ev.preventDefault()
      setValue(ev.target.value)
    }}
    value={value}
    {...props}
  />
}
