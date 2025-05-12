const { Fragment } = require('react')
const OpenGraphArguments = require('./head/open_graph.jsx')
const Title = (props) => {
  const { page, theme, config, __ } = props
  if (page.seo_title) {
    return <title>{page.seo_title}</title>
  }
  if (page.wiki) {
    let title
    let proj = theme.wiki.tree[page.wiki]
    let wiki = (proj && proj.name) || page.wiki
    if (page.title) {
      title = wiki + __('symbol.colon') + page.title + ' - ' + config.title
    } else {
      title = wiki + ' - ' + config.title
    }
    return <title>{title}</title>
  } else {
    let title
    if (page.title) {
      title = page.title + ' - ' + config.title
    } else if (page.category) {
      title =
        __('btn.category') +
        __('symbol.colon') +
        page.category +
        ' - ' +
        config.title
    } else if (page.tag) {
      title =
        __('btn.tag') + __('symbol.colon') + page.tag + ' - ' + config.title
    } else {
      title = config.title
    }
    return <title>{title}</title>
  }
}

const Description = (props) => {
  const { page, theme, config, truncate, strip_html } = props
  if (theme.open_graph && theme.open_graph.enabled) {
    return <></>
  }
  if (page.layout === 'wiki' && page.wiki) {
    let proj = theme.wiki.tree[page.wiki]
    if (proj && proj.description) {
      return <meta name='description' content={proj.description} />
    }
  }
  if (page.description || page.excerpt || page.content) {
    return (
      <meta
        name='description'
        content={truncate(
          strip_html(page.description || page.excerpt || page.content),
          { length: 150 }
        )}
      />
    )
  }
  return <meta name='description' content={config.description} />
}

const Robots = (props) => {
  const { is_home, page } = props
  if (is_home() === true) {
    return <></>
  }
  if (page.robots) {
    return <meta name='robots' content={page.robots} />
  }
  return <></>
}

const OpenGraph = (props) => {
  const openGraphArguments = (props) => {
    const { page, theme, config } = props
    const args = {}
    if (theme.head.open_graph.twitter_id) {
      args.twitter_id = theme.open_graph.twitter_id
    }
    if (page.layout === 'post' && page.cover) {
      args.twitter_card = 'summary_large_image'
    }
    return args
  }
  const { theme } = props
  if (theme.head.open_graph && theme.head.open_graph.enabled) {
    return (
      <Fragment>
        <OpenGraphArguments {...props} {...openGraphArguments(props)} key="openGraphArguments" />
      </Fragment>
    )
  } else {
    return <></>
  }
}

const Feed = (props) => {
  const { config, url_for } = props
  if (config.feed && config.feed.path) {
    // feed_tag.js to jsx
    if (typeof config.feed.type === 'string') {
      return (
        <link
          rel='alternate'
          href={url_for(config.feed.path)}
          type={`application/${config.feed.type}+xml`}
          title={config.title}
        />
      )
    } else {
      const results = []
      for (const i in config.feed.type) {
        results.push(
          <link
            rel='alternate'
            href={url_for(config.feed.path[i])}
            type={`application/${config.feed.type[i]}+xml`}
            key={i}
            title={config.title}
          />
        )
      }
      return results
    }
  } else {
    return <></>
  }
}

const ImportDarkMode = (props) => {
  const { theme } = props
  const DarkModePreset = `
        const themeModeList = ['light', 'dark', 'auto'];
        var ThemeChange = (theme) => {
          if(theme == null){
            theme = 'auto';
          }
          document.documentElement.setAttribute('data-theme', theme)
          window.localStorage.setItem('Stellaris.theme', theme);
        }
        ThemeChange(window.localStorage.getItem('Stellaris.theme'));
    `
  if (theme.style && theme.style.darkmode == 'auto-switch') {
    return (
      <script
        type='text/javascript'
        data-no-instant='true'
        dangerouslySetInnerHTML={{ __html: DarkModePreset }}
      />
    )
  } else {
    return <></>
  }
}

