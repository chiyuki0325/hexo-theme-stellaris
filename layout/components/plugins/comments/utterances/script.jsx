const UtterancesScript = props => {
    const generatedScript = `
      function loadUtterances() {
        const els = document.querySelectorAll("#comments #utterances");
        if (els.length === 0) return;
        els.forEach((el, i) => {
          try {
            el.innerHTML = '';
          } catch (error) {
            console.error(error);
          }
          var script = document.createElement('script');
          script.src = 'https://utteranc.es/client.js';
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
        loadUtterances();
      });
      window.addEventListener(
          "load", loadUtterances, false
      );
    `
    return <script data-no-instant="true" dangerouslySetInnerHTML={{__html: generatedScript}}/>
}

module.exports = UtterancesScript;
