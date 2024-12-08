const { Fragment } = require('react')
const NavBarListPost = require('./components/main/navbar/list_post.jsx')
const Categories = (props) => {
  const CategoryList = (props) => {
    const elements = []
    const { site, url_for } = props
    site.categories.sort('path').each((category) => {
      elements.push(
        <div>
          <a
            className={category.parent ? 'cat child' : 'cat'}
            href={url_for(category.path)}
          >
            <span className='name'>{category.name}</span>
            <span className='badge'>({category.posts.length})</span>
          </a>
        </div>
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
  if (site.categories.length) {
    page.title = __('btn.categories')
    page.layout = 'categories'
    return (
      <Fragment>
        <NavBarListPost {...props} />
        <div className='post-list'>
          <article className={scroll_reveal()} id='cats'>
            <CategoryList {...props} />
          </article>
        </div>
      </Fragment>
    )
  } else {
    return <></>
  }
}

module.exports = Categories
