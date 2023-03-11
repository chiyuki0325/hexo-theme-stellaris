const PostCover = require('./post_cover.jsx');
const WikiCover = require('./wiki_cover.jsx');

const Cover = props => {
    const {page} = props;
    switch (page.layout) {
        case 'post':
            return <PostCover {...props}/>;
        case 'wiki':
            return <WikiCover {...props}/>;
        default:
            return <></>;
    }
}

module.exports = Cover;