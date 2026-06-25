import Markdown from "react-markdown";
import "./App.scss";
import {useContext, useEffect, useState} from "react";
import {BlogContext, getBlogContent} from "./blog-data.ts";
import {Link, useParams} from "react-router";
import remarkGfm from "remark-gfm";
import Keywords from "./Keywords.tsx";

interface BlogProps {
    id?: string
}

const BlogEntry: React.FC<BlogProps> = (props: BlogProps) => {
    const params = useParams();

    const blogdata = useContext(BlogContext)
    const blogId: string = props.id === undefined ?
        params["id"] === undefined ?
            "" : params["id"] : props.id;

    const blogItem = blogdata?.items.get(blogId)
    const [content, setContent] = useState("")

    useEffect(() => {
        getBlogContent(blogItem, setContent)
    }, [blogItem]);

    const previous = blogItem?.previous != null ? blogdata?.items.get(blogItem.previous) : undefined;
    const next = blogItem?.next != null ? blogdata?.items.get(blogItem.next) : undefined;

    return (
        <div className={"blogEntry"}>
            <div className={"nextPrev"}>
                <div><Link className={"blog-link"} to={"/blog/" + (previous ? previous?.id : blogId)}>
                    {previous ? "↢ " + previous.title : ""}</Link>
                </div>
                <div><Link className={"blog-link"} to={"/blog/" + (next ? next?.id : blogId)}>
                    {next ? next.title + " ↣" : ""}
                </Link></div>
            </div>
            { blogItem?.headerImage != undefined ? <img/> : "" }
            <div className={"blog-header"}>
                <div className={"title"}>{blogItem?.title} </div>
                <div>{blogItem?.timestamp.toLocaleDateString()}</div>
                <div className={"subtitle"}> {blogItem?.description}</div>
                <Keywords keywords={new Set(blogItem?.keywords)}/>
            </div>

            <Markdown remarkPlugins={[[remarkGfm, {singleTilde: false}]]}>
                {content}
            </Markdown>
        </div>
    )
}

export default BlogEntry
