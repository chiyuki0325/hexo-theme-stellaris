const WalineScript = props => {
    const {theme} = props;
    const generatedScript = `
      function load_comment(){
        if(!document.getElementById("waline_container"))return;
        stellar.loadCSS('${theme.comments.waline.css}');
        stellar.loadScript('${theme.comments.waline.js}', {defer:true}).then(function () {
          const el = document.getElementById("waline_container");
          var path = el.getAttribute('comment_id');
          if (!path) {
            path = decodeURI(window.location.pathname);
          }
          Waline.init(Object.assign(${JSON.stringify(theme.comments.waline)}, {
            el: '#waline_container',
            path: path,
          }));
        });
      }
      InstantClick.on('change', () => {
        load_comment();
      });
      window.addEventListener(
          "load", load_comment, false
      );
    `
    return <script data-no-instant="true" dangerouslySetInnerHTML={{__html: generatedScript}}/>
}

module.exports = WalineScript;

