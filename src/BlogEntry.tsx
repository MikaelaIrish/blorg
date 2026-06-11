import {MarkdownHooks} from "react-markdown";
import {useContext, useEffect, useState} from "react";
import {BlogContext, getBlogContent} from "./blog-data.ts";

interface BlogProps {
    id: string;
}

const BlogEntry: React.FC<BlogProps> = (props: BlogProps) => {
    const blogdata = useContext(BlogContext)
    const blogItem = blogdata.items.get(props.id)
    const [content, setContent] = useState("<div>Loading</div>")

    useEffect(() => {
        getBlogContent(blogItem, setContent)
            .then(() => console.log("content loaded for " + (blogItem?.id ?? "unknown")))
    }, [blogdata, blogItem]);


    return (
        <div className={"blogItem"}>
            <div>{blogItem?.title} </div>
            <div>{blogItem?.timestamp.toLocaleDateString()}</div>
            <div>{blogItem?.keywords}</div>
            <MarkdownHooks fallback={ "<div>Loading</div>"}>
                { content }
            </MarkdownHooks>
        </div>
    )
}

export default BlogEntry
