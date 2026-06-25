import {type JSX} from "react";
import {Link} from "react-router";

interface KeywordsProps {
    keywords: Set<string>,
    title?: string
}

function Keywords({keywords, title}: KeywordsProps): JSX.Element {
    return (
        <div className={"keywords-wrapper"}>
            {title == undefined ? "" : <div className={"title"}><em>{title}</em></div> }
            <div className={"keywords"}>
                {Array.from(keywords).map(k => <div className={"keyword"}><Link to={"/archive/" + k}>{k}</Link></div>)}
            </div>
        </div>
    )
}

export default Keywords
