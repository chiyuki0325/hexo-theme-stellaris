const { isMoment, isDate } = require('moment')

const localeMap = {
    'en': 'en_US',
    'de': 'de_DE',
    'es': 'es_ES',
    'fr': 'fr_FR',
    'hu': 'hu_HU',
    'id': 'id_ID',
    'it': 'it_IT',
    'ja': 'ja_JP',
    'ko': 'ko_KR',
    'nl': 'nl_NL',
    'ru': 'ru_RU',
    'th': 'th_TH',
    'tr': 'tr_TR',
    'vi': 'vi_VN'
}

const localeToTerritory = (() => {
    const cache = {}
    return str => {
        if (cache[str]) {
            return cache[str]
        }

        if (str.length === 2 && localeMap[str]) return localeMap[str]

        if (str.length === 5) {
            let territory = []
            if (str.includes('-')) {
                territory = str.split('-')
            } else {
                territory = str.split('_')
            }

            if (territory.length === 2) return territory[0].toLowerCase() + '_' + territory[1].toUpperCase()
        }
    }
})()

const Meta = (props) => {
    const { escape_html } = props
    let { name, content, escape } = props
    if (escape !== false && typeof content === 'string') {
        content = escape_html(content)
    }

    if (content) return <meta name={name} content={content} />
    return <meta name={name} />
}

const OG = (props) => {
    const { escape_html } = props
    let { name, content, escape } = props
    if (escape !== false && typeof content === 'string') {
        content = escape_html(content)
    }

    if (content) return <meta property={name} content={content} />
    return <meta property={name} />
}

const OpenGraphArguments = (props) => {
    const { config, page } = props
    const { pretty_url, escape_html, strip_html } = props
    const { content } = page
    let description = props.description || page.description || page.excerpt || content || config.description
    let keywords = (page.tags && page.tags.length ? page.tags : undefined) || config.keywords || false
    const title = props.title || page.title || config.title
    const type = props.type || (props.is_post() ? 'article' : 'website')
    const url = pretty_url(props.url || this.url, config.pretty_urls)
    const siteName = config.site_name || config.title
    const twitterCard = props.twitter_card || 'summary'
    const date = props.date !== false ? props.date || page.date : false
    const updated = props.updated !== false ? props.updated || page.updated : false
    const language = props.language || page.lang || page.language || config.language
    const author = props.author || config.author


    if (description) {
        description = escape_html(strip_html(description).substring(0, 200)
            .trim() // Remove prefixing/trailing spaces
        ).replace(/\n/g, ' '); // Replace new lines by spaces
    }

    let images = props.image || props.images || page.photos || []
    if (!Array.isArray(images)) images = [images]
    if (!images.length && content) {
        images = images.slice()

        if (content.includes('<img')) {
            let img
            const imgPattern = /<img [^>]*src=['"]([^'"]+)([^>]*>)/gi
            while ((img = imgPattern.exec(content)) !== null) {
                images.push(img[1])
            }
        }

    }
    images = images.map(path => new URL(path, url || config.url).toString())
        .filter(url => !url.startsWith('data:'))

    let result = []

    if (page.cover !== undefined && page.layout === 'post' && page.cover.includes('/')) {
        result.push(<OG name="og:image" content={page.cover} escape={false} {...props} />)
    } else {
        images.forEach(path => {
            result.push(<OG name="og:image" content={path} escape={false} {...props} />)
        })
    }


    if (description) {
        result.push(<Meta name="description" content={description} {...props} />)
    }

    result.push(<OG name="og:type" content={type} {...props} />)
    result.push(<OG name="og:title" content={title} {...props} />)

    if (url) {
        result.push(<OG name="og:url" content={encodeURI(url)} escape={false} {...props} />)
    } else {
        result.push(<OG name="og:url" {...props} />)
    }

    result.push(<OG name="og:site_name" content={siteName} {...props} />)
    if (description) {
        result.push(<OG name="og:description" content={description} escape={false} {...props} />)
    }

    if (language) {
        result.push(<OG name="og:locale" content={localeToTerritory(language)} escape={false} {...props} />)
    }


    if (date) {
        if ((isMoment(date) || isDate(date)) && !isNaN(date.valueOf())) {
            result.push(<OG name="article:published_time" content={date.toISOString()} {...props} />)
        }
    }

    if (updated) {
        if ((isMoment(updated) || isDate(updated)) && !isNaN(updated.valueOf())) {
            result.push(<OG name="article:modified_time" content={updated.toISOString()} {...props} />)
        }
    }

    if (author) {
        result.push(<OG name="article:author" content={author} {...props} />)
    }

    if (keywords) {
        if (typeof keywords === 'string') keywords = [keywords]

        keywords.map(tag => {
            return tag.name ? tag.name : tag
        }).filter(Boolean).forEach(keyword => {
            result.push(<Meta name="article:tag" content={keyword} {...props} />)
        })
    }

    result.push(<OG name="twitter:card" content={twitterCard} {...props} />)

    if (props.twitter_image) {
        let twitter_image = props.twitter_image
        twitter_image = new URL(twitter_image, url || config.url)
        result.push(<OG name="twitter:image" content={twitter_image} escape={false} {...props} />)
    } else if (images.length) {
        if (page.cover !== undefined && page.layout === 'post' && page.cover.includes('/')) {
            result.push(<OG name="twitter:image" content={page.cover} escape={false} {...props} />)
        } else {
            result.push(<OG name="twitter:image" content={images[0]} escape={false} {...props} />)
        }
    }

    if (props.twitter_id) {
        let twitterId = props.twitter_id
        if (!twitterId.startsWith('@')) twitterId = `@${twitterId}`

        result.push(<OG name="twitter:creator" content={twitterId} {...props} />)
    }

    if (props.twitter_site) {
        result.push(<OG name="twitter:site" content={props.twitter_site} escape={false} {...props} />)
    }

    if (props.google_plus) {
        result.push(<link rel="publisher" href={props.google_plus} {...props} />)
    }

    if (props.fb_admins) {
        result.push(<OG name="fb:admins" content={props.fb_admins} {...props} />)
    }

    if (props.fb_app_id) {
        result.push(<OG name="fb:app_id" content={props.fb_app_id} {...props} />)
    }

    return result
}

module.exports = OpenGraphArguments
