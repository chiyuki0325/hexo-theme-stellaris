const SidebarMenu = props => {
    const {theme, md_text, md_link, url_for, page, __, where} = props;
    return (
        <nav className={`menu dis-select ${where === 'main' ? 'mobile-hidden' : ''}`}>
            {Object.keys(theme.sidebar.menu).map(id => {
                const item = theme.sidebar.menu[id];
                if (!item || item.length === 0) {
                    return <></>;
                }
                return (
                    <a className={`nav-item ${id === page.menu_id ? 'active' : ''}`}
                       href={url_for(md_link(item))}
                       key={id}
                    >
                        {__(md_text(item))}
                    </a>
                )
            })}
        </nav>
    )
}

module.exports = SidebarMenu;