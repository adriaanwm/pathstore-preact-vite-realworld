import {Component} from 'preact'
import {equals} from 'ramda'

export const withPath = store => (name, path, defaultValue, options = {}) => C => {
  class WithState extends Component {
    constructor(props) {
      super(props)
      this._nameIsFunction = typeof name === 'function'
      this._pathIsFunction = typeof path === 'function'
      this._resubscribe()
    }
    componentWillUnmount () {
      this._unsubscribe()
    }

    _resubscribe () {
      const isInit = !this._unsubscribe
      if (!isInit && !this._pathIsFunction) return
      const currentPath = this._pathIsFunction ? path(this.props) : path
      if (equals(currentPath, this._path)) return
      if (!isInit) {
        this._unsubscribe()
      }
      const currentValue = store.get(currentPath)
      const initialValue = options.override
        ? defaultValue : currentValue === undefined ? defaultValue : currentValue
      this._path = currentPath
      this._unsubscribe = store.subscribe(
        currentPath,
        () => {
          const storeValue = store.get(currentPath)
          if (!equals(storeValue, this.state._storeValue)) {
            this.setState({ _storeValue: storeValue })
          }
        }
      )
      if (isInit) {
        this.state = {
          _storeValue: initialValue
        }
      } else {
        if (!equals(initialValue, this.state._storeValue)) {
          this.setState({ _storeValue: initialValue })
        }
      }
    }

    componentDidUpdate () {
      this._resubscribe()
    }
    render() {
      const currentName = this._nameIsFunction ? name(this.props) : name
      return <C
        {...this.props}
        {...{
          [currentName]: this.state._storeValue,
          [`set${currentName[0].toUpperCase()}${currentName.slice(1)}`]: (...args) => store.set(this._path, ...args),
        }}
      />
    }
  }

  return WithState
}
