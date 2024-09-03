const {Fragment} = require('react');
const OpenGraphArguments = require('./head/open_graph.jsx');
const Title = (props) => {
    const {page, theme, config, __} = props;
    if (page.seo_title) {
        return <title>{page.seo_title}</title>;
    }
    if (page.wiki) {
        let title;
        let proj = theme.wiki.tree[page.wiki];
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
        } else {
            title = config.title;
        }
        return <title>{title}</title>;
    }
}

const Description = (props) => {
    const {page, theme, config, truncate, strip_html} = props;
    if (theme.open_graph && theme.open_graph.enabled) {
        return <></>;
    }
    if (page.layout === 'wiki' && page.wiki) {
        let proj = theme.wiki.tree[page.wiki];
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
        if (theme.head.open_graph.twitter_id) {
            args.twitter_id = theme.open_graph.twitter_id;
        }
        if (page.layout === 'post' && page.cover) {
            args.twitter_card = 'summary_large_image';
        }
        return args;
    }
    const {theme} = props;
    if (theme.head.open_graph && theme.head.open_graph.enabled) {
        return (
            <Fragment>
                <OpenGraphArguments {...props} {...openGraphArguments(props)} />
            </Fragment>
        )
    } else {
        return <></>;
    }
}

const Feed = (props) => {
    const {config, url_for} = props;
    if (config.feed && config.feed.path) {
        // feed_tag.js to jsx
        if (typeof config.feed.type === 'string') {
            return (
                <link rel="alternate"
                      href={url_for(config.feed.path)} type={`application/${config.feed.type}+xml`}
                      title={config.title}/>
            )
        } else {
            const results = [];
            for (const i in config.feed.type) {
                results.push(
                    <link rel="alternate"
                          href={url_for(config.feed.path[i])} type={`application/${config.feed.type[i]}+xml`}
                          key={i} title={config.title}/>
                )
            }
            return results;
        }
    } else {
        return <></>;
    }
}

const ImportDarkMode = (props) => {
    const {theme, url_for} = props
    const {join} = require("path")
    if (theme.style.darkmode == 'auto-switch') {
        return <script src={join(url_for(), "/js/darkmode.js")} data-no-instant="true"></script>
    } else {
        return <></>;
    }
}

const ImportCSS = (props) => {
    const {theme, url_for} = props
    const {join} = require("path")
    if (theme.stellar && theme.stellar.cdn_css) {
        return <link rel="stylesheet" href={theme.stellar.cdn_css}/>
    } else {
        return <link rel="stylesheet" href={join(url_for(), "/css/main.css")}/>
    }
}

const FavIcon = (props) => {
    const {config, url_for} = props;
    if (config.favicon) {
        return (
            <link rel='shortcut icon' href={url_for(config.favicon)}/>
        )
    } else {
        return <></>;
    }
}

const ImportHighlightJSTheme = (props) => {
    const {theme, config} = props;
    if (config.highlight && config.highlight.enabled === true && config.highlight.hljs === true) {
        return <link rel="stylesheet" href={theme.style.codeblock.highlightjs_theme}/>;
    } else {
        return <></>;
    }
}

const ImportKatex = props => {
    const {theme} = props
    const parse = require('html-react-parser').default
    if (theme.plugins.katex && theme.plugins.katex.enabled) {
        return (
            <>
                {parse(theme.plugins.katex.min_css)}
                {parse(theme.plugins.katex.min_js)}
                {parse(theme.plugins.katex.auto_render_min_js)}
            </>
        )
    } else {
        return <></>;
    }
}

const Preconnect = props => {
    const {prefetch_and_preconnect} = props.theme.plugins
    if (prefetch_and_preconnect && prefetch_and_preconnect.length > 0 ) {
        let preconnects = []
        for (const preconnect of prefetch_and_preconnect) {
            preconnects.push(
                <link rel="dns-prefetch" href={preconnect} key={preconnect} />,
                <link rel="preconnect" href={preconnect} crossOrigin="true" key={preconnect} />
            )
        }
        return (<>
            <meta httpEquiv='X-DNS-Prefetch-Control' content='on'/>
            {preconnects}
        </>)
    } else {
        return <></>
    }
}

const InjectHead = props => {
    const {theme} = props
    let heads = []
    if (theme.inject && theme.inject.head && theme.inject.head.length > 0) {
        const parse = require('html-react-parser').default
        let i = 0
        for (const head of theme.inject.head) {
            heads.push(
                <Fragment key={String(i)}>{parse(head)}</Fragment>
            )
            i++
        }
    }
    return <>
        {heads}
    </>
}


module.exports = function Head(props) {
    const {stellar_info, env} = props;
    return (
        <head>
            <meta name="generator" content={`Hexo ${env.version}`}/>
            <meta name='hexo-theme' content={stellar_info('tree')}/>
            <meta charSet="utf-8"/>
            <Robots {...props}/>
            <Preconnect {...props} />
            <meta name="renderer" content="webkit"/>
            <meta name="force-rendering" content="webkit"/>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
            <meta name="HandheldFriendly" content="true"/>
            <meta name="apple-mobile-web-app-capable" content="yes"/>
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
            <meta name="theme-color" media="(prefers-color-scheme: light) and (max-width: 667px)" content="#eff4f9"/>
            <meta name="theme-color" media="(prefers-color-scheme: light)" content="#f8f8f8"/>
            {/** Higher priority than `#1a1f35`. */}
            <meta name="theme-color" media="(prefers-color-scheme: dark) and (max-width: 667px)" content="#000000"/>
            <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#202020"/>

            <meta name="darkreader-lock"/>
            
            <Title {...props}/>
            <OpenGraph {...props}/>
            <Description {...props}/>
            <Feed {...props}/>
            <FavIcon {...props}/>

            <ImportDarkMode {...props}/>
            <ImportCSS {...props}/>
            <ImportHighlightJSTheme {...props}/>
            <ImportKatex {...props}/>

            <InjectHead {...props} />
        </head>
    )
}
