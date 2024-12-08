const MathJaxScripts = (props) => {
  const { theme } = props
  const { plugins } = theme
  const { mathjax } = plugins
  const { enabled, cdn } = mathjax

  if (enabled) {
    const loadMathScript = `
        function loadMathJax() {
        console.log('MathJax enabled')
            stellar.loadScript('${cdn}', {defer:true}).then(() => {
                MathJax.Hub.Config({
                tex2jax: {
                    inlineMath: [ ['$','$'], ["\\(","\\)"] ],
                    processEscapes: true
                }
                });
                MathJax.Hub.Config({
                tex2jax: {
                    skipTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
                }
                });
                MathJax.Hub.Queue(function() {
                var all = MathJax.Hub.getAllJax(), i;
                for(i=0; i < all.length; i += 1) {
                    all[i].SourceElement().parentNode.className += ' has-jax';
                }
                });
            })
        }
        loadMathJax()
        `
    // 简单的加载，极致的享受
    return (
      <>
        <script dangerouslySetInnerHTML={{ __html: loadMathScript }} />
      </>
    )
  } else {
    return <></>
  }
}

module.exports = MathJaxScripts
