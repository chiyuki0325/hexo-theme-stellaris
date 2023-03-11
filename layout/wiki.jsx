const {Fragment} = require('react');
const Index = require('./index.jsx');
const Breadcrumb = require('./components/main/navbar/breadcrumb.jsx');
const MathJax = require('./mathjax.jsx');
const WikiTitle = props => {
    const {page} = props;
    const title = page.h1 || page.title;
    if (title && title.length > 0) {
        return <h1 className="article-title"><span>{title}</span></h1>;
    } else {
        return <></>;
    }
}
const Wiki = props => {
    const {scroll_reveal, partial, __} = props;
    let {page} = props;
    if (page.menu_id === undefined) {
        page.menu_id = 'wiki';
    }
    if (page.layout === undefined) {
        page.layout = 'wiki_index';
    }
    if (page.title === undefined) {
        if (page.tagName) {
            page.title = page.tagName;
        } else {
            page.title = __('btn.wiki');
        }
    }
    if (page.layout === 'wiki_index') {
        return <Index {...props}/>
    } else {
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
                    <WikiTitle {...props}/>
                    <div dangerouslySetInnerHTML={{__html: page.content}}/>
                    <div dangerouslySetInnerHTML={{__html: partial('_partial/main/article/article_footer')}}/>
                </article>
                <div dangerouslySetInnerHTML={{__html: partial('_partial/main/article/read_next')}}/>
                <div dangerouslySetInnerHTML={{__html: partial('_partial/plugins/comments/layout')}}/>
            </Fragment>
        )
    }
}

module.exports = Wiki;