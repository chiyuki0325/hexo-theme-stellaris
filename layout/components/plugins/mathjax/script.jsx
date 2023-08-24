const MathJaxScripts = (props) => {
    const { theme } = props;
    const { plugins } = theme;
    const { mathjax } = plugins;
    const { enable, cdn } = mathjax;

    
    if (enable) {
        const loadMathScript = `
            function loadMathJax() {    
                if (typeof MathJax == "undefined")  // 没有载入脚本就先载入脚本
                    stellar.loadScript('${cdn}', {defer:true});
                else // 否则立即渲染
                    MathJax.typeset();
            }
            InstantClick.on('change', () => {
                loadMathJax() 
            });
            window.addEventListener(
                "load", loadMathJax, false
            );
        `;
        return <script data-no-instant="true" dangerouslySetInnerHTML={{__html: loadMathScript}}/>;
    } else {
        return <></>;
    }
};

module.exports = MathJaxScripts;
