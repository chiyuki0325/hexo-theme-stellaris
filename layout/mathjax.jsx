const MathJax = props => {
    const {theme} = props;
    const {plugins} = theme;
    const {mathjax} = plugins;
    const {enable, cdn} = mathjax;

    if (enable) {
        return (
            <div>
                <script type="text/x-mathjax-config">
                    {`
                MathJax.Hub.Config({
                    tex2jax: {
                    inlineMath: [ ['$','$'], ["\\\\(","\\\\)"] ],
                    processEscapes: true,
                    skipTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
                    }
                });
                `}
                    {`
                MathJax.Hub.Queue(function() {
                const all = MathJax.Hub.getAllJax(), i;
                for(i=0; i < all.length; i += 1) {
                all[i].SourceElement().parentNode.className += ' has-jax';
                }
                });
                `}
                </script>
                <script type="text/javascript" src={cdn}/>
            </div>
        );
    } else {
        return <></>;
    }
}

module.exports = MathJax;