const MermaidScripts = (props) => {
  const blogTheme = props.theme
  const { enabled, js, theme } = blogTheme.plugins.mermaid

  if (enabled) {
    const loadMermaidScript = `
      function loadMermaid() {
        console.log('Mermaid enabled')
        stellar.loadScript('${js}', {defer:true}).then(() => {
          mermaid.initialize({
            startOnLoad: true,
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
