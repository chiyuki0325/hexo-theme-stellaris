const MermaidScripts = (props) => {
  const blogTheme = props.theme
  const { enabled, js, theme } = blogTheme.plugins.mermaid

  if (enabled) {
    const loadMermaidScript = `
async function loadMermaid() {
  try {
    console.log("Mermaid enabled");

    // Load Mermaid script
    await stellar.loadScript("${js}", { defer: true });

    // Initialize Mermaid
    mermaid.initialize({
      startOnLoad: false,
      theme:
        "${blogTheme.style.darkmode}".startsWith("auto")
          ? window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "${theme}"
          : "${theme}",
      // logLevel: 3,
      flowchart: {
        useMaxWidth: false,
        htmlLabels: true,
        curve: "linear",
      },
      gantt: {
        axisFormat: "%Y/%m/%d",
      },
      sequence: {
        actorMargin: 50,
      },
    });

    // Select the non-processed Mermaid elements
    const mermaidElements = document.querySelectorAll('pre.mermaid:not([data-processed="true"])') || [];
    for (const ele of mermaidElements) {
      try {
        // Wait for the element to be fully loaded
        await new Promise((resolve) => {
          const interval = setInterval(() => {
            if (ele.innerText.trim() !== "") {
              clearInterval(interval);
              resolve();
            }
          }, 20);
        });

        // Render Mermaid Graph
        const uniqueId = "mermaidGraph_" + Math.random().toString(36).substr(2, 9);
        ele.setAttribute("data-processed", "true");
        // print the graph definition
        // console.log("Rendering Mermaid element:\\n", ele.innerText);
        const { svg } = await mermaid.render(uniqueId, ele.innerText);
        ele.innerHTML = svg;
      } catch (renderErr) {
        console.error("Error rendering Mermaid element:", renderErr, ele);
      }
    }
  } catch (err) {
    console.error("Error initializing Mermaid:", err);
  }
}
loadMermaid();
      `
    return <script dangerouslySetInnerHTML={{ __html: loadMermaidScript }} />
  } else {
    return <></>
  }
}

module.exports = MermaidScripts
