module.exports = function WikiCard(props) {
    const ProjectLogo = (props) => {
        const {proj} = props;
        if (proj.logo && proj.logo.src) {
            return (
                <div className="preview">
                    <img src={proj.logo.src} alt="logo" height={proj.logo.small ? proj.logo.small : ''}/>
                </div>
            );
        }
    }
    const ProjectCategories = (props) => {
        const {proj, category_color} = props;
        if (proj.tags && proj.tags.length > 0) {
            const tag = proj.tags[0];
            return <div className={"cap breadcrumb" + category_color(tag)}>{tag}</div>;
        }
    }
    const ProjectDescription = (props) => {
        const {proj} = props;
        if (proj.description) {
            return <p>{proj.description}</p>;
        }
    }
    const {proj} = props;
    return (
        <article className="md-text">
            <ProjectLogo proj={proj}/>
            <div className="excerpt">
                <ProjectCategories {...props} />
                <h2 className="post-title">{(proj.title || proj.name)}</h2>
                <ProjectDescription proj={proj}/>
            </div>
        </article>
    )
}