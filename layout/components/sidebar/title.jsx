const {Fragment} = require('react');
const HeaderTitle = props => {
    const {main, url, sub, url_for} = props;
    return (
        <a className='title' href={url_for(url || '/')}>
            <div className='main' ff='title'>{main}</div>
            {sub &&
                (() => {
                    let arr = sub.split('|');
                    if (arr.length > 1) {
                        return (
                            <Fragment>
                                <div className='sub normal cap'>{arr.shift().trim()}</div>
                                <div className='sub hover cap' style={{opacity:0}}>{arr.join('|')}</div>
                            </Fragment>
                        )
                    } else {
                        return <div className='sub cap'>{sub}</div>
                    }
                })()
            }
        </a>
    )
}

module.exports = HeaderTitle;
