'use strict';

hexo.extend.filter.register('after_render:html', require('./img_lazyload').processSite);
hexo.extend.filter.register('after_render:html', require('./img_onerror').processSite);
hexo.extend.filter.register('before_post_render', require('./change_image').changeImage, 9);
