import {type JSX, useContext, useState} from "react";
import {BlogContext, type BlogItem} from "./blog-data.ts";
import {Link, useParams} from "react-router";
import Keywords from "./Keywords.tsx";

const PAGE_SIZE = 30;

interface ArchiveEntryProps {
    item?: BlogItem,
    index: number
}

function ArchiveEntry({item, index}: ArchiveEntryProps): JSX.Element {
    return (
        <div className={"entry " + (index % 2 == 1 ? "odd" : "even")}>
            {item?.headerImage != undefined ? <img/> : ""}
            <div>
                <div>{item?.timestamp.toLocaleDateString()}</div>
                <div className={"title"}><Link to={"/blog/" + item?.id}>{item?.title}</Link></div>
            </div>
            <div className={"subtitle"}>{item?.description}</div>
            <Keywords keywords={new Set(item?.keywords)}/>
        </div>
    )
}

function Archive(): JSX.Element {
    const {filter} = useParams()
    const blogData = useContext(BlogContext)
    const [page,] = useState(0)

    const keys = Array.from(blogData.items.values())
        .flatMap(item => item.keywords).sort();
    keys.unshift("all")
    const keywordList = new Set(keys)

    const filtered = blogData.order.map(entry => blogData.items.get(entry))
        .filter(item => item != undefined)
        .filter(item => filter != undefined && filter !== "all" ? item.keywords.includes(filter) : true)
        .map(item => item.id)

    return (
        <div className={"archive"}>
            <div className={"archive-keys"}><Keywords keywords={keywordList}/></div>
            <div className={"title"}>
                {filter == undefined || filter == "all" ? "All entries" : "Entries tagged with "} {filter == undefined || filter == "all" ? "" :
                <em>{filter}</em>}
            </div>
            <div className={"entries"}>
                {Array.from(Array(Math.min(PAGE_SIZE, filtered.length)).keys())
                    .map(n => n + (page * PAGE_SIZE))
                    .map(n => <ArchiveEntry index={n + 1} item={blogData.items.get(filtered[n])}/>)}
            </div>
        </div>
    )
}

export default Archive
