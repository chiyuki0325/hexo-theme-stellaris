const {Fragment} = require('react');
const Category = require('./list_categories.jsx');
const CreatedUpdatedDate = props => {
    const {__, page, config, date, date_xml} = props;
    return (
        <Fragment>
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
        </Fragment>
    )
}

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

    let element = <></>;
    if (page.layout === "post") {
        element = (
            <div className="bread-nav fs12">
                <div id="breadcrumb">
                    <a className="cap breadcrumb" href={config.root}>{home_title}</a>
                    <span className="sep"></span>
                    <a className="cap breadcrumb" href={config.root}>{__("btn.blog")}</a>
                    <Category {...props}/>
                </div>
                <div id="post-meta">
                    <CreatedUpdatedDate {...props}/>
                    <span id="outdated"></span>
                </div>
            </div>
        )
    } else if (page.layout === "wiki" && page.wiki && page.wiki.length > 0) {
        const nodes = ['/'];
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
            const {theme, page, url_for} = props;
            const proj = theme.wiki.projects[page.wiki];
            const url_proj = url_for(proj.homepage.path);
            if (nodes.includes(url_proj) === false) {
                return (
                    <Fragment>
                        <span className="sep"></span>
                        <a className="cap breadcrumb" id="proj" href={url_proj}>{(proj.name || proj.title)}</a>
                    </Fragment>
                )
            }
        }
        element = (
            <div className="bread-nav fs12">
                <div id="breadcrumb">
                    <a className="cap breadcrumb" href={config.root}>{home_title}</a>
                    <span className="sep"></span>
                    <Menu {...props}/>
                    <ProjectName {...props}/>
                </div>
                <div id="post-meta">
                    <CreatedUpdatedDate {...props}/>
                </div>
            </div>
        )
    } else if (page.title || page.seo_title) {
        element = (
            <div className="bread-nav fs12">
                <div id="breadcrumb">
                    <a className="cap breadcrumb" href={config.root}>{home_title}</a>
                    <span className="sep"></span>
                    <a className="cap breadcrumb" href={url_for(page.path)}>{(page.title || page.seo_title)}</a>
                </div>
            </div>
        )
    }
    return element;
}

module.exports = Breadcrumb;
