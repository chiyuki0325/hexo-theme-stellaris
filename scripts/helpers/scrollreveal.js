'use strict';

hexo.extend.helper.register('scroll_reveal', function (args) {
    const cfg = hexo.theme.config;
    if (cfg.plugins.scrollreveal && cfg.plugins.scrollreveal.enabled) {
        return ' reveal';
    }
    return '';
});

// 兼容

hexo.extend.helper.register('scrollreveal', function (args) {
    const cfg = hexo.theme.config;
    if (cfg.plugins.scrollreveal && cfg.plugins.scrollreveal.enabled) {
        return ' reveal';
    }
    return '';
});
