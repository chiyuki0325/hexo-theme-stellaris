const MermaidScripts = (props) => {
  const blogTheme = props.theme
  const { enabled, js, theme } = blogTheme.plugins.mermaid

  if (enabled) {
    const loadMermaidScript = `
      function loadMermaid() {
        console.log('Mermaid enabled')
        stellar.loadScript('${js}', {defer:true}).then(() => {
          mermaid.initialize({
            startOnLoad: false,
            theme: "${blogTheme.style.darkmode}".startsWith("auto") ? (
              window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "${theme}"
            ) : "${theme}",
            logLevel: 3,
            flowchart: {
              useMaxWidth: false,
              htmlLabels: true,
              curve: "linear"
            },
            gantt: {
              axisFormat: "%Y/%m/%d"
            },
            sequence: {
              actorMargin: 50
            }
          })
        });
        
        (document.querySelectorAll('pre.mermaid:not([data-processed="true"])') ?? []).forEach(e => {
          (new Promise(resolve => {
            const interval = setInterval(() => {
              if (e.innerText !== "") {
                clearInterval(interval)
                resolve(e)
              }
            }, 20)
          })).then(e => {
            const uniqueId = "mermaidGraph_" + Math.random().toString(36).substr(2, 9)
            e.setAttribute("data-processed", "true")
            mermaid.render(uniqueId, e.innerText, svg => {
              e.innerHTML = svg
            })
          })
        })
      }
      loadMermaid()
      `
    return <script dangerouslySetInnerHTML={{ __html: loadMermaidScript }} />
  } else {
    return <></>
  }
}

module.exports = MermaidScripts
