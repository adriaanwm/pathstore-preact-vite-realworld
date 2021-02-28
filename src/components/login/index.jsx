import {routeTo, Link} from '~/components/router'
import {TextInput, Button, onSubmit, ListErrors} from '~/components/form'
import {url} from '~/utils/url'
import {store} from '~/store'

export const Login = () => {
  const form = {
    name: 'Login',
    url: url('api.login'),
    clearOnSuccess: true,
    isAuthenticated: false,
    prepareData: user => ({user}),
    onSuccess: ({user: {token}}) => {
      store.set(['token'], token)
      localStorage.setItem('token', token)
      routeTo(url('home'))
    },
    onError: (data) => {
      console.log('error', data)
    },
  }
  return (
    <div className='auth-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>Sign In</h1>
            <p className='text-xs-center'>
              <Link name='register'>
                Need an account?
              </Link>
            </p>

            <ListErrors formName={form.name} />

            <form onSubmit={onSubmit(form)}>
              <fieldset>
                <fieldset className='form-group'>
                  <TextInput
                    name='email'
                    formName={form.name}
                    className='form-control form-control-lg'
                    type='email'
                    placeholder='Email' />
                </fieldset>
                <fieldset className='form-group'>
                  <TextInput
                    name='password'
                    formName={form.name}
                    className='form-control form-control-lg'
                    type='password'
                    placeholder='Password' />
                </fieldset>
                <Button
                  formName={form.name}
                  className='btn btn-lg btn-primary pull-xs-right'
                  type='submit'>
                  Sign in
                </Button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
