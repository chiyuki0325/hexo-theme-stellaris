const {Fragment} = require('react');

// https://github.com/tea3/hexo-related-popular-posts/wiki/More-Settings#customize-html
// Ported to JSX
const RelatedPostsHelper = props => {
    const title = props.title;
    const json = props.json.json;
    const cls = props.json.class;
    const {site, config, theme, strip_html, truncate} = props;
    if (json === undefined || json.length === 0) {
        return '';
    }
    const cfg = theme.article.related_posts;
    if (cfg.enabled !== true) return;

    const elements = [
        <section className='header' key='header'>
            <div className='title cap theme'>{title}</div>
        </section>
    ];

    const returnElements = [];

    const posts = site.posts;
    const root = config.root;

    function listItem(obj) {
        let p = posts.filter(function (p) {
            return root + p.path === obj.path;
        });
        if (p && p.length > 0) {
            p = p.data[0];
        }
        let exl = "";
        if (obj.excerpt) {
            exl = strip_html(obj.excerpt);
        } else if (obj.description) {
            exl = obj.description;
        } else {
            exl = truncate(strip_html(p.content), {length: 120});
        }
        return (
            <a className='item' href={obj.path} title={obj.title} key={obj.path}>
                <Fragment>
                    <span className='title'>{obj.title}</span>
                    <span className='excerpt'>
                        {
                            exl.charCodeAt(0) === 10 ? "此文暂无简介" : exl
                        }
                        {
                            exl.charCodeAt(0) === 10 ? <Fragment><br/><br/><br/></Fragment> : <></>
                        }
                    </span>
                </Fragment>
            </a>
        )
    }

    if (json.length > 0) {
        for (let i = 0; i < json.length; i++) {
            returnElements.push(listItem(json[i]));
        }
    }
    elements.push(
        <section className='body' key='body'>
            <div className={cls}>
                {returnElements}
            </div>
        </section>
    );
    return elements;
}
const RelatedPosts = props => {
    const {theme, page, __, popular_posts_json} = props;
    if (theme.article.related_posts.enabled && !(theme.article.related_posts.disable_at_server_render && theme.server_render.status)) {
        return (
            <div className="related-wrap reveal"
                 id="related-posts">
                <RelatedPostsHelper title={__('meta.related_posts')} json={
                    popular_posts_json({
                        maxCount: theme.article.related_posts.max_count,
                        ulClass: 'related-posts',
                        PPMixingRate: 0.2,
                        isImage: true,
                        isExcerpt: true
                    }, page)
                } {...props} />
            </div>
        )
    } else {
        return <></>;
    }
}

module.exports = RelatedPosts;
