module.exports = function NavBarListPost(props) {
    const {site, page, config, theme} = props;
    const {is_home, is_archive, url_for, full_url_for, __} = props;
    return (
        <div className="nav-wrap">
            <nav className="sub post cap">

                <a className={is_home() ? "active" : ""} href={url_for("/")}>
                    {__("btn.recent_publish")}
                </a>

                {(() => {
                    if (site.categories && site.categories.length > 0) {
                        if (page.category) {
                            return <a className="active" href={url_for(config.category_dir)}>
                                {__("btn.category") + __("symbol.colon") + page.category}
                            </a>
                        } else {
                            return (
                                <a className={(page.layout === "categories") ? "active" : ""}
                                   href={url_for(config.category_dir)}>
                                    {__("btn.categories")}
                                </a>
                            )
                        }
                    }
                })()}

                {(() => {
                    if (site.tags && site.tags.length > 0) {
                        if (page.tag) {
                            return <a className="active" href={url_for(config.tag_dir)}>
                                {__("btn.tag") + __("symbol.colon") + page.tag}
                            </a>
                        } else {
                            return (
                                <a className={(page.layout === "tags") ? "active" : ""}
                                   href={url_for(config.tag_dir)}>
                                    {__("btn.tags")}
                                </a>
                            )
                        }
                    }
                })()}

                <a className={is_archive() ? "active" : ""} href={url_for(config.archive_dir)}>
                    {__("btn.archives")}
                </a>

                {(() => {
                    const elements = [];
                    if (theme['post-index']) {
                        const postIndex = theme['post-index'];
                        for (let key of Object.keys(postIndex)) {
                            elements.push(
                                <a
                                    className={(full_url_for(page.path) === full_url_for(postIndex[key])) ? "active" : ""}
                                    href={url_for(postIndex[key])}>
                                    key={key}
                                    {key}
                                </a>
                            )
                        }
                    }
                    return elements;
                })()}
            </nav>
        </div>
    )
}