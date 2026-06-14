import {MarkdownHooks} from "react-markdown";
import "./App.css";
import {useContext, useEffect, useState} from "react";
import {BlogContext, getBlogContent} from "./blog-data.ts";
import {Link, useParams} from "react-router";

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
    }, [blogId]);

    const previous = blogItem?.previous != null ? blogdata?.items.get(blogItem.previous) : undefined;
    const next = blogItem?.next != null ? blogdata?.items.get(blogItem.next) : undefined;

    return (
        <div className={"blogEntry"}>
            <div className={"nextPrev"}>
                <div><Link to={"/blog/" + (previous ? previous?.id : blogId)}>
                    {previous ? "↢ " + previous.title : ""}</Link>
                </div>
                <div><Link to={"/blog/" + (next ? next?.id : blogId)}>
                    {next ? next.title + " ↣" : ""}
                </Link></div>
            </div>
            <div>{blogItem?.title} </div>
            <div>{blogItem?.timestamp.toLocaleDateString()}</div>
            <div>{blogItem?.keywords}</div>
            <MarkdownHooks fallback={"<div>Loading</div>"}>
                {content}
            </MarkdownHooks>
        </div>
    )
}

export default BlogEntry
