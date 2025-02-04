const BeaudarScript = (props) => {
  const generatedScript = `
      function loadBeaudar() {
        const els = document.querySelectorAll("#comments #beaudar");
        if (els.length === 0) return;
        els.forEach((el, i) => {
          try {
            el.innerHTML = '';
          } catch (error) {
            console.error(error);
          }
          var script = document.createElement('script');
          script.src = 'https://beaudar.lipk.org/client.js';
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
        loadBeaudar();
      });
      window.addEventListener(
          "load", loadBeaudar, false
      );
    `
  return (
    <script
      data-no-instant='true'
      dangerouslySetInnerHTML={{ __html: generatedScript }}
    />
  )
}

module.exports = BeaudarScript
