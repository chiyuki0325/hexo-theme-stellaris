const {Fragment} = require('react');
const Title = (props) => {
    const {page, theme, config, __} = props;
    if (page.seo_title) {
        return <title>{page.seo_title}</title>;
    }
    if (page.wiki) {
        let title;
        let proj = theme.wiki.projects[page.wiki];
        let wiki = (proj && proj.name) || page.wiki;
        if (page.title) {
            title = wiki + __('symbol.colon') + page.title + ' - ' + config.title;
        } else {
            title = wiki + ' - ' + config.title;
        }
        return <title>{title}</title>;
    } else {
        let title;
        if (page.title) {
            title = page.title + ' - ' + config.title;
        } else if (page.category) {
            title = __('btn.category') + __('symbol.colon') + page.category + ' - ' + config.title;
        } else if (page.tag) {
            title = __('btn.tag') + __('symbol.colon') + page.tag + ' - ' + config.title;
        }
        return <title>{title}</title>;
    }
}

const Description = (props) => {
    const {page, theme, config, truncate, strip_html} = props;
    if (theme.open_graph && theme.open_graph.enable) {
        return <></>;
    }
    if (page.layout === 'wiki' && page.wiki) {
        let proj = theme.wiki.projects[page.wiki];
        if (proj && proj.description) {
            return <meta name="description" content={proj.description}/>;
        }
    }
    if (page.description || page.excerpt || page.content) {
        return <meta name="description"
                     content={truncate(strip_html(page.description || page.excerpt || page.content), {length: 150})}/>;
    }
    return <meta name="description" content={config.description}/>;
}

const Robots = (props) => {
    const {is_home, page} = props;
    if (is_home() === true) {
        return <></>;
    }
    if (page.robots) {
        return <meta name="robots" content={page.robots}/>;
    }
    return <></>;
}

const OpenGraph = (props) => {
    const openGraphArguments = (props) => {
        const {page, theme, config} = props;
        const args = {};
        if (theme.open_graph.twitter_id) {
            args.twitter_id = theme.open_graph.twitter_id;
        }
        if (page.layout === 'post' && page.cover) {
            args.twitter_card = 'summary_large_image';
        }
        return args;
    }
    const OpenGraphCover = (props) => {
        const {page} = props;
        if (page.layout === 'post' && page.cover !== undefined) {
            if (page.cover.includes('/')) {
                return <meta property="og:image" content={page.cover}/>;
            } else {
                return <></>;
            }
        } else {
            return <></>;
        }
    }
    const {theme, open_graph} = props;
    if (theme.open_graph && theme.open_graph.enable) {
        return (
            <Fragment>
                <Fragment dangerouslySetInnerHTML={{__html: open_graph(openGraphArguments(props))}}></Fragment>
                <OpenGraphCover {...props}/>
            </Fragment>
        )
    } else {
        return <></>;
    }
}

const Feed = (props) => {
    const {config, feed_tag} = props;
    if (config.feed && config.feed.path) {
        return (
            <Fragment dangerouslySetInnerHTML={{__html: feed_tag(config.feed.path, {title: config.title})}}></Fragment>
        )
    } else {
        return <></>;
    }
}

const ImportCSS = (props) => {
    const {theme} = props;
    if (theme.stellar.cdn_css) {
        return <link rel="stylesheet" href={theme.stellar.cdn_css}/>;
    } else {
        return <link rel="stylesheet" href="/css/main.css"/>;
    }
}

const FavIcon = (props) => {
    const {config, favicon} = props;
    if (config.favicon) {
        return (
            <>
                {favicon(config.favicon)}
            </>
        )
    } else {
        return <></>;
    }
}

const ImportHighlightJSTheme = (props) => {
    const {theme, config} = props;
    if (config.highlight && config.highlight.enable === true && config.highlight.hljs === true) {
        return <link rel="stylesheet" href={theme.style.codeblock.highlightjs_theme}/>;
    } else {
        return <></>;
    }
}
const ImportKatex = (props) => {
    const {theme} = props;
    if (theme.plugins.katex && theme.plugins.katex.enable) {
        return (
            <>
                {theme.plugins.katex.min_css}
                {theme.plugins.katex.min_js}
                {theme.plugins.katex.auto_render_min_js}
            </>
        )
    } else {
        return <></>;
    }
}
const ImportInjectHead = (props) => {
    const lines = [];
    const {config} = props;
    if (config.inject && config.inject.head) {
        (config.inject.head || []).forEach(
            (item) => {
                lines.push(
                    <>
                        {item}
                    </>
                );
            }
        );
        return lines
    } else {
        return <></>;
    }
}

module.exports = function Head(props) {
    const {stellar_info} = props;
    return (
        <head>
            <meta name="generator" content="Hexo"/>
            <meta name='hexo-theme' content={stellar_info('tree')}/>
            <meta charSet="utf-8"/>
            <Robots {...props}/>

            <meta httpEquiv='X-DNS-Prefetch-Control' content='on'/>
            <link rel="dns-prefetch" href="https://fastly.jsdelivr.net"/>
            <link rel="preconnect" href="https://fastly.jsdelivr.net" crossOrigin="true"/>
            <link rel="dns-prefetch" href="https://cdn.bootcdn.net"/>
            <link rel="preconnect" href="https://cdn.bootcdn.net" crossOrigin="true"/>

            <meta name="renderer" content="webkit"/>
            <meta name="force-rendering" content="webkit"/>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
            <meta name="HandheldFriendly" content="true"/>
            <meta name="apple-mobile-web-app-capable" content="yes"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
            <meta name="theme-color" content="#f8f8f8"/>

            <Title {...props}/>
            <OpenGraph {...props}/>
            <Description {...props}/>
            <Feed {...props}/>
            <FavIcon {...props}/>

            <ImportCSS {...props}/>
            <ImportHighlightJSTheme {...props}/>
            <ImportKatex {...props}/>
            <ImportInjectHead {...props}/>
        </head>
    )
}