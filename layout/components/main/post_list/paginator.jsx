const Paginator = props => {
    const {paginator, page, is_home} = props;
    if (is_home() && page.total > 1) {
        return (
            <div className='paginator-wrap dis-select'
                 dangerouslySetInnerHTML={
                     {
                         __html: paginator({
                             prev_text: '',
                             next_text: '',
                             force_prev_next: true
                         })
                     }}
            />
        )
    } else {
        return <></>;
    }
}

module.exports = Paginator;