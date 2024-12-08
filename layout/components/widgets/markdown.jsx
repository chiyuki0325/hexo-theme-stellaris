const Markdown = (props) => {
  const { markdown } = props
  if (!props.content?.length) return <></>
  return (
    <widget className='widget-wrapper markdown'>
      {props.title?.length > 0 && (
        <div className='widget-header cap theme dis-select'>
          <span className='name'>{props.title}</span>
        </div>
      )}
      <div
        className='widget-body fs14'
        dangerouslySetInnerHTML={{ __html: markdown(props.content) }}
      />
    </widget>
  )
}

module.exports = Markdown
