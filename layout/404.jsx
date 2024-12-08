const Comments = require('./components/plugins/comments/layout.jsx')
const ErrorPage = (props) => {
  const { config, theme, url_for, __ } = props
  let page = props.page
  page.menu_id = '404'
  page.layout = '404'
  page.comment_title = ''
  page.header = 'auto'
  page.robots = 'none'
  return (
    <article className='md-text error-page'>
      <h1>
        <img id='error' src={url_for('/images/404.svg')} alt='404' />
      </h1>
      <p className='what'>
        <strong>{__('page.error.what')}</strong>
      </p>
      <p className='why'>{__('page.error.why')}</p>
      <br />
      <a className='button theme' id='back' href={config.root}>
        {__('page.error.action')}
      </a>
      {theme.comments.enabled_in_404 ? <Comments {...props} /> : <></>}
    </article>
  )
}

module.exports = ErrorPage
