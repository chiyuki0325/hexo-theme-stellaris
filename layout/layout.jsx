module.exports = function Layout(props) {
    const {page, partial, body} = props;
    const Head = require('./components/head.jsx');
    const CoverIndex = partial('_partial/cover/index');
    const SidebarIndex = partial('_partial/sidebar/index');
    const HeaderIndex = partial('_partial/main/header/index');
    const ScriptsIndex = partial('_partial/scripts/index');
    const Footer = partial('_partial/main/footer');
    const MenuButton = partial('_partial/menubtn');
    return (
        <html lang={page.lang}>
        <Head {...props}/>
        <body>
        <div dangerouslySetInnerHTML={{__html: CoverIndex}}/>
        <div className='l_body' id='start'>
            <aside className='l_left' layout={page.layout}>
                <div dangerouslySetInnerHTML={{__html: SidebarIndex}}/>
            </aside>
            <div
                className={"l_main" + (page.content ? "" : " list")}
                dangerouslySetInnerHTML={{__html: HeaderIndex+body+Footer+MenuButton}}
            >
            </div>
        </div>
        <div className="scripts">
            <div dangerouslySetInnerHTML={{__html: ScriptsIndex}}/>
        </div>
        </body>
        </html>
    )
}