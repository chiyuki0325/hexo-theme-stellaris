/**
 * hexo_util_replacements.js v1 | https://github.com/YidaozhanYa/hexo-theme-stellaris
 */

'use strict'

const path = require('path')

hexo.extend.helper.register('url_for', url => encodeURI(path.join(hexo.config.root, url)))

hexo.extend.helper.register('full_url_for', url => encodeURI(path.join(hexo.config.url, hexo.config.root, url)))

hexo.extend.helper.register('pretty_url', (url, options = { trailing_index: true, trailing_html: true }) => {
    const { trailing_index, trailing_html } = options
    if (!trailing_index && url.endsWith('/index.html')) {
        return url.slice(0, -11)
    } else if (!trailing_html && url.endsWith('.html')) {
        return url.slice(0, -5)
    }
    return url
})

hexo.extend.helper.register('escape_html', html => {
    const entityMap = {
        '&': '&amp',
        '<': '&lt',
        '>': '&gt',
        '"': '&quot',
        "'": '&#39',
        '/': '&#x2F',
    }

    return html.replace(/[&<>"'\/]/g, match => {
        return entityMap[match]
    }).replace(/&amp(amp|lt|gt|quot|#39|#x2F)/g, (match, entity) => {
        return `&${entity}`
    })
})

const STATE_PLAINTEXT = Symbol('plaintext')
const STATE_HTML = Symbol('html')
const STATE_COMMENT = Symbol('comment')

// eslint-disable-next-line @typescript-eslint/ban-types
hexo.extend.helper.register('strip_html', (html = '') => {
    // if not string, then safely return an empty string
    if (typeof html !== 'string' && !(html instanceof String)) {
        return ''
    }
    let state = STATE_PLAINTEXT
    let tag_buffer = ''
    let depth = 0
    let in_quote_char = ''
    let output = ''
    const { length } = html
    for (let idx = 0; idx < length; idx++) {
        const char = html[idx]
        if (state === STATE_PLAINTEXT) {
            switch (char) {
                case '<':
                    state = STATE_HTML
                    tag_buffer = tag_buffer + char
                    break
                default:
                    output += char
                    break
            }
        }
        else if (state === STATE_HTML) {
            switch (char) {
                case '<':
                    // ignore '<' if inside a quote
                    if (in_quote_char)
                        break
                    // we're seeing a nested '<'
                    depth++
                    break
                case '>':
                    // ignore '>' if inside a quote
                    if (in_quote_char) {
                        break
                    }
                    // something like this is happening: '<<>>'
                    if (depth) {
                        depth--
                        break
                    }
                    // this is closing the tag in tag_buffer
                    in_quote_char = ''
                    state = STATE_PLAINTEXT
                    // tag_buffer += '>'
                    tag_buffer = ''
                    break
                case '"':
                case '\'':
                    // catch both single and double quotes
                    if (char === in_quote_char) {
                        in_quote_char = ''
                    }
                    else {
                        in_quote_char = in_quote_char || char
                    }
                    tag_buffer = tag_buffer + char
                    break
                case '-':
                    if (tag_buffer === '<!-') {
                        state = STATE_COMMENT
                    }
                    tag_buffer = tag_buffer + char
                    break
                case ' ':
                case '\n':
                    if (tag_buffer === '<') {
                        state = STATE_PLAINTEXT
                        output += '< '
                        tag_buffer = ''
                        break
                    }
                    tag_buffer = tag_buffer + char
                    break
                default:
                    tag_buffer = tag_buffer + char
                    break
            }
        }
        else if (state === STATE_COMMENT) {
            switch (char) {
                case '>':
                    if (tag_buffer.slice(-2) === '--') {
                        // close the comment
                        state = STATE_PLAINTEXT
                    }
                    tag_buffer = ''
                    break
                default:
                    tag_buffer = tag_buffer + char
                    break
            }
        }
    }
    return output
})