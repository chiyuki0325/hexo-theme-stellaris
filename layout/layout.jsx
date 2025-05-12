const { Fragment } = require('react')
const Head = require('./components/head.jsx')
const Header = require('./components/header/index.jsx')
const Scripts = require('./components/scripts.jsx')
const Footer = require('./components/footer.jsx')
const Sidebar = require('./components/sidebar.jsx')
const Cover = require('./components/cover.jsx')

module.exports = (props) => {
  const { page, config, theme, content, partial, body_class } = props
  return (
    <html lang={config.language}>
      <Head {...props} />
      <body className={body_class}>
        <Header {...props} />
        <div className='l_body'>
          <div className='container'>
            <div className='l_main'>
              {Cover(props)}
              <div className='post-list'>
                <div className='post-wrapper'>
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
              </div>
              <Footer {...props} />
            </div>
            <Sidebar {...props} />
          </div>
        </div>
        <Scripts {...props} />
        {/* 启用预加载 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        {/* 延迟加载字体 */}
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;600&display=swap"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;600&display=swap"
          />
        </noscript>
      </body>
    </html>
  )
}
