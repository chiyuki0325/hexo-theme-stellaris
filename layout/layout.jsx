const Layout = props => {
    const {page, body} = props;
    const Head = require('./components/head.jsx');
    const Cover = require('./components/cover/cover.jsx');
    const Sidebar = require('./components/sidebar/sidebar.jsx');
    const Header = require('./components/main/header.jsx');
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
                <Sidebar {...props}/>
            </aside>
            <div className={"l_main" + (page.content ? "" : " list")}>
                <Header {...props}/>
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