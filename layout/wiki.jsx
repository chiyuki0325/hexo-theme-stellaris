const { Fragment } = require('react')
const Index = require('./index.jsx')
const Breadcrumb = require('./components/main/navbar/breadcrumb.jsx')
const ArticleFooter = require('./components/main/article/article_footer.jsx')
const ReadNext = require('./components/main/article/read_next.jsx')
const Comments = require('./components/plugins/comments/layout.jsx')
const WikiTitle = (props) => {
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
const Wiki = (props) => {
  const { scroll_reveal, partial, __ } = props
  let { page } = props
  if (page.menu_id === undefined) {
    page.menu_id = 'wiki'
  }
  if (page.layout === undefined) {
    page.layout = 'wiki_index'
  }
  if (page.title === undefined) {
    if (page.tag_name) {
      page.title = page.tag_name
    } else {
      page.title = __('btn.wiki')
    }
  }
  if (page.layout === 'wiki_index') {
    return <Index {...props} />
  } else {
    if (page.header === undefined) {
      page.header = 'auto'
    }
    return (
      <Fragment>
        <Breadcrumb {...props} />
        <article
          className={`md-text content ${page.layout} ${page.indent ? 'indent' : ''} ${scroll_reveal()}`}
          id={page.title}
        >
          <WikiTitle {...props} />
          <div dangerouslySetInnerHTML={{ __html: page.content }} />
          <ArticleFooter {...props} />
        </article>
        <ReadNext {...props} />
        <Comments {...props} />
      </Fragment>
    )
  }
}

module.exports = Wiki
