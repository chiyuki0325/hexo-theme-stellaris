const TagCloud = props => {
    const {site, tagcloud} = props;
    if (site.tags === undefined || site.tags.length === 0) {
        return <></>;
    }
    const opts = {
        min_front: props.min_front || 12,
        max_front: props.max_front || 24,
        amount: props.amount || 100,
        orderby: props.orderby || 'count',
        order: props.order || 1,
        color: props.color || false,
        start_color: props.start_color,
        end_color: props.end_color,
        show_count: props.show_count || false,
        class: 'tag ',
    }
    return (
        <widget className="widget-wrapper tagcloud">
            {props.title &&
                <div className="widget-header cap theme dis-select">
                    <span className="name">{props.title}</span>
                </div>
            }
            <div className="widget-body fs14"
                 dangerouslySetInnerHTML={{__html: tagcloud(site.tags, opts)}}/>
        </widget>
    )
}

module.exports = TagCloud;