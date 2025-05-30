/* global hexo */

'use strict'

// container
const postTabs = require('./lib/tabs')(hexo)
hexo.extend.tag.register('tabs', postTabs, true)
hexo.extend.tag.register('subtabs', postTabs, true)
hexo.extend.tag.register('subsubtabs', postTabs, true)

hexo.extend.tag.register('ablock', require('./lib/border')(hexo), true) // 兼容语法
hexo.extend.tag.register('border', require('./lib/border')(hexo), true)
hexo.extend.tag.register('about', require('./lib/about')(hexo), true)
hexo.extend.tag.register('folding', require('./lib/folding')(hexo), true)
hexo.extend.tag.register('folders', require('./lib/folders')(hexo), true)
hexo.extend.tag.register('split', require('./lib/split')(hexo), true)
hexo.extend.tag.register('swiper', require('./lib/swiper')(hexo), true)

// data
hexo.extend.tag.register('users', require('./lib/friends')(hexo)) // 兼容语法
hexo.extend.tag.register('friends', require('./lib/friends')(hexo))
hexo.extend.tag.register('sites', require('./lib/sites')(hexo))
hexo.extend.tag.register('ghcard', require('./lib/ghcard')(hexo))
hexo.extend.tag.register('toc', require('./lib/toc')(hexo))
hexo.extend.tag.register('timeline', require('./lib/timeline')(hexo), {
  ends: true,
})

// express
hexo.extend.tag.register(
  'checkbox',
  require('./lib/checkbox')(hexo, 'checkbox')
)
hexo.extend.tag.register('radio', require('./lib/checkbox')(hexo, 'radio'))
hexo.extend.tag.register('copy', require('./lib/copy')(hexo))
hexo.extend.tag.register('emoji', require('./lib/emoji')(hexo))
hexo.extend.tag.register('frame', require('./lib/frame')(hexo))
hexo.extend.tag.register('image', require('./lib/image')(hexo))
hexo.extend.tag.register('link', require('./lib/link')(hexo))
hexo.extend.tag.register('mark', require('./lib/mark')(hexo))
hexo.extend.tag.register('navbar', require('./lib/navbar')(hexo))
hexo.extend.tag.register('note', require('./lib/note')(hexo))
hexo.extend.tag.register('poetry', require('./lib/poetry')(hexo), true)
hexo.extend.tag.register('quot', require('./lib/quot')(hexo))
hexo.extend.tag.register('hashtag', require('./lib/hashtag')(hexo))
hexo.extend.tag.register('tag', require('./lib/hashtag')(hexo)) // 兼容语法
hexo.extend.tag.register('okr', require('./lib/okr')(hexo), { ends: true })

// read 阅读类
hexo.extend.tag.register('reel', require('./lib/read/reel')(hexo), true)
hexo.extend.tag.register('paper', require('./lib/read/paper')(hexo), true)

// stelaris 新增组件
hexo.extend.tag.register('bvideo', require('./lib/bvideo')(hexo))
hexo.extend.tag.register('bilicard', require('./lib/bvideo')(hexo)) // 兼容语法
hexo.extend.tag.register('icon', require('./lib/icon')(hexo))
hexo.extend.tag.register('video', require('./lib/video')(hexo))
