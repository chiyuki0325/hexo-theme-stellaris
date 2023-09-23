const {Fragment} = require('react')

const CommentsScript = props => {
    const commentService = props.theme.comments.service
    if (commentService === false || commentService === null ){
        return <Fragment></Fragment>
    } else {
        try {
            const CommentScript = require(`./${commentService}/script.jsx`)
            return <CommentScript {...props} />
        } catch (e) {
            if (e.code === 'MODULE_NOT_FOUND') {
                return <Fragment></Fragment>
            } else {
                throw(e)
            }
        }
    }
}

module.exports = CommentsScript
