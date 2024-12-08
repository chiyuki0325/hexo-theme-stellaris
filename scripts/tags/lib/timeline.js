/**
 * timeline.js v3 | https://github.com/chiyuki0325/hexo-theme-stellaris/
 *
 * {% timeline %}
 *
 * <!-- node header1 -->
 * what happened 1
 *
 * <!-- node header2 [color:color] -->
 * what happened 2
 *
 * {% endtimeline %}
 */

'use strict'

function layoutNodeTitle(ctx, content) {
  var el = ''
  el += '<div class="header">'
  if (content && content.length > 0) {
    el += ctx.render
      .renderSync({ text: content, engine: 'markdown' })
      .split('\n')
      .join('')
  }
  el += '</div>'
  return el
}

function layoutNodeContent(ctx, content, color) {
  var el = ''
  el += `<div class="${color ? 'body fs14 colorful' : 'body fs14'}"${color ? 'color="' + color + '"' : ' '}>`
  if (content && content.length > 0) {
    el += ctx.render
      .renderSync({ text: content, engine: 'markdown' })
      .split('\n')
      .join('')
  }
  el += '</div>'
  return el
}

module.exports = (ctx) =>
  function (args, content = '') {
    args = ctx.args.map(args, ['api', 'user', 'type', 'limit', 'hide'])
    var el = ''
    if (!args.type) {
      args.type = 'timeline'
    }
    if (args.api && args.api.length > 0) {
      el += '<div class="tag-plugin timeline stellar-' + args.type + '-api"'
      el +=
        ' ' +
        ctx.args.joinTags(args, ['api', 'user', 'limit', 'hide']).join(' ')
      el += '>'
    } else {
      el += '<div class="tag-plugin timeline">'
    }

    var arr = content
      .split(/<!--\s*node (.*?)\s*-->/g)
      .filter((item) => item.trim().length > 0)
    if (arr.length > 0) {
      var nodes = []
      arr.forEach((item, i) => {
        if (i % 2 == 0) {
          // 日期
          const match = item.match(/color:\s*([^ ]+)/)
          let header, color
          if (match) {
            // colorful
            header = item.replace(match[0], '').trim()
            color = match[1].trim()
          } else {
            header = item
          }
          nodes.push({ header, color })
        } else if (nodes.length > 0) {
          // 内容
          var node = nodes[nodes.length - 1]
          if (node.body == undefined) {
            node.body = item
          } else {
            node.body += '\n' + item
          }
        }
      })
      nodes.forEach((node, i) => {
        el += '<div class="timenode" index="' + i + '">'
        el += layoutNodeTitle(ctx, node.header)
        el += layoutNodeContent(ctx, node.body, node.color)
        el += '</div>'
      })
    }

    el += '</div>'
    return el
  }
