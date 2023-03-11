const {Fragment} = require('react');
const Breadcrumb = require('./components/main/navbar/breadcrumb.jsx');
const MathJax = require('./mathjax.jsx');
const ArticleFooter = require('./components/main/article/article_footer.jsx');
const PostTitle = props => {
    const {page} = props;
    const title = page.h1 || page.title;
    if (title && title.length > 0) {
        return <h1 className="article-title"><span>{title}</span></h1>;
    } else {
        return <></>;
    }
}
const Post = props => {
    const {scroll_reveal, partial} = props;
    let {page} = props;
    if (page.menu_id === undefined) {
        page.menu_id = 'post';
    }
    if (page.header === undefined) {
        page.header = 'auto';
    }
    return (
        <Fragment>
            {(() => {
                if (page.mathjax === true) return (<MathJax {...props}/>)
            })()}
            <Breadcrumb {...props}/>
            <article className={`md-text content ${page.layout} ${page.indent ? 'indent' : ''} ${scroll_reveal()}`}
                     id={page.title}>
                <PostTitle {...props}/>
                <div dangerouslySetInnerHTML={{__html: page.content}}/>
                <ArticleFooter {...props}/>
            </article>
            <div dangerouslySetInnerHTML={{__html: partial('_partial/main/article/read_next')}}/>
            <div dangerouslySetInnerHTML={{__html: partial('_partial/main/article/related_posts')}}/>
            <div dangerouslySetInnerHTML={{__html: partial('_partial/plugins/comments/layout')}}/>
        </Fragment>
    )
}

module.exports = Post;