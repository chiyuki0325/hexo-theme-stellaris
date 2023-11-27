module.exports = function(prop) {
    const {config, theme, page} = props
    const generatedScript = `
  function load_artalk() {
    if (!document.querySelectorAll("#artalk_container")[0]) return
    stellar.loadCSS('${theme.comments.artalk.css}')
    stellar.loadScript('${theme.comments.artalk.js}', {defer: true}).then(function () {
      const el = document.getElementById("artalk_container")
      var path = el.getAttribute('comment_id')
      if (!path) {
        path = decodeURI(window.location.pathname)
      }
      var artalk = new Artalk({
        el: '#artalk_container',
        pageKey: path,
        pageTitle: '${page.title || page.seo_title}',
        server: '${theme.comments.artalk.server}',
        placeholder: '${theme.comments.artalk.placeholder}',
        site: '${config.title}',
        darkMode: '${theme.comments.artalk.darkMode}'
        })
      })
  }
  InstantClick.on('change', () => {
    load_artalk()
  });
  window.addEventListener(
    "load", load_artalk, false
  )`
    return <script data-no-instant="true" dangerouslySetInnerHTML={{__html: generatedScript}}/>
}
