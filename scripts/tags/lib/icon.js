/**
 * icon.js v1 | https://github.com/xaoxuu/hexo-theme-stellar/
 * 格式与官方标签插件一致使用空格分隔，中括号内的是可选参数（中括号不需要写出来）
 *
 * {% icon source [height:1.75em] %}
 *
 */

'use strict';

module.exports = ctx => function(args) {
  args = ctx.args.map(args, ['height'], ['source']);
  var el = '';
  if (args.source == undefined) {
    return el;
  }
  el += '<span class="tag-plugin emoji">';
  if (args.source) {
    el += '<img no-lazy="" class="inline"';
    el += ' src="' + args.source + '"';
    if (args.height) {
      el += ' style="height:' + args.height + '"';
    }
    el += '/>';
  }
  el += '</span>';
  return el;
}
