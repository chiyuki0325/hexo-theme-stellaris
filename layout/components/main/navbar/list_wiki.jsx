module.exports = function NavBarListWiki(props) {
    const {page, config, theme, url_for, __} = props;
    return (
        <div className="nav-wrap">
            <nav className="sub wiki cap">
                {/* 所有项目 */}
                <a className={(page.filter === false) ? "active" : ""} href={url_for(config.wiki_dir || "/wiki/")}>
                    {__("btn.all_wiki")}
                </a>
                {/*项目分类*/}
                {(()=>{
                    const { shelf, all_tags } = theme.wiki;
                    for (let id of Object.keys(all_tags)) {
                        let tag = all_tags[id];
                        let projects = tag.items.filter(item => shelf.includes(item))
                        if (projects && projects.length > 0) {
                            const isActive = (tag.name && tag.name.length > 0 && page.tagName === tag.name);
                            return <a className={isActive ? "active" : ""} href={url_for(tag.path)}>
                                {tag.name}
                            </a>
                        }
                    }
                })()}
            </nav>
        </div>
    )
}
