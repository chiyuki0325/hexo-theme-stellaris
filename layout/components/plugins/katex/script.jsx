const KatexScripts = (props) => {
  const { theme } = props
  const { plugins } = theme
  const { katex } = plugins
  const { enabled, css } = katex

  if (enabled) {
    const loadMathStylesheet = `
        function loadKatex() {
          console.log('KaTeX enabled')
          stellar.loadCSS('${css}')
        }
        loadKatex()
        `
    return (
      <>
        <script dangerouslySetInnerHTML={{ __html: loadMathStylesheet }} />
      </>
    )
  } else {
    return <></>
  }
}

module.exports = KatexScripts
