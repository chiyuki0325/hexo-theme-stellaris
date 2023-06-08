const TwikooScript = props => {
    const {theme} = props;
    const generatedScript = `
        function load_twikoo() {
            if (!document.querySelectorAll("#twikoo_container")[0]) return;
            stellar.loadScript('${theme.comments.twikoo.js}', {defer: true}).then(function () {
                const el = document.getElementById("twikoo_container");
                var path = el.getAttribute('comment_id');
                if (!path) {
                    path = decodeURI(window.location.pathname);
                }
                twikoo.init(Object.assign(${JSON.stringify(theme.comments.twikoo)}, {
                    el: '#twikoo_container',
                    path: path,
                }));
            });
        }
      InstantClick.on('change', () => {
        load_twikoo();
      });
      window.addEventListener(
          "load", load_twikoo, false
      );
    `
    return <script data-no-instant="true" dangerouslySetInnerHTML={{__html: generatedScript}}/>
}

module.exports = TwikooScript;

