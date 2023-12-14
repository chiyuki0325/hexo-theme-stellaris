const {Fragment} = require('react');
const Category = require('./list_categories.jsx');
const CreatedUpdatedDate = props => {
    const {__, page, config, date, date_xml} = props;
    return (
        <span>
            {__("meta.created")}&nbsp;
            <time dateTime={date_xml(page.date)}>{date(page.date, config.date_format)}</time>
            {(() => {
                if (page.updated !== page.date) {
                    return (
                        <Fragment>
                            ，{__("meta.updated")}&nbsp;
                            <time dateTime={date_xml(page.updated)}>{date(page.updated, config.date_format)}</time>
                        </Fragment>
                    );
                } else {
                    return <></>;
                }
            })()}
        </span>
    )
}

// 最外层组件
const BreadNav = props => (
    <div className="bread-nav fs12">
        {props.children}
    </div>
)

const Breadcrumb = props => {
    const {theme, page, config, date, date_xml, url_for, __, md_link, md_text} = props;

    if (page.breadcrumb === false) {
        return <></>;
    }

    let home_title = __("btn.home");
    if (theme.breadcrumb && theme.breadcrumb.home) {
        if (theme.breadcrumb.home === 'config.title') {
            home_title = config.title;
        } else if (theme.breadcrumb.home === 'config.author') {
            home_title = config.author;
        } else if (theme.breadcrumb.home !== 'home') {
            home_title = theme.breadcrumb.home;
        }
    }

    if (page.layout === "post") {
        const PostMeta = props => {
            return <div id="post-meta">
                    <CreatedUpdatedDate {...props}/>
                    <span id="outdated"></span>
                </div>
        }

        return (
            <BreadNav>
                <div className="left">
                    <div id="breadcrumb">
                        <a className="cap breadcrumb" href={config.root}>{home_title}</a>
                        <span className="sep"></span>
                        <a className="cap breadcrumb" href={config.root}>{__("btn.blog")}</a>
                        <Category {...props}/>
                    </div>
                    <PostMeta {...props} />
                </div>
            </BreadNav>
        )

    } else if (page.layout === "wiki" && page.wiki && page.wiki.length > 0) {

        const nodes = ['/'];
        const proj = theme.wiki.tree[page.wiki];

        const Menu = props => {
            const {theme, page, url_for, __} = props;
            if (page.menu_id && theme.sidebar.menu[page.menu_id] && md_link(theme.sidebar.menu[page.menu_id])) {
                const url = url_for(md_link(theme.sidebar.menu[page.menu_id]));
                nodes.push(url);
                return <a className="cap breadcrumb" id="menu"
                          href={url}>{__(md_text(theme.sidebar.menu[page.menu_id]))}</a>
            } else {
                const url = url_for(config.wiki_dir || "/wiki/");
                nodes.push(url);
                return <a className="cap breadcrumb" id="menu" href={url}>{__("btn.wiki")}</a>
            }
        }

        const ProjectName = props => {
            const {theme, page, url_for, proj} = props;
            if (proj) {
                const url_proj = url_for(proj.homepage.path);
                if (nodes.includes(url_proj) === false) {
                    return (
                        <Fragment>
                            <span className="sep"></span>
                            <a className="cap breadcrumb" id="proj" href={url_proj}>{(proj.name || proj.title)}</a>
                        </Fragment>
                    )
                } else {
                    return <></>
                }
            } else {
                return <></>
            }
        }

        const Repo = props => {
            const {page, proj, theme} = props
            let repo = page?.repo || proj?.repo || undefined
            if (repo) {
                return <>
                    <div className="right ghrepo stellar-ghinfo-api" api={theme.api_host.ghapi + "/repos/" + repo}>
                        <a className="repo-link bold" href={"https://github.com/" + repo}>
                            <svg aria-hidden="true" role="img" className="color-icon-primary" viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor" style={{userSelect: "none", verflow: "visible"}}><path fillRule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path></svg>
                            <span type="text">{repo}</span>
                        </a>
                        <a className="repo-link" href={"https://github.com/" + repo + "/stargazers"}>
                            <svg aria-hidden="true" role="img" className="color-icon-primary" viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor" style={{userSelect: "none", overflow: "visible"}}><path fillRule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
                            <span type="text" id="stargazers_count">0</span><span>stars</span>
                        </a>
                        <a className="repo-link" href={"https://github.com/" + repo + "/forks"}>
                            <svg aria-hidden="true" role="img" className="color-icon-primary" viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor" style={{userSelect: "none", overflow: "visible"}}><path fillRule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg>
                            <span type="text" id="forks_count">0</span><span>forks</span>
                        </a>
                    </div>
                </>
            } else {
                return <></>
            }
        }

        const WikiPostMeta = props => (
            <div id="post-meta">
                <CreatedUpdatedDate {...props}/>
            </div>
        )

        return (
            <BreadNav>
                <div className="left">
                    <div id="breadcrumb">
                        <a className="cap breadcrumb" href={config.root}>{home_title}</a>
                        <span className="sep"></span>
                        <Menu {...props}/>
                        <ProjectName {...props} proj={proj}/>
                    </div>
                    <WikiPostMeta {...props} />
                </div>
                <Repo {...props} proj={proj} />
            </BreadNav>
        )

    } else if (page.title || page.seo_title) {
        return (
            <BreadNav>
                <div className="left">
                    <div id="breadcrumb">
                        <a className="cap breadcrumb" href={config.root}>{home_title}</a>
                        <span className="sep"></span>
                        <a className="cap breadcrumb" href={url_for(page.path)}>{(page.title || page.seo_title)}</a>
                    </div>
                </div>
            </BreadNav>
        )
    } else {
        return <></>
    }
}

module.exports = Breadcrumb;
