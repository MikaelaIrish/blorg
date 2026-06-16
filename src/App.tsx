import './App.scss'
import {ARCHIVE_SIZE, BlogContext, type BlogData, emptydata, loadBlogs} from "./blog-data.ts";
import BlogEntry from "./BlogEntry.tsx";
import {useEffect, useState} from "react";
import {Link, Route, Routes} from "react-router";

function App() {
    const [blogData, setBlogData] = useState(emptydata)

    useEffect(() => {
        loadBlogs().then((data: BlogData) => setBlogData(data))
    }, [])

    console.log(blogData)

    if (blogData === emptydata) {
        return (<div>Loading</div>)
    }

    return (
        <BlogContext value={blogData}>
            <div className={"header"}>
                <img className={"image"}  src="/content/images/header.png"></img>
            </div>
            <div className={"content"}>
                <div className={"sidebar"}></div>
                <div className={"center"}>
                    <Routes>
                        <Route path="/" element={<BlogEntry id={blogData.order[0]}/>}/>
                        <Route path="/blog/:id" element={<BlogEntry id={undefined}/>}/>
                    </Routes>
                    <div className={"footer"}>Copyright © Mikaela Irish. All rights reserved.</div>
                </div>
                <div className={"sidebar right"}>
                    <div className={"title"}>Previously</div>
                    {Array.from(Array(Math.min(blogData.order.length - 1, ARCHIVE_SIZE))
                        .keys()).map((n) =>
                        <div>
                            ❖ <Link className={"blog-link"} to={"/blog/" + blogData.order[n + 1]}>
                                {blogData?.items.get(blogData.order[n + 1])?.title}
                            </Link>
                            <div className={"subtitle"}>{blogData?.items.get(blogData.order[n + 1])?.description}</div>
                        </div>
                    )}
                </div>
            </div>
        </BlogContext>
    )
}

export default App
