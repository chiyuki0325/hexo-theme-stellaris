const SidebarMenu = require('./menu.jsx')
const HeaderTitle = require('./title.jsx')
const SidebarHeader = (props) => {
  const HeaderAvatar = (props) => {
    const { url_for, theme, md_text, md_link } = props
    if (md_text(theme.sidebar.logo.avatar)) {
      return (
        <a
          className='avatar'
          href={url_for(md_link(theme.sidebar.logo.avatar) || '/')}
        >
          {theme.style.animated_avatar.animate && (
            <div
              className='bg'
              style={{
                opacity: '0',
                backgroundImage: `url("${theme.style.animated_avatar.background}")`,
              }}
            />
          )}
          <img
            no-lazy='true'
            className='avatar'
            src={md_text(theme.sidebar.logo.avatar)}
            alt='avatar'
          />
        </a>
      )
    }
  }
  const HeaderMain = (props) => {
    const { theme, md_text, md_link, config } = props
    let main = md_text(theme.sidebar.logo.title)
    if (main) {
      let url = md_link(theme.sidebar.logo.title)
      let sub = config.subtitle
      return <HeaderTitle {...props} main={main} url={url} sub={sub} />
    }
  }

  const { page, where } = props
  if (page.layout === 'wiki' && page.menu_id === 'wiki') {
    return <></>
  } else {
    return (
      <header className={`header ${where === 'main' ? 'mobile-only' : ''}`}>
        <div className='logo-wrap'>
          <HeaderAvatar {...props} />
          <HeaderMain {...props} />
        </div>
        {where !== 'main' && <SidebarMenu {...props} />}
      </header>
    )
  }
}

module.exports = SidebarHeader
