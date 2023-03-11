const Related = props => {
    const {theme, page, __, url_for} = props;
    if (page.layout !== "wiki") {
        return <></>;
    }

    const related = [];
    let proj = theme.wiki.projects[page.wiki];
    if (proj.related && proj.related.length > 0) {
        proj.related.forEach((pid, i) => {
            let p = theme.wiki.projects[pid];
            if (p && p.title !== proj.title && p.index !== false) {
                related.push(p);
            }
        });
    }

    if (related.length > 0) {
        return (
            <widget className="widget-wrapper related">
                <div className="widget-header cap theme dis-select">
                    {(() => {
                        let title = __('btn.wiki');
                        if (proj.tags && proj.tags[0]) {
                            title = proj.tags[0];
                        }
                        return <span className="name">{__('meta.more', title)}</span>;
                    })()}
                </div>
                <div className="widget-body related-posts">
                    {related.map((p, i) => {
                        // 同一个分组中的其它项目
                        return (
                            <a className='item wiki' href={url_for(p.homepage.path)} key={i}>
                                <span className="title">{p.title}</span>
                                {(() => {
                                    if (p.description && p.description.length > 0) {
                                        return <span className="excerpt">{p.description}</span>;
                                    }
                                })()}
                            </a>
                        )
                    })}
                </div>
            </widget>
        )
    } else {
        return <></>;
    }
}

module.exports = Related;