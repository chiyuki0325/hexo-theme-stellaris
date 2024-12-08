const Search = (props) => {
  const { page, __ } = props
  let filter = ''
  if (props.filter === 'auto') {
    if (page.layout === 'wiki') {
      let matches = page.path.match(/(.*?)\/(.*?)\//i)
      if (matches?.length > 0) {
        filter = matches[0]
      }
    }
  } else {
    if (props.filter?.length > 0) {
      filter = props.filter
    }
  }
  let placeholder = ''
  if (filter.length > 0) {
    if (!filter.startsWith('/')) {
      filter = '/' + filter
    }
    placeholder = props.placeholder || __('search.search_in', filter)
  } else {
    placeholder = props.placeholder || __('search.search')
  }

  return (
    <widget className='widget-wrapper search'>
      <div className='widget-body'>
        <div className='search-wrapper' id='search'>
          <form className='search-form'>
            <input
              type='text'
              className='search-input'
              id='search-input'
              placeholder={placeholder}
              data-filter={filter || ''}
            />
          </form>
          <div id='search-result' />
          <div className='search-no-result'>{__('search.no_results')}</div>
        </div>
      </div>
    </widget>
  )
}

module.exports = Search
