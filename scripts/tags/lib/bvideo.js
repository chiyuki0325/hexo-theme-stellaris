/* bvideo.js v3 | https://github.com/chiyuki0325/hexo-theme-stellaris
 * https://github.com/MaxChang3/hexo-bilibili-card
 * {% bvideo v_id %}
 */

'use strict'

module.exports = (ctx) =>
  function (args) {
    const { v_id } = ctx.args.map(args, [], ['v_id'])
    return `<div class="tag_plugin bvideo" v_id="${v_id}"><a href="//www.bilibili.com/video/${v_id}" target="_blank">
    </a></div>`
  }
