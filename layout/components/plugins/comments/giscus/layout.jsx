const {Fragment} = require('react');
const GiscusLayout = props => {
    const {page, theme} = props;
    const cmt = 'giscus';
    // 合并配置参数
    var config = Object.assign({}, theme.comments[cmt]);
    if (page.layout === 'wiki' && page.wiki) {
        let proj = theme.wiki.tree[page.wiki];
        if (proj[cmt] !== undefined) {
            Object.assign(config, proj[cmt]);
        }
    }
    Object.assign(config, page[cmt]);
    // 合并评论数据
    if (config['issue-number'] !== null) {
        config['issue-term'] = null;
    } else {
        if (page.comment_id !== undefined) {
            config['issue-term'] = page.comment_id;
        } else if (page.layout === 'wiki' && page.wiki) {
            let proj = theme.wiki.tree[page.wiki];
            if (proj.comment_id !== undefined) {
                config['issue-term'] = proj.comment_id;
            }
        }
    }
    // 布局
    return (
        <Fragment>
            <svg className="loading" style={{verticalAlign: "middle", fill: "currentColor", overflow: "hidden"}}
                 viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2709">
                <path
                    d="M832 512c0-176-144-320-320-320V128c211.2 0 384 172.8 384 384h-64zM192 512c0 176 144 320 320 320v64C300.8 896 128 723.2 128 512h64z"
                    p-id="2710"></path>
            </svg>
            <div id={cmt} {...config}/>
        </Fragment>
    )
}

module.exports = GiscusLayout;
