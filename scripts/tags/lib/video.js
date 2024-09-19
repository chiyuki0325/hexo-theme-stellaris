/**
 * video.js v3 | https://github.com/chiyuki0325/hexo-theme-stellaris
 * {% video src [poster] [ratio] [subtitle:subtitle-url] [subtitle_encoding:utf-8] [autoplay:false] [muted:false] [loop:false] [setting: true] [hotkey:true] [fullscreen_enabled:true] [mini_progress_bar:false] [mutex:true] [pip:false] %}
 * {% video youtube:dQw4w9WgXcQ autoplay:true %}
 * {% video bilibili:BV1GJ411x7h7 width:75% %} // width 指 CSS 中的 max-width
 */


'use strict';

const crypto = require('crypto')

module.exports = ctx => ((args) => {
    args = ctx.args.map(args, ['width', 'bilibili', 'youtube', 'ratio', 'hotkey', 'subtitle', 'subtitle_encoding', 'fullscreen_enabled', 'mini_progress_bar', 'mutex', 'pip', 'setting', 'loop', 'autoplay', 'muted', 'poster'], ['src'])
    if (args.width == null) {
      args.width = '100%'
    }
    if (args.bilibili) {
      return `<div class="tag-plugin video" style="aspect-ratio:${args.ratio || 16 / 9};max-width:${args.width};">
      <iframe src="https://player.bilibili.com/player.html?bvid=${args.bilibili}&autoplay=${args.autoplay || 'false'}" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true">
      </iframe>
      </div>
      `
    }
    if (args.youtube) {
      if(args.autoplay == 'true' || args.autoplay == '1') { 
        args.autoplay = '1&mute=1'
      } else {
        args.autoplay = '0'
      }
      return `<div class="tag-plugin video" style="aspect-ratio:${args.ratio || 16 / 9};max-width:${args.width};">
      <iframe style="border:none" src="https://www.youtube.com/embed/${args.youtube}?rel=0&disablekb=1&playsinline=1&autoplay=${args.autoplay}" picture-in-picture="true" allowfullscreen="true" >
      </iframe>
      </div>
      `
    }

    const videoTagHash = crypto.createHash('md5').update(args.src).digest('hex')
    const artPlayerConfig = {
        id: videoTagHash,
        container: `#artplayer-app-${videoTagHash}`,
        url: args.src,
        hotkey: args.hotkey || true,
        fullscreen: args.fullscreen_enabled || true,
        fullscreenWeb: false, // 不兼容
        miniProgressBar: args.mini_progress_bar || false,
        mutex: args.mutex || true,
        pip: args.pip || false,
        setting: args.setting || true,
        loop: args.loop || false,
        autoplay: args.autoplay || false,
        muted: args.muted || false,
        poster: args.poster,
        lang: ctx.config.language.toLowerCase() || 'zh-cn',
        // 移动端相关
        autoOrientation: true,
        lock: true
    }
    if (args.subtitle) {
        artPlayerConfig.subtitle = {
            url: args.subtitle,
            type: args.subtitle.split('.').slice(-1)[0],
            encoding: args.subtitle_encoding || 'utf-8',
            escape: true
        }
    }
    return `
<script src="${ctx.theme.config.tag_plugins.video.js}"></script>
<style>
    div#artplayer-app-${videoTagHash} {
        width: 100%;
        aspect-ratio: ${args.ratio || '16 / 9'};
        border-radius: 4px;
    }
    div#artplayer-app-${videoTagHash} div {
        --art-theme: var(--theme-highlight);
    }
</style>
<div id="artplayer-app-${videoTagHash}">
    加载中 ...
</div>
<script defer>
    function initVideo_${videoTagHash}() {
        try {
        	let art = new Artplayer(${JSON.stringify(artPlayerConfig)});
        } catch (e) {
            if (e instanceof ReferenceError) {
                setTimeout(() => {
                    initVideo_${videoTagHash}()
                }, 100)
            }
        }
    }
    try {
        InstantClick.on('change', () => {
            initVideo_${videoTagHash}()
    	})
    } catch (e) {
    	initVideo_${videoTagHash}()
    }
</script>
    `
})
