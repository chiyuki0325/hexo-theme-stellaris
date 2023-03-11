module.exports = function PostCard(props) {
    const {post} = props;
    const poster = post.poster;
    const postProperties = {
        image: post.cover
    }
    if (poster) {
        postProperties.headline = poster.headline;
        postProperties.topic = poster.topic;
        postProperties.caption = poster.caption;
        postProperties.color = poster.color;
    }
    const Cover = (props) => {
        const {postProperties, post, theme} = props;
        if (postProperties.image || theme.article.auto_cover) {
            let cover_url;
            if (postProperties.image !== undefined) {
                if (postProperties.image.includes('/')) {
                    cover_url = postProperties.image;
                } else {
                    cover_url = 'https://source.unsplash.com/1280x640/?' + postProperties.image;
                }
            } else {
                // 自动以 tags 作为关键词搜索封面
                if (post.tags) {
                    let params = '';
                    post.tags.reverse().forEach((tag, i) => {
                        if (i > 0) {
                            params += ',';
                        }
                        params += tag.name;
                    });
                    cover_url = 'https://source.unsplash.com/1280x640/?' + params;
                } else {
                    cover_url = 'https://source.unsplash.com/random/1280x640';
                }
            }
            if (cover_url) {
                return <div className="post-cover">
                    <img src={cover_url} alt={cover_url}/>
                </div>
            } else {
                return <></>;
            }
        } else {
            return <></>;
        }
    }
    const Title = (props) => {
        const {post, config} = props;
        const title = post.title || post.seo_title;
        return (
            <h2 className="post-title">
                {title ? title : date(post.date, config.date_format)}
            </h2>
        )
    }
    const Excerpt = (props) => {
        const excerptText = (props) => {
            const {post, theme, truncate, strip_html} = props;
            const auto_excerpt = theme.article.auto_excerpt;
            if (post.excerpt) {
                return strip_html(post.excerpt);
            } else if (post.description) {
                return post.description;
            } else if (post.content && auto_excerpt > 0) {
                return truncate(strip_html(post.content), {length: auto_excerpt});
            }
        }
        return (
            <div className="excerpt">
                <p>
                    {excerptText(props)}
                </p>
            </div>
        )
    }
    const Meta = (props) => {
        const {post, date, date_xml, config, __} = props;
        return (
            <div className="meta cap">
                    <span className="cap" id="post-meta">
                        {__("meta.created")}&nbsp;<time dateTime={date_xml(post.date)}>{date(post.date, config.date_format)}</time>
                    </span>
                <Category {...props}/>
            </div>
        )
    }
    const Category = (props) => {
        const {post, category_color} = props;
        const elements = [];
        if (post.categories && post.categories.length > 0) {
            if (post.layout === 'post' && post.categories && post.categories.length > 0) {
                const postCategories = [];
                if (post.categories) {
                    post.categories.forEach((category) => {
                        postCategories.push(category.name);
                    })
                }
                if (postCategories.length > 0) {
                    let category = postCategories.shift();
                    elements.push(
                        <span className="cap breadcrumb" style={category_color(category)}
                              key={category}>{category}</span>
                    );
                }
            }
        }
        if (post.pin) {
            elements.push(
                <span className="pin" key='pin'><img src="/images/pin.svg" alt="pin"/></span>
            );
        }
        return elements;
    }
    const PostCardDefault = (props) => {
        return (
            <article className="md-text">
                {/* 封面 */}
                <Cover {...props}/>
                {/* 标题 */}
                <Title {...props}/>
                {/* 摘要 */}
                <Excerpt {...props}/>
                {/* meta */}
                <Meta {...props}/>
            </article>
        )
    }

    const PostCardPhoto = (props) => {
        const {postProperties} = props;
        return (
            <div className="cover">
                {(() => {
                    const elements = [];
                    elements.push(
                        <img src={postProperties.image} alt={postProperties.image} key={postProperties.image}/>
                    );
                    if (postProperties.headline || postProperties.topic || postProperties.caption) {
                        const style = {
                            position: postProperties.topic ? 'top' : 'bottom',
                        }
                        if (postProperties.color) {
                            style.color = postProperties.color;
                        }
                        elements.push(
                            <div className="cover" key="cover" style={style}>
                                {(() => {
                                    if (postProperties.topic) {
                                        return <div className="cap">{postProperties.topic}</div>
                                    }
                                })()}
                                {(() => {
                                    if (postProperties.headline) {
                                        return <div className="title">{postProperties.headline}</div>
                                    }
                                })()}
                                {(() => {
                                    if (postProperties.caption) {
                                        return <div className="cap">{postProperties.caption}</div>
                                    }
                                })()}
                            </div>
                        )
                    }
                    return elements;
                })()}
            </div>
        )
    }

    if (postProperties.image && postProperties.image.length > 0 && postProperties.headline !== undefined) {
        return <PostCardPhoto postProperties={postProperties} {...props}/>
    } else {
        return <PostCardDefault postProperties={postProperties} {...props}/>
    }
}