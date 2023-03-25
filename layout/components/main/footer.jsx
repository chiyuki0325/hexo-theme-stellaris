const Footer = props => {
    const {config, stellar_info, theme} = props;
    const author = `[@${config.author}](${config.url}${config.root})`;
    const using = `[${stellar_info('name')}](${stellar_info()})`
    const source = theme.footer.source;
    const more = theme.footer.more;
    const SiteMap = props => {
        const {theme, url_for, md_link, md_text, __} = props;
        if (theme.footer.sitemap && Object.keys(theme.footer.sitemap).length > 0) {
            return (
                <div className="sitemap">
                    {(() => {
                        const siteMapGroups = [];
                        for (let group of Object.keys(theme.footer.sitemap)) {
                            let items = theme.footer.sitemap[group];
                            if (items === undefined || items.length === 0) {
                                continue;
                            }
                            siteMapGroups.push(
                                <div className="sitemap-group" key={group}>
                                    <span className="fs14">{group}</span>
                                    {(() => {
                                        const siteMapItems = [];
                                        items.forEach(item => {
                                            siteMapItems.push(
                                                <a href={url_for(md_link(item))} key={item}>{__(md_text(item))}</a>
                                            );
                                        });
                                        return siteMapItems;
                                    })()}
                                </div>
                            );
                        }
                        return siteMapGroups;
                    })()}
                </div>
            )
        } else {
            return <></>;
        }
    }
    const FooterContent = props => {
        const {theme, __, markdown} = props;
        return (
            <div className="text">
                {
                    theme.footer.license &&
                    <div dangerouslySetInnerHTML={{__html: markdown(__('footer.license', theme.footer.license))}}/>
                }
                {
                    source ?
                        <div
                            dangerouslySetInnerHTML={
                                {__html: markdown(__('footer.info_open_source', author, using, source))}
                            }/> :
                        <div
                            dangerouslySetInnerHTML={
                                {__html: markdown(__('footer.info_not_open_source', author, using))}
                            }/>
                }
                <div>{__('footer.powered_by_1')}<a href="https://hexo.io">Hexo</a>{__('footer.powered_by_2')}<a href="https://reactjs.org">React</a>{__('footer.powered_by_3')}</div>
                {
                    theme.footer.icp &&
                    <div dangerouslySetInnerHTML={{__html: markdown(theme.footer.icp)}}/>
                }
                {
                    more && ((() => {
                        if ((typeof more == 'string') && more.constructor === String) {
                            return <p>{more}</p>
                        } else if ((typeof more == 'object') && more.constructor === Array) {
                            const elements = [];
                            more.forEach((item, i) => {
                                elements.push(
                                    <p key={item}>{item}</p>
                                );
                            });
                            return elements;
                        } else {
                            return <></>;
                        }
                    })())
                }
            </div>
        )
    }
    return (
        <footer className="page-footer reveal fs12">
            <hr/>
            <SiteMap {...props}/>
            <FooterContent {...props}/>
        </footer>
    )
}

module.exports = Footer;
