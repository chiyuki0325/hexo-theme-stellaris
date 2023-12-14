const GiscusScript = props => {
    const generatedScript = `
      function loadGiscus() {
        const els = document.querySelectorAll("#comments #giscus");
        if (els.length === 0) return;
        els.forEach((el, i) => {
          try {
            el.innerHTML = '';
          } catch (error) {
            console.error(error);
          }
          var script = document.createElement('script');
          script.src = 'https://giscus.app/client.js';
          script.async = true;
          for (let key of Object.keys(el.attributes)) {
            let attr = el.attributes[key];
            if (['class', 'id'].includes(attr.name) === false) {
              script.setAttribute(attr.name, attr.value);
            }
          }
          el.appendChild(script);
        });
      }
      InstantClick.on('change', () => {
        loadGiscus();
      });
      window.addEventListener(
          "load", loadGiscus, false
      );
    `
    return <script data-no-instant="true" dangerouslySetInnerHTML={{__html: generatedScript}}/>
}

module.exports = GiscusScript;
