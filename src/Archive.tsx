import {type JSX, useContext, useState} from "react";
import {BlogContext, type BlogItem} from "./blog-data.ts";
import {Link, useParams} from "react-router";
import Keywords from "./Keywords.tsx";

const PAGE_SIZE = 30;

interface ArchiveEntryProps {
    item?: BlogItem
}

function ArchiveEntry({item}: ArchiveEntryProps): JSX.Element {
    return (
        <div className={"entry"}>
            {item?.headerImage != undefined ? <img/> : ""}
            <div>
                <div>{item?.timestamp.toLocaleDateString()}</div>
                <div className={"title"}><Link to={"/blog/" + item?.id}>{item?.title}</Link></div>
            </div>
            <div className={"subtitle"}>{item?.description}</div>
            <div>{item?.keywords.map(key => <div className={"keyword"}>{key}</div>)}</div>
        </div>
    )
}

function Archive(): JSX.Element {
    const { filter } = useParams()
    const blogData = useContext(BlogContext)
    const [page, ] = useState(0)

    const keywordList = new Set(Array.from(blogData.items.values())
        .flatMap(item => item.keywords).sort())

    const filtered = blogData.order.map(entry => blogData.items.get(entry))
        .filter(item => item != undefined)
        .filter(item => filter != undefined ? item.keywords.includes(filter) : true)
        .map(item => item.id)

    return (
        <div className={"archive"}>
            <Keywords keywords={keywordList}/>
            <div className={"entries"}>
                {Array.from(Array(Math.min(PAGE_SIZE, filtered.length)).keys())
                    .map(n => n + (page * PAGE_SIZE))
                    .map(n => <ArchiveEntry item={blogData.items.get(filtered[n])}/>)}
            </div>
        </div>
    )
}

export default Archive
