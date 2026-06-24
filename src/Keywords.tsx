import {type JSX} from "react";
import {Link} from "react-router";

interface KeywordsProps {
    keywords: Set<string>
}

function Keywords({keywords}: KeywordsProps): JSX.Element {
    return (
        <div className={"keywords"}>
            {Array.from(keywords).map(k => <div className={"keyword"}><Link to={"/archive/" + k}>{k}</Link></div>)}
        </div>
    )
}

export default Keywords
