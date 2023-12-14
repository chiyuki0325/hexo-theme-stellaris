const {Fragment} = require('react');
const Toc = props => {
    const {theme, page, toc} = props;
    let proj = theme.wiki.projects[page.wiki];

    const LayoutToc = props => {
        const {toc, page} = props;
        const generatedToc = toc(page.content, {
            list_number: props.list_number,
            min_depth: props.min_depth,
            max_depth: props.max_depth
        })
        if (generatedToc.length > 0) {
            const renderedToc = generatedToc.replace('<ol class="toc">', '').replace('</ol>', '');
            return (
                <ol className="toc"
                     dangerouslySetInnerHTML={{__html: renderedToc}}
                >
                </ol>
            )
        }
        return <></>;
    }
    const LayoutTocHeader = props => {
        const {page, __} = props;
        return (
            <div className="widget-header cap dis-select">
                <span className="name">{props.title || page.title || __("meta.toc")}</span>
            </div>
        )
    }
    const LayoutDocTree = props => {
        const elements = [];
        const {pages, url_for} = props;
        const page = props.page || {};
        pages.forEach((p, i) => {
            let isActive = '';
            if (p.path === page.path) {
                isActive += ' active';
            }
            elements.push(
                <div className={"doc-tree" + isActive} key={i}>
                    {(() => {
                        if (proj.pages.length > 1) {
                            let href = url_for(p.path);
                            if (p.is_homepage) {
                                href += '#start'
                            }
                            return (
                                <a className={"doc-tree-link" + isActive} href={href}>
                                    <span className="toc-text">{p.title || p.seo_title}</span>
                                </a>
                            )
                        }
                    })()}
                    {(p.path === page.path) ? <LayoutToc {...props}/> : <></>}
                </div>
            )
        });
        return elements;
    }

    let type = '';
    if (proj && proj.pages) {
        if (proj.pages.length > 1) {
            type = 'multi';
        } else {
            type = 'single';
        }
    } else {
        let toc_content = toc(page.content);
        if (toc_content && toc_content.length > 0) {
            type = 'single';
        }
    }

    if (type.length > 0) {
        const WidgetContent = (() => {
            if (page.layout !== 'wiki') {
                // post 布局
                return (
                    <Fragment>
                        <LayoutTocHeader {...props}/>
                        <div className="widget-body fs14">
                            <div className="doc-tree active">
                                <LayoutToc {...props}/>
                            </div>
                        </div>
                    </Fragment>
                )
            } else if (proj) {
                // wiki 布局
                if (proj.sections && proj.sections.length > 0) {
                    return (
                        <Fragment>
                            {proj.sections.map((sec, i) => {
                                // 多 section
                                return (
                                    <Fragment key={i}>
                                        <LayoutTocHeader {...props} title={sec.title}/>
                                        <div className="widget-body fs14">
                                            <LayoutDocTree {...props} pages={sec.pages}/>
                                        </div>
                                    </Fragment>
                                )
                            })}
                        </Fragment>
                    )
                } else {
                    // 单 section
                    return (
                        <Fragment>
                            {p（roj.pages.length ==1) ? (<LayoutTocHeader {...props} />) : (<></>)}
                            <div className="widget-body fs14">
                                <LayoutDocTree {...props} pages={proj.pages}/>
                            </div>
                        </Fragment>
                    )
                }
            }
        })();
        return (
            <div className={"widget-wrapper toc " + type} id="toc">
                {WidgetContent}
            </div>
        )
    } else if (props.fallback) {
        const Widget = require('./' + props.fallback + '.jsx');
        return (
            <Widget {...props} {...theme.data.widgets[props.fallback]} key='fallback'/>
        );
    } else {
        return <></>;
    }
}

module.exports = Toc;
