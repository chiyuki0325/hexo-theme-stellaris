const { Fragment } = require('react')
const WikiCover = (props) => {
  const { theme, page, __, scroll_reveal } = props
  let proj = theme.wiki.tree[page.wiki]
  if (proj === undefined) {
    return <></>
  }
  if (proj.homepage.path !== page.path) {
    return <></>
  }
  if (proj.cover === undefined || proj.cover === false || proj.cover === '[]') {
    return <></>
  }
  let cover = proj.cover
  let logo = proj.logo
  let title = proj.title || page.title
  let desc = proj.description || page.description
  if (cover === true) {
    cover = ['logo', 'title', 'description']
  }
  return (
    <Fragment>
      <div className={'l_cover wiki' + scroll_reveal()}>
        <article className='cover-wrap md-text'>
          {(() => {
            if (logo && logo.src && cover.includes('logo')) {
              let imageElement
              if (logo.large) {
                imageElement = (
                  <img src={logo.src} height={logo.large} alt={title} />
                )
              } else {
                imageElement = <img src={logo.src} alt={title} />
              }
              return <div className='preview'>{imageElement}</div>
            }
          })()}
          {(() => {
            if (title && cover.includes('title')) {
              return (
                <div className='cover-title'>
                  <span>{title}</span>
                </div>
              )
            }
          })()}
          {(() => {
            if (desc && cover.includes('description')) {
              return <div className='description'>{desc}</div>
            }
          })()}
          <div className='start-wrap'>
            <a className='button theme start' href='#start'>
              {proj.start || __('btn.getting_started')}
            </a>
          </div>
        </article>
      </div>
      <hr />
    </Fragment>
  )
}

module.exports = WikiCover
