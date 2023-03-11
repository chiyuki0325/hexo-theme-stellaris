const SidebarHeader = require('../sidebar/header.jsx');
const Header = props => {
    const {page, partial} = props;
    if (page.header !== 'auto' && page.header !== false) {
        return <SidebarHeader {...props} where='main' />;
    } else {
        return <></>;
    }
}

module.exports = Header;