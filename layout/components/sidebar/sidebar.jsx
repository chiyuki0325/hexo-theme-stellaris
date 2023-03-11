const {Fragment} = require('react');
const SidebarHeader = require('./header.jsx');
const HeaderTitle = require('./title.jsx');
const Sidebar = props => {
    const {page, theme, is_home, is_category, is_tag, is_archive} = props;
    let proj;
    if (page.layout === 'wiki' && page.wiki) {
        proj = theme.wiki.projects[page.wiki];
    }

    // 默认组件
    if (page.sidebar === undefined) {
        if (page.layout === 'post' && page.content) {
            page.sidebar = theme.sidebar.widgets.post;
        } else if (page.layout === 'wiki' && page.content && page.wiki) {
            let proj = theme.wiki.projects[page.wiki];
            if (proj.sidebar) {
                page.sidebar = proj.sidebar;
            } else {
                page.sidebar = theme.sidebar.widgets.wiki;
            }
        } else if (is_home()) {
            page.sidebar = theme.sidebar.widgets.home;
        } else if (is_category() || is_tag() || is_archive() || ['categories', 'tags', 'archives'].includes(page.layout)) {
            page.sidebar = theme.sidebar.widgets.blog_index;
        } else if (['wiki_index'].includes(page.layout)) {
            page.sidebar = theme.sidebar.widgets.wiki_index;
        } else if (['404', undefined].includes(page.layout)) {
            page.sidebar = theme.sidebar.widgets.others;
        } else if (page.layout === 'page') {
            page.sidebar = theme.sidebar.widgets.page;
        } else {
            page.sidebar = [];
        }
    }

    // parse array string
    if (typeof page.sidebar == 'string') {
        page.sidebar = page.sidebar.replace(/ /g, '').split(',');
    }

    const Widgets = props => {
        const WikiWidget = props => {
            const {url_for, theme, md_text, md_link, config, __} = props;
            if (proj === undefined) {
                proj = (
                    (page.menu_id && theme.sidebar.menu[page.menu_id] && md_link(theme.sidebar.menu[page.menu_id])) &&
                    {
                        path: md_link(theme.sidebar.menu[page.menu_id]),
                        wiki: __(md_text(theme.sidebar.menu[page.menu_id]))
                    }
                )
            }

            if (page.layout === 'wiki' && proj && page.menu_id === 'wiki') {
                return (
                    <widget className="widget-wrapper logo-wrap wiki" key="wiki">
                        <div className="widget-body">
                            <a style={{filter: "grayscale(100%)"}}
                               className="wiki-home cap"
                               href={url_for(config.wiki_dir)}>
                                <svg aria-hidden="true" viewBox="0 0 16 16" width="1rem" height="1rem"
                                     fill="currentColor">
                                    <path fillRule="evenodd"
                                          d="M7.78 12.53a.75.75 0 01-1.06 0L2.47 8.28a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 1.06L4.81 7h7.44a.75.75 0 010 1.5H4.81l2.97 2.97a.75.75 0 010 1.06z"/>
                                </svg>
                                {__('btn.all_wiki')}
                            </a>
                            {(() => {
                                let main = proj.name || proj.title || page.wiki || page.title;
                                let url = proj.homepage.path;
                                let sub = proj.subtitle;
                                return <HeaderTitle main={main} url={url} sub={sub} {...props}/>
                            })()}
                        </div>
                    </widget>
                )
            } else {
                return <></>;
            }
        }
        const SidebarWidgets = props => {
            const {page, theme, partial} = props;
            const elements = [];
            page.sidebar.forEach(w => {
                let name = ''
                let widget = {}
                if (typeof w == 'string') {
                    name = w
                } else if (typeof w == 'object' && w.override) {
                    name = w.override
                }
                if (name in theme.data.widgets) {
                    Object.assign(widget, theme.data.widgets[name])
                }
                if (typeof w == 'object' && (w.override || w.layout)) {
                    Object.assign(widget, w)
                }
                if (widget && widget.layout) {
                    // compatible
                    elements.push(
                        <div dangerouslySetInnerHTML={{__html: partial('_partial/widgets/' + widget.layout, {item: widget})}}
                             key={widget.layout}/>
                    )
                }
            });
            return elements;
        }

        return (
            <div className="widgets">
                <WikiWidget {...props}/>
                <SidebarWidgets {...props}/>
            </div>
        )
    }

    const Footer = props => {
        const {page, theme, url_for} = props;
        if (page.layout !== 'wiki' && theme.footer.social) {
            return (
                <footer className="footer dis-select">
                    <div className="social-wrap">
                        {Object.keys(theme.footer.social).map(id => {
                            const item = theme.footer.social[id];
                            if (item.icon && (item.url || item.onclick)) {
                                const itemIsUrl = item.url.includes('://');
                                return (
                                    <a className="social on-click-event"
                                       title={item.title || ''}
                                       href={item.url ? url_for(item.url) : ''}
                                       target={itemIsUrl ? '_blank' : ''}
                                       rel={itemIsUrl ?
                                           'external nofollow noopener noreferrer' :
                                           'noopener noreferrer'}
                                       dangerouslySetInnerHTML={{__html: item.icon}}
                                       data-on-click={item.onclick || ''}
                                       key={id}
                                    >
                                    </a>
                                )
                            }
                        })}
                    </div>
                </footer>
            )
        } else {
            return <></>;
        }
    }
    return (
        <Fragment>
            {(page.header === undefined || page.header === 'left' || page.header === 'auto') && <SidebarHeader where="sidebar" {...props}/>}
            <Widgets {...props}/>
            <Footer {...props}/>
        </Fragment>
    )
}

module.exports = Sidebar;