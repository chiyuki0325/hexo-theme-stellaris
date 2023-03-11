const {Fragment} = require('react');

const ListCategories = props => {
    const {url_for} = props;
    let {categories, options} = props;
    const {site} = props;
    if (!options && (!categories || !Object.prototype.hasOwnProperty.call(categories, 'length'))) {
        options = categories;
        categories = site.categories;
    }

    if (!categories || !categories.length) return '';
    options = options || {};

    const separator = <span className="sep"></span>;
    const suffix = '';
    const className = options.class || 'cap breadcrumb';
    const depth = options.depth ? parseInt(options.depth, 10) : 0;
    const orderby = options.orderby || 'name';
    const order = options.order || 1;

    const prepareQuery = parent => {
        const query = {};

        if (parent) {
            query.parent = parent;
        } else {
            query.parent = {$exists: false};
        }

        return categories.find(query).sort(orderby, order).filter(cat => cat.length);
    };

    const flatList = (level, parent) => {
        let result = [];

        prepareQuery(parent).forEach((cat, i) => {
            if (i || level) result.push(separator);
            result.push(
                <a className={`${className}-link`} href={`${url_for(cat.path)}${suffix}`}>
                    {cat.name}
                </a>
            )
            if (!depth || level + 1 < depth) {
                result = result.concat(flatList(level + 1, cat._id));
            }
        });

        return result;
    };

    return flatList(0);
}


const Category = (props) => {
    const {page} = props;
    if (page.layout === "post" && page.categories && page.categories.length > 0) {
        return (
            <Fragment>
                <span className="sep"></span>
                <ListCategories categories={page.categories} {...props}/>
            </Fragment>
        )
    } else {
        return <></>;
    }
}

module.exports = Category;