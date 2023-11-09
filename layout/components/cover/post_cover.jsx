const PostCover = props => {
    const {page, theme, scroll_reveal} = props;
    if ((page.banner === undefined || page.banner === false) && !theme.article.auto_banner) {
        return <></>;
    }
    let coverUrl = '';
    if (page.banner !== undefined) {
        if (page.banner.includes('/')) {
            coverUrl = page.banner;
        } else {
            coverUrl = 'https://source.unsplash.com/2000x400/?' + page.banner;
        }
    } else {
        // 自动以 tags 作为关键词搜索封面
        if (page.tags) {
            let params = '';
            page.tags.reverse().forEach((tag, i) => {
                if (i > 0) {
                    params += ',';
                }
                params += tag.name;
            });
            coverUrl = 'https://source.unsplash.com/2000x400/?' + params;
        } else {
            coverUrl = 'https://source.unsplash.com/random/2000x400';
        }
    }
    let imageElement = '';
    if (theme.plugins.lazyload && theme.plugins.lazyload.enabled) {
        imageElement = <div className="lazy img bg" data-bg={coverUrl}></div>
    } else {
        imageElement = <div className="lazy img bg" style={{backgroundImage: `url("${coverUrl}")`}}></div>
    }
    return (
        <div className={"l_cover post" + scroll_reveal()}>
            <div className="cover">
                {imageElement}
            </div>
        </div>
    )
}

module.exports = PostCover;
