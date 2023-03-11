// 由 Copilot 转换而成，不保证可用性

const GitHubIssues = props => {
    const {page, theme} = props;
    let repo;
    let branch = 'main';
    if (page.repo) {
        repo = page.repo;
    } else if (page.layout === 'wiki' && page.wiki) {
        let proj = theme.wiki.projects[page.wiki];
        if (proj && proj.repo) {
            repo = proj.repo;
            if (proj.branch !== undefined) {
                branch = proj.branch;
            }
        }
    }
    if (repo === undefined) {
        return <></>;
    }
    let api = theme.api_host.ghapi + '/repos/' + repo + '/issues?per_page=' + props.limit;
    if (props.labels) {
        api += '&labels=' + props.labels;
    }
    return (
        <widget className="widget-wrapper timeline">
            {props.title &&
                <div className="widget-header cap theme dis-select">
                    <span className="name">{props.title}</span>
                </div>
            }
            <div className="widget-body fs14">
                <div className="tag-plugin timeline stellar-timeline-api" api={api} user={props.user && props.user}/>
            </div>
        </widget>
    );
}

module.exports = GitHubIssues;