import { useEffect } from 'preact/hooks'
import { store } from '~/store'

export const useInitialData = (formName, data) => {
  useEffect(() => {
    if (!data) return
    store.set(['forms', formName, 'values'], data)
  }, [formName, !data])
}
