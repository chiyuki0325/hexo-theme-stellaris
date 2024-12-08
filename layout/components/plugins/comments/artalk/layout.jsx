module.exports = function (props) {
  const { page } = props
  let cfg = {}
  if (page.comment_id) {
    cfg['comment_id'] = page.comment_id
  }
  return (
    <>
      <div id='artalk_container' {...config}>
        <svg
          class='loading'
          style={{
            verticalAlign: 'middle',
            fill: 'currentColor',
            overflow: 'hidden',
          }}
          viewBox='0 0 1024 1024'
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
          p-id='2709'
        >
          <path
            d='M832 512c0-176-144-320-320-320V128c211.2 0 384 172.8 384 384h-64zM192 512c0 176 144 320 320 320v64C300.8 896 128 723.2 128 512h64z'
            p-id='2710'
          ></path>
        </svg>
      </div>
    </>
  )
}
