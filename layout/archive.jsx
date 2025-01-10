const { Fragment } = require('react')
const Index = require('./index.jsx')
const NavBarListPost = require('./components/main/navbar/list_post.jsx')
const Posts = (props) => {
  const Year = (props) => {
    const YearPosts = (props) => {
      const Post = (props) => {
        const { config, url_for, post, date } = props
        return (
          <div className='archive-list'>
            <a className='post fs14' href={url_for(post.link || post.path)}>
              <time>{date(post.date, 'MM-DD')}</time>
              <span>
                {post.title ? post.title : date(post.date, config.date_format)}
              </span>
            </a>
          </div>
        )
      }
      const { site, date } = props
      const elements = []
      site.posts
        .sort('date', -1)
        .filter((post) => {
          post.year = date(post.date, 'YYYY')
          return post.year === year
        })
        .each((post) => {
          elements.push(<Post post={post} {...props} key={post.path} />)
        })
      return elements
    }
    const { scroll_reveal, year } = props
    return (
      <article className={scroll_reveal()} id='archive' key={year}>
        <div className='archive-header h4'>{year}</div>
        <YearPosts {...props} />
      </article>
    )
  }

  const { site, date } = props
  const elements = []

  const years = []
  site.posts.sort('date', -1).each(function (post) {
    post.year = date(post.date, 'YYYY')
    if (
      post.year &&
      years.includes(post.year) === false &&
      (post.title || post.date)
    ) {
      years.push(post.year)
    }
  })

  years.forEach((year) => {
    elements.push(<Year year={year} {...props} key={year} />)
  })

  return elements
}

const Archive = (props) => {
  let { page } = props
  const { __, is_category, is_tag } = props
  page.robots = 'noindex,follow'
  if (page.menu_id === undefined) {
    page.menu_id = 'post'
  }
  if (page.posts && (is_category() || is_tag())) {
    return <Index {...props} />
  } else {
    // archive page
    page.menu_id = 'archive'
    page.title = __('btn.archives')
    return (
      <Fragment>
        <NavBarListPost {...props} />
        <div className='post-list'>
          <Posts {...props} />
        </div>
      </Fragment>
    )
  }
}

module.exports = Archive
