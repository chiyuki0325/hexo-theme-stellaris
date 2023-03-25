const ValineScript = props => {
    const {theme} = props;
    const generatedScript = `
      function getEmojiMaps() {
        function emoji(path, idx, ext) {
          return path + "/" + path + "-" + idx + "." + ext;
        }
        var emojiMaps = {};
        for (var i = 1; i <= 54; i++) {
          emojiMaps['tieba-' + i] = emoji('tieba', i, 'png');
        }
        for (var i = 1; i <= 101; i++) {
          emojiMaps['qq-' + i] = emoji('qq', i, 'gif');
        }
        for (var i = 1; i <= 4; i++) {
          emojiMaps['weibo-' + i] = emoji('weibo', i, 'png');
        }
        return emojiMaps;
      }
      function load_comment(){
        if(!document.getElementById("valine_container"))return;
        stellar.loadScript('${theme.comments.valine.js}', {defer:true}).then(function () {
          const el = document.getElementById("valine_container");
          var path = el.getAttribute('comment_id');
          const placeholder = "${theme.comments.valine.placeholder}";
          if (!path) {
            path = decodeURI(window.location.pathname);
          }
          if (!path.endsWith('/')) {
            path += '/';
          }
          var valine = new Valine();
          valine.init(Object.assign(${JSON.stringify(theme.comments.valine)}, {
            el: '#valine_container',
            path: path,
            placeholder: placeholder,
            emojiCDN: 'https://blog.yidaozhan.top/cdn/emoji/',
            emojiMaps: getEmojiMaps(),
          }));
        });
      }
      InstantClick.on('change', () => {
        load_comment();
      });
    `
    return <script data-no-instant="true" dangerouslySetInnerHTML={{__html: generatedScript}}/>
}

module.exports = ValineScript;

