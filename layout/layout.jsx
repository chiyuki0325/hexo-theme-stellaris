const Layout = props => {
    const {page, partial, body} = props;
    const Head = require('./components/head.jsx');
    const Cover = require('./components/cover/cover.jsx');
    const SidebarIndex = partial('_partial/sidebar/index');
    const HeaderIndex = partial('_partial/main/header/index');
    const Scripts = require('./components/scripts.jsx');
    const Footer = require('./components/main/footer.jsx');
    const MenuButton = require('./components/menu_button.jsx');
    return (
        <html lang={page.lang}>
        <Head {...props}/>
        <body>
        <Cover {...props}/>
        <div className='l_body' id='start'>
            <aside className='l_left' layout={page.layout}>
                <div dangerouslySetInnerHTML={{__html: SidebarIndex}}/>
            </aside>
            <div className={"l_main" + (page.content ? "" : " list")}>
                <div dangerouslySetInnerHTML={{__html: HeaderIndex}}/>
                <div dangerouslySetInnerHTML={{__html: body}}/>
                <Footer {...props}/>
                <MenuButton />
            </div>
        </div>
        <Scripts {...props}/>
        </body>
        </html>
    )
}

module.exports = Layout;