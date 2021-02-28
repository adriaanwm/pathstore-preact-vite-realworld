import {useInitialData, TextArea, TextInput, Button, onSubmit, ListErrors} from '~/components/form'
import {routeTo} from '~/components/router'
import {store} from '~/store'
import {url} from '~/utils/url'

const TagInput = (props) => {
  const [value, setValue] = store.use(['newTag'], '')
  const [tags, setTags] = store.use(['forms', 'Editor', 'values', 'tagList'], [])
  return <input
    onInput={ev => {
      ev.preventDefault()
      setValue(ev.target.value.toLowerCase())
    }}
    onKeyDown={ev => {
      if (ev.key === ' ' || ev.key === 'Enter') {
        ev.preventDefault()
      }
      if (ev.key === 'Enter' && value.length && !tags.includes(value)) {
        setTags([...tags, value])
        setValue('')
        return
      }
    }}
    value={value}
    {...props}
  />
}

export const Editor = () => {
  const [slug] = store.use(['route', 'args', 'slug'])
  const [article] = store.useRequest(slug ? url('api.article', {args: {slug}}) : null)
  const [tags, setTags] = store.use(['forms', 'Editor', 'values', 'tagList'])
  const form = {
    name: 'Editor',
    url: slug ? url('api.article', {args: {slug}}) : url('api.articles'),
    method: slug ? 'PUT' : 'POST',
    prepareData: article => ({article}),
    onSuccess: ({article: {slug}}) => {
      routeTo(url('article', {args: {slug}}))
    }
  }
  useInitialData(
    form.name,
    slug ? article : {tagList: []}
  )
  if (slug && !article) return 'Loading...'
  return (
    <div className='editor-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-10 offset-md-1 col-xs-12'>

            <ListErrors formName={form.name}></ListErrors>

            <form onSubmit={onSubmit(form)}>
              <fieldset>

                <fieldset className='form-group'>
                  <TextInput
                    name='title'
                    formName={form.name}
                    className='form-control form-control-lg'
                    type='text'
                    placeholder='Article Title' />
                </fieldset>

                <fieldset className='form-group'>
                  <TextInput
                    name='description'
                    formName={form.name}
                    className='form-control'
                    type='text'
                    placeholder={`What's this article about?`} />
                </fieldset>

                <fieldset className='form-group'>
                  <TextArea
                    name='body'
                    formName={form.name}
                    className='form-control'
                    rows='8'
                    placeholder='Write your article (in markdown)'>
                  </TextArea>
                </fieldset>

                <fieldset className='form-group'>
                  <TagInput
                    className='form-control'
                    placeholder='Enter tags'
                  />
                  <div className='tag-list'>
                    {
                      (tags || []).map(tag => {
                        return (
                          <span className='tag-default tag-pill' key={tag}>
                            <i  className='ion-close-round'
                              onClick={() => {
                                setTags(tags.filter(t => t !== tag))
                              }}>
                            </i>
                            {tag}
                          </span>
                        );
                      })
                    }
                  </div>
                </fieldset>

                <Button
                  formName={form.name}
                  className='btn btn-lg pull-xs-right btn-primary'
                >
                  Publish Article
                </Button>

              </fieldset>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

