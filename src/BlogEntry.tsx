import Markdown from "react-markdown";
import "./App.scss";
import {useContext, useEffect, useState} from "react";
import {BlogContext, getBlogContent, getBlogItem, getBlogRoute} from "./blog-data.ts";
import {Link, useParams} from "react-router";
import remarkGfm from "remark-gfm";
import Keywords from "./Keywords.tsx";

interface BlogProps {
    canonicalId?: string
    id?: string
    date?: string
}

const BlogEntry: React.FC<BlogProps> = (props: BlogProps) => {
    const params = useParams();

    const blogdata = useContext(BlogContext)

    const blogItem = props.canonicalId !== undefined ? getBlogItem(blogdata, props.canonicalId) :
        getBlogItem(blogdata, undefined, params["id"], params["date"])
    const [content, setContent] = useState("")

    useEffect(() => {
        getBlogContent(blogItem, setContent)
    }, [blogItem]);

    const previous = blogItem?.previous != null ? getBlogItem(blogdata, blogItem.previous) : undefined;
    const next = blogItem?.next != null ? getBlogItem(blogdata, blogItem.next) : undefined;

    return (
        <div className={"blogEntry"}>
            <div className={"nextPrev"}>
                <div><Link className={"blog-link"} to={getBlogRoute(previous)}>
                    {previous ? "↢ " + previous.title : ""}</Link>
                </div>
                <div><Link className={"blog-link"} to={getBlogRoute(next)}>
                    {next ? next.title + " ↣" : ""}
                </Link></div>
            </div>
            {blogItem?.headerImage != undefined ? <img/> : ""}
            <div className={"blog-header"}>
                <div className={"title"}>{blogItem?.title} </div>
                <div>{blogItem?.timestamp.toLocaleDateString()}</div>
                <div className={"subtitle"}> {blogItem?.description}</div>
                <Keywords keywords={new Set(blogItem?.keywords)}/>
            </div>
            <div className={"blog-content"}>
                <Markdown remarkPlugins={[[remarkGfm, {singleTilde: false}]]}>
                    {content}
                </Markdown>
            </div>
        </div>
    )
}

export default BlogEntry
