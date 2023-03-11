// 由 Copilot 转换而成，不保证可用性

const SidebarMenu = require('../sidebar/menu.jsx');
const GitHubUser = props => {
    const buttons = [
        {
            key: 'followers',
            desc: 'followers',
            href: '?tab=followers'
        },
        {
            key: 'following',
            desc: 'following',
            href: '?tab=following'
        },
        {
            key: 'public_repos',
            desc: 'repos',
            href: '?tab=repositories'
        }
    ];

    if (props.username === undefined || props.username.length === 0) {
        return <></>;
    }

    return (
        <widget className="widget-wrapper ghuser">
            <div className="widget-body stellar-ghinfo-api"
                 api={props.theme.api_host.ghapi + '/users/' + props.username}>
                {props.avatar &&
                    <div className="avatar">
                        <img no-lazy type="img" id="avatar_url" src={props.config.avatar} alt="ghuser"/>
                    </div>
                }
                <a className="username" type="text" id="name" href={`https://github.com/${props.username}`}>&nbsp;</a>
                <p className="bio" type="text" id="bio">&nbsp;</p>
                <div className="buttons">
                    {buttons.map((btn, i) => {
                        return (
                            <a className="button" key={i} href={`https://github.com/${props.username}${btn.href}`}>
                                <span className="title" type="text" id={btn.key}>0</span>
                                <span className="desc">{btn.desc}</span>
                            </a>
                        );
                    })}
                </div>
                <a className="follow" href={`https://github.com/${props.username}`}>
                    <svg aria-hidden="true" role="img" className="color-icon-primary" viewBox="0 0 16 16" width="1rem"
                         height="1rem" fill="currentColor" style={{
                        display: 'inline-block',
                        userSelect: 'none',
                        verticalAlign: 'text-bottom',
                        overflow: 'visible'
                    }}>
                        <path fill-rule="evenodd"
                              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                    Follow
                </a>
                {props.menu &&
                    <SidebarMenu where='sidebar' {...props} />
                }
            </div>
        </widget>
    )

}

module.exports = GitHubUser;