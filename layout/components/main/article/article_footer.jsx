const ArticleFooter = props => {
    const {theme, page, __} = props;
    const item = [];
    if (page.references && page.references.length > 0) {
        item.push('references');
    }
    if (page.layout !== 'wiki') {
        if (theme.article.license && theme.article.license.length > 0) {
            item.push('license');
        }
        if (theme.article.share && theme.article.share.length > 0) {
            item.push('share');
        }
    }
    if (item.length === 0) {
        return <></>;
    }
    const ReferencesSection = props => {
        const {page, __} = props;
        if (page.layout === 'post') {
            if (page.references && page.references.length > 0) {
                return (
                    <section id="references">
                        <div className="header">
                            <span>{__('meta.references')}</span>
                        </div>
                        <div className="body">
                            <ul>
                                {page.references.map(item => {
                                    return (
                                        <li className="post-title" key={item.url}>
                                            <a href={item.url}
                                               target={item.url.includes('://') ? '_blank' : ''}
                                               rel={item.url.includes('://') ?
                                                   'external nofollow noopener noreferrer' :
                                                   'noopener noreferrer'}>
                                                {item.title || item.url}
                                            </a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </section>
                )
            } else {
                return <></>;
            }
        } else {
            return <></>;
        }
    }
    const LicenseSection = props => {
        const {theme, page, __, markdown} = props;
        if (page.layout === 'post') {
            if (theme.article.license && theme.article.license.length > 0) {
                return (
                    <section id="license">
                        <div className="header">
                            <span>{__('meta.license')}</span>
                        </div>
                        <div className="body"
                             dangerouslySetInnerHTML={{__html: markdown(page.license || theme.article.license)}}
                        />
                    </section>
                )
            } else {
                return <></>;
            }
        } else {
            return <></>;
        }
    }
    const ShareSection = props => {
        const {theme, page, __, truncate, strip_html, config, url_for} = props;
        if (page.layout === 'post') {
            if (theme.article.share && page.share !== false) {
                return (
                    <section id="share">
                        <div className="header">
                            <span>{__('meta.share')}</span>
                        </div>
                        <div className="body">
                            <div className="link">
                                <input className="copy-area" id="copy-link" value={page.permalink} readOnly={true}/>
                            </div>
                            <div className="social-wrap dis-select">
                                {theme.article.share.map(item => {
                                    if (['wechat', 'weibo', 'telegram', 'email', 'link'].includes(item)) {
                                        const shareTitle = page.seo_title || (page.title + ' - ' + config.title)
                                        const shareSummary = truncate(
                                            page.description || strip_html(page.excerpt || page.content),
                                            {length: 120}
                                        );
                                        switch (item) {
                                            case 'weibo':
                                                let sharePic;
                                                if (page.layout === 'post' && page.cover) {
                                                    sharePic = '&pic=' + page.cover;
                                                } else if (page.latyout === 'wiki' && page.logo && page.logo.src) {
                                                    sharePic = '&pic=' + page.logo.src;
                                                } else {
                                                    sharePic = '';
                                                }
                                                return (
                                                    <a className="social share-item weibo"
                                                       target="_blank"
                                                       rel="external nofollow noopener noreferrer"
                                                       href={`https://service.weibo.com/share/share.php?title=${shareTitle}&url=${page.permalink}${sharePic}&searchPic=false&style=simple&summary=${shareSummary}`}
                                                       key={item}
                                                    >
                                                        <img src={url_for('/images/weibo.svg')} alt='weibo'/>
                                                    </a>
                                                )
                                            case 'wechat':
                                                return (
                                                    <a className="social share-item wechat on-click-event"
                                                       data-on-click="util.toggle('qrcode-wechat');"
                                                       key={item}
                                                    >
                                                        <img src={url_for('/images/wechat.svg')} alt='wechat'/>
                                                    </a>
                                                )
                                            case 'telegram':
                                                return (
                                                    <a className="social share-item telegram"
                                                       target="_blank"
                                                       rel="external nofollow noopener noreferrer"
                                                       href={`https://t.me/share/url?url=${encodeURIComponent(page.permalink)}&text=${encodeURIComponent('**' + shareTitle + '**')}%0a${encodeURIComponent(shareSummary)}`}
                                                       key={item}
                                                    >
                                                        <img src={url_for('/images/telegram.svg')} alt='telegram' />
                                                    </a>
                                                )
                                            case 'email':
                                                return (
                                                    <a className="social share-item email"
                                                       href={`mailto:?subject=${shareTitle}&body=${shareSummary} ${page.permalink}`}
                                                       key={item}
                                                    >
                                                        <img src={url_for('/images/email.svg')} alt='email'/>
                                                    </a>
                                                )
                                            case 'link':
                                                return (
                                                    <a className="social share-item link on-click-event"
                                                       data-on-click={`util.copy('copy-link', "${__('message.copied')}")`}
                                                       key={item}
                                                    >
                                                        <img src={url_for('/images/link_icon.svg')} alt='link'/>
                                                    </a>
                                                )
                                        }
                                    }
                                })}
                            </div>
                            {theme.article.share.includes('wechat') &&
                                <div className="qrcode" id="qrcode-wechat" style={{visibility: "hidden", height: "0"}}>
                                    <img
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${page.permalink}`}
                                        alt="qrcode-wechat"/>
                                </div>
                            }
                        </div>
                    </section>
                )
            } else {
                return <></>;
            }
        } else {
            return <></>;
        }
    }

    return (
        <div className="article-footer reveal fs14">
            <ReferencesSection {...props}/>
            <LicenseSection {...props}/>
            <ShareSection {...props}/>
        </div>
    )
}

module.exports = ArticleFooter;
