const CommentsScript = require('./plugins/comments/script.jsx');
const MathJaxScripts = require('./plugins/mathjax/script.jsx');
const generateStellarScript = props => {
    const {theme, __, url_for} = props;
    return `
      stellar = {
        // 懒加载 css https://github.com/filamentgroup/loadCSS
        loadCSS: (href, before, media, attributes) => {
          var doc = window.document;
          var ss = doc.createElement("link");
          var ref;
          if (before) {
            ref = before;
          } else {
            var refs = (doc.body || doc.getElementsByTagName("head")[0]).childNodes;
            ref = refs[refs.length - 1];
          }
          var sheets = doc.styleSheets;
          if (attributes) {
            for (var attributeName in attributes) {
              if (attributes.hasOwnProperty(attributeName)) {
                ss.setAttribute(attributeName, attributes[attributeName]);
              }
            }
          }
          ss.rel = "stylesheet";
          ss.href = href;
          ss.media = "only x";
          function ready(cb) {
            if (doc.body) {
              return cb();
            }
            setTimeout(function () {
              ready(cb);
            });
          }
          ready(function () {
            ref.parentNode.insertBefore(ss, before ? ref : ref.nextSibling);
          });
          var onloadcssdefined = function (cb) {
            var resolvedHref = ss.href;
            var i = sheets.length;
            while (i--) {
              if (sheets[i].href === resolvedHref) {
                return cb();
              }
            }
            setTimeout(function () {
              onloadcssdefined(cb);
            });
          };
          function loadCB() {
            if (ss.addEventListener) {
              ss.removeEventListener("load", loadCB);
            }
            ss.media = media || "all";
          }
          if (ss.addEventListener) {
            ss.addEventListener("load", loadCB);
          }
          ss.onloadcssdefined = onloadcssdefined;
          onloadcssdefined(loadCB);
          return ss;
        },
        // 从 butterfly 和 volantis 获得灵感
        loadScript: (src, opt) => new Promise((resolve, reject) => {
          var script = document.createElement('script');
          script.src = src;
          if (opt) {
            for (let key of Object.keys(opt)) {
              script[key] = opt[key]
            }
          } else {
            // 默认异步，如果需要同步，第二个参数传入 {} 即可
            script.async = true
          }
          script.onerror = reject
          script.onload = script.onreadystatechange = function() {
            const loadState = this.readyState
            if (loadState && loadState !== 'loaded' && loadState !== 'complete') return
            script.onload = script.onreadystatechange = null
            resolve()
          }
          document.head.appendChild(script)
        }),
    
        // https://github.com/jerryc127/hexo-theme-butterfly
        jQuery: (fn) => {
          if (typeof jQuery === 'undefined') {
            stellar.loadScript(stellar.plugins.jQuery).then(fn)
          } else {
            fn()
          }
        }
      };
      stellar.github = 'https://github.com/YidaozhanYa/hexo-theme-stellaris';
      stellar.config = {
        date_suffix: {
          just: '${__('meta.date_suffix.just')}',
          min: '${__('meta.date_suffix.min')}',
          hour: '${__('meta.date_suffix.hour')}',
          day: '${__('meta.date_suffix.day')}',
          month: '${__('meta.date_suffix.month')}',
        },
      };
    
      // required plugins (only load if needs)
      stellar.plugins = {
        jQuery: '${url_for(theme.plugins.jquery || "https://fastly.jsdelivr.net/npm/jquery@latest/dist/jquery.min.js")}'
      };
    
      if ('${theme.search.service}') {
        stellar.search = {};
        stellar.search.service = '${theme.search.service}';
        if (stellar.search.service == 'local_search') {
          stellar.search.js = '${theme.search.local_search.js}';
          stellar.search.path = '${theme.search.local_search.path}';
        }
      }
    
      // stellar js
      stellar.plugins.stellar = Object.assign(${JSON.stringify(theme.plugins.stellar)});
    
      stellar.plugins.marked = Object.assign(${JSON.stringify(theme.plugins.marked)});
      // optional plugins
      if ('${theme.plugins.lazyload.enable}' == 'true') {
        stellar.plugins.lazyload = Object.assign(${JSON.stringify(theme.plugins.lazyload)});
      }
      if ('${theme.plugins.swiper.enable}' == 'true') {
        stellar.plugins.swiper = Object.assign(${JSON.stringify(theme.plugins.swiper)});
      }
      if ('${theme.plugins.scrollreveal.enable}' == 'true') {
        stellar.plugins.scrollreveal = Object.assign(${JSON.stringify(theme.plugins.scrollreveal)});
      }
      if ('${theme.plugins.fancybox.enable}' == 'true') {
        stellar.plugins.fancybox = Object.assign(${JSON.stringify(theme.plugins.fancybox)});
      }
      stellar.plugins.instant_click = Object.assign(${JSON.stringify(theme.plugins.instant_click)});
      stellar.article = {
        outdate_month: ${theme.article.outdate_month}
      };
    `;
}
const ImportJS = props => {
    const {theme} = props;
    if (theme.stellar.cdn_js) {
        return (
            <script src={theme.stellar.cdn_js} type="text/javascript" async={true} data-no-instant="true"/>
        )
    } else {
        return (
            <script src='/js/main.js' type="text/javascript" async={true} data-no-instant="true"/>
        )
    }
}
const Scripts = props => {
    const {theme, page} = props;
    const {partial} = props;
    return (
        <div className="scripts">
            <script src={theme.plugins.instant_click.js} data-no-instant="true"/>
            <script data-no-instant="true" type="text/javascript">
                {"InstantClick.init();"}
            </script>
            <script type="text/javascript" dangerouslySetInnerHTML={{__html: generateStellarScript(props)}}/>
            <ImportJS {...props}/>
            <script type="text/javascript" src="/js/check_outdated_browser.js" data-no-instant="true"/>
            <CommentsScript {...props}/>
            {(() => {
                 if (theme.plugins.mathjax.per_page === true || page.mathjax === true) return (<MathJaxScripts {...props}/>)
             })()}
        </div>
    )
}

module.exports = Scripts;
