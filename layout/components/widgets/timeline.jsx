const Timeline = (props) => {
  const TimelineTitle = (props) => {
    if (props.title) {
      return (
        <div className='widget-header cap theme dis-select'>
          <span className='name'>{props.title}</span>
        </div>
      )
    }
  }
  if (props.api === undefined) {
    return <></>
  } else {
    return (
      <widget className='widget-wrapper timeline'>
        <TimelineTitle {...props} />
        <div className='widget-body fs14'>
          <div
            className={`tag-plugin timeline stellar-${props.type || 'timeline'}-api`}
            api={props.api ? props.api : ''}
            user={props.user ? props.user : ''}
            hide={props.hide ? props.hide : ''}
            limit={props.limit ? props.limit : ''}
          />
        </div>
      </widget>
    )
  }
}

module.exports = Timeline
