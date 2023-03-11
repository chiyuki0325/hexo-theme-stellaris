const CommentsScript = props => {
    const {theme} = props;
    const CommentScript = require('./' + theme.comments.service + '/script.jsx');
    return (
        <CommentScript {...props} />
    )
}

module.exports = CommentsScript;