const ImportCSS = (props) => {
  const { theme, url_for } = props
  const { join } = require('path')
  if (theme.stellar && theme.stellar.cdn_css) {
    return <link rel='stylesheet' href={theme.stellar.cdn_css} />
  } else {
    return <link rel='stylesheet' href={join(url_for(), '/css/main.css')} />
  }
}

const FavIcon = (props) => {
  const { config, url_for } = props
  if (config.favicon) {
    return <link rel='shortcut icon' href={url_for(config.favicon)} />
  } else {
    return <></>
  }
}

const ImportHighlightJSTheme = (props) => {
  const { theme, config } = props
  if (
    config.highlight &&
    config.highlight.enabled === true &&
    config.highlight.hljs === true
  ) {
    return (
      <link rel='stylesheet' href={theme.style.codeblock.highlightjs_theme} />
    )
  } else {
    return <></>
  }
}

const Preconnect = (props) => {
  const { prefetch_and_preconnect } = props.theme.plugins
  if (prefetch_and_preconnect && prefetch_and_preconnect.length > 0) {
    let preconnects = []
    for (const preconnect of prefetch_and_preconnect) {
      preconnects.push(
        <link rel='dns-prefetch' href={preconnect} key={`dns-${preconnect}`} />,
        <link
          rel='preconnect'
          href={preconnect}
          crossOrigin='anonymous'
          key={`preconnect-${preconnect}`}
        />
      )
    }
    return (
      <>
        <meta httpEquiv='X-DNS-Prefetch-Control' content='on' />
        {preconnects}
      </>
    )
  } else {
    return <></>
  }
}

const InjectHead = (props) => {
  const { theme } = props
  let heads = []
  if (theme.inject && theme.inject.head && theme.inject.head.length > 0) {
    const parse = require('html-react-parser').default
    let i = 0
    for (const head of theme.inject.head) {
      heads.push(<Fragment key={String(i)}>{parse(head)}</Fragment>)
      i++
    }
  }
  return <>{heads}</>
}

// 添加性能优化相关的meta标签
const PerformanceMeta = () => {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="var(--color-card)" />
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
    </>
  )
}

// 添加SEO相关的meta标签
const SEOMeta = (props) => {
  const { page, is_post, config, url, url_for, date } = props
  
  if (!is_post || !page) return null
  
  const canonical = url.replace(/index\.html$/, '')
  const publishedTime = page.date ? date(page.date, 'YYYY-MM-DD') : ''
  const modifiedTime = page.updated ? date(page.updated, 'YYYY-MM-DD') : ''
  
  return (
    <>
      <link rel="canonical" href={canonical} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {page.categories && page.categories.forEach && page.categories.forEach(category => (
        <meta property="article:section" content={category.name} key={`category-${category.name}`} />
      ))}
      {page.tags && page.tags.forEach && page.tags.forEach(tag => (
        <meta property="article:tag" content={tag.name} key={`tag-${tag.name}`} />
      ))}
    </>
  )
}

module.exports = function Head(props) {
  const { stellar_info, env, config } = props
  return (
    <head>
      <meta name='generator' content={`Hexo ${env.version}`} />
      <meta name='hexo-theme' content={stellar_info('tree')} />
      <meta charSet='utf-8' />
      <PerformanceMeta />
      <Robots {...props} />
      <Preconnect {...props} />
      <meta name='renderer' content='webkit' />
      <meta name='force-rendering' content='webkit' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge,chrome=1' />
      <meta name='HandheldFriendly' content='true' />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta
        name='apple-mobile-web-app-status-bar-style'
        content='black-translucent'
      />
      <meta
        name='apple-mobile-web-app-title'
        content={config.title || 'Stellaris'}
      />
      <meta name='format-detection' content='telephone=no' />
      <Title {...props} />
      <Description {...props} />
      <OpenGraph {...props} />
      <Feed {...props} />
      <SEOMeta {...props} />
      <FavIcon {...props} />
      <ImportCSS {...props} />
      <ImportHighlightJSTheme {...props} />
      <ImportDarkMode {...props} />
      <InjectHead {...props} />
    </head>
  )
}
