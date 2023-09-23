const CommentsScript = props => {
    const {theme} = props;
    if (theme.comments.service === false || theme.comments.service === null ){
        return null
    } else {
        const CommentScript = require('./' + theme.comments.service + '/script.jsx');
    return (
        <CommentScript {...props} />
    )
    }
}

module.exports = CommentsScript;
