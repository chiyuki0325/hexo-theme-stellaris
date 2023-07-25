/**
 * img_lazyload.js v1 | https://github.com/YidaozhanYa/hexo-theme-stellaris/
 *
 */

'use strict'

module.exports.changeImage = function(data) {
    if (this.theme.config.tag_plugins.image.parse_markdown) {
      data.content = data.content.replace(
          /!\[(.*?)\]\((.*?)\s*(?:"(.*?)")?\)/g,
          '{% image $2 $3 %}'
      );
    }
    return data;
}
