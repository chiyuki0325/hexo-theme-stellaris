/**
 * video.js v3 | https://github.com/chiyuki0325/hexo-theme-stellaris
 * {% video src [poster] [ratio] [subtitle:subtitle-url] [subtitle_encoding:utf-8] [autoplay:false] [muted:false] [loop:false] [setting: true] [hotkey:true] [fullscreen_enabled:true] [mini_progress_bar:false] [mutex:true] [pip:false] %}
 */


'use strict';

const crypto = require('crypto')

module.exports = ctx => ((args) => {
    args = ctx.args.map(args, ['ratio', 'hotkey', 'subtitle', 'subtitle_encoding', 'fullscreen_enabled', 'mini_progress_bar', 'mutex', 'pip', 'setting', 'loop', 'autoplay', 'muted', 'poster'], ['src'])

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
    .video-div-${videoTagHash} {
        width: 100%;
        aspect-ratio: ${args.ratio || '16 / 9'};
        border-radius: 4px;
    }
</style>
<div class="video-div-${videoTagHash}" id="artplayer-app-${videoTagHash}">
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
