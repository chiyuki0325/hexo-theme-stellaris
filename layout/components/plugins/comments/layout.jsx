const Comments = props => {
    const {theme, page, markdown, __} = props;
    let loadComment = false;
    if (theme.comments.service && theme.comments.service.length > 0) {
        if (page.comments === undefined || page.comments !== false) {
            loadComment = true;
        }
    }
    // 合并wiki评论
    let proj = theme.wiki.tree[page.wiki]
    if (loadComment && page.layout === 'wiki' && page.wiki && (proj != null)) {
        if (proj.comment_title !== undefined && page.comment_title === undefined) {
            if (['utterances', 'beaudar', 'giscus'].includes(theme.comments.service)) {
                page.comment_title = proj.comment_title;
            }
        }
    }

    if (loadComment) {
        const commentTitle = page.comment_title !== undefined ? markdown(page.comment_title) : __('meta.comment_title');
        const CommentLayout = require('./' + theme.comments.service + '/layout.jsx');
        return (
            <div className='related-wrap md-text reveal' id="comments">
                <div className='cmt-title cap theme'
                     dangerouslySetInnerHTML={{__html: commentTitle}}
                />
                <div className={'cmt-body ' + theme.comments.service}>
                    <CommentLayout {...props} />
                </div>
            </div>
        )
    } else {
        return <></>;
    }
}

module.exports = Comments;
