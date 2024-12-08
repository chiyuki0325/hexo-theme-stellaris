const Breadcrumb = require('./components/main/navbar/breadcrumb.jsx')
const NavBarListPost = require('./components/main/navbar/list_post.jsx')
const ArticleFooter = require('./components/main/article/article_footer.jsx')
const Comments = require('./components/plugins/comments/layout.jsx')
const PageTitle = (props) => {
  const { page } = props
  const title = page.h1 ?? page.title
  if (title && title.length > 0) {
    return (
      <h1 className='article-title'>
        <span>{title}</span>
      </h1>
    )
  } else {
    return <></>
  }
}
const Page = (props) => {
  const { scroll_reveal, partial } = props
  let { page } = props
  if (page.menu_id === undefined) {
    page.menu_id = 'post'
  }
  if (page.header === undefined) {
    page.header = 'auto'
  }
  const elements = []
  if (page.post_list) {
    elements.push(<NavBarListPost {...props} />)
  }
  if (page.h1 || page.title || (page.content && page.content.length > 0)) {
    elements.push(<Breadcrumb {...props} />)
  }
  elements.push(
    <article
      className={`md-text content ${page.layout} ${page.indent ? 'indent' : ''} ${scroll_reveal()}`}
    >
      {(page.h1 ?? page.title) ? <PageTitle {...props} /> : <></>}
      {page.content ? (
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      ) : (
        <></>
      )}
      <ArticleFooter {...props} />
    </article>
  )
  elements.push(<Comments {...props} />)
  return elements
}

module.exports = Page
