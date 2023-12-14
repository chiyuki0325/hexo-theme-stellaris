const Recent = props => {
    const {page, site, theme, __, url_for} = props;
    let recentPosts = [];
    if (page.menu_id === 'wiki') {
        recentPosts = theme.wiki.all_pages.filter(p => {
            if (p.wiki) {
                let proj = theme.wiki.tree[p.wiki];
                return proj?.index !== false;
            }
            return false;
        })
        recentPosts = recentPosts.sort((p1, p2) => p1.updated > p2.updated ? -1 : 1);
    } else {
        recentPosts = site.posts.filter(p => p.title && p.title.length > 0);
        recentPosts = recentPosts.sort("updated", -1);
    }
    recentPosts.length = props.limit;

    return (
        <widget className="widget-wrapper recent">
            <div className="widget-header cap theme dis-select">
                <span className="name">{__("meta.recent_update")}</span>
                {props.rss &&
                    <a className="cap-action" id="rss" title="Subscribe" href={props.rss}>
                        <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                             p-id="8938">
                            <path
                                d="M800.966 947.251c0-404.522-320.872-732.448-716.69-732.448V62.785c477.972 0 865.44 395.987 865.44 884.466h-148.75z m-162.273 0h-148.74c0-228.98-181.628-414.598-405.678-414.598v-152.01c306.205 0 554.418 253.68 554.418 566.608z m-446.24-221.12c59.748 0 108.189 49.503 108.189 110.557 0 61.063-48.44 110.563-108.188 110.563-59.747 0-108.18-49.5-108.18-110.563 0-61.054 48.433-110.556 108.18-110.556z"
                                p-id="8939"></path>
                        </svg>
                    </a>
                }
            </div>
            <div className="widget-body related-posts fs14">
                {recentPosts.map(post => {
                    if (!post) {
                        return <></>
                    }
                    return (
                        <a className='item title' href={url_for(post.link || post.path)} key={post.path}>
                            <span className="title">
                                {(()=>{
                                    const itemTitle = [];
                                    if (post.layout === 'wiki') {
                                        const proj = theme.wiki.tree[post.wiki];
                                        const name = proj?.name || post?.wiki;
                                        if (name) {
                                            itemTitle.push(
                                                <strong key='wiki_name'>{name}</strong>
                                            );
                                            itemTitle.push(
                                                <span className="dot" key='dot'></span>
                                            );
                                        }
                                    }
                                    itemTitle.push(
                                        (post.title || post.seo_title || post.wiki)
                                    )
                                    return itemTitle;
                                })()}
                            </span>
                        </a>
                    )
                })}
            </div>
        </widget>
    )
}

module.exports = Recent;
