const { Fragment } = require('react')
const NavBarListPost = require('./components/main/navbar/list_post.jsx')
const Tags = (props) => {
  const TagList = (props) => {
    const elements = []
    const { site, url_for } = props
    site.tags.sort('length', -1).each((tag) => {
      elements.push(
        <a className='tag' href={url_for(tag.path)}>
          <span className='name'>{tag.name}</span>
        </a>
      )
    })
    return elements
  }

  const { site, scroll_reveal, __ } = props
  let { page } = props
  page.robots = 'noindex,follow'
  if (page.menu_id === undefined) {
    page.menu_id = 'post'
  }
  if (site.tags.length) {
    page.title = __('btn.tags')
    page.layout = 'tags'
    return (
      <Fragment>
        <NavBarListPost {...props} />
        <div className='post-list'>
          <article className={scroll_reveal()} id='tags'>
            <TagList {...props} />
          </article>
        </div>
      </Fragment>
    )
  } else {
    return <></>
  }
}

module.exports = Tags
