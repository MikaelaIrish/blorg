import './App.scss'
import {BlogContext, type BlogData, emptydata, loadBlogs} from "./blog-data.ts";
import BlogEntry from "./BlogEntry.tsx";
import {useEffect, useState} from "react";
import {Link, Route, Routes} from "react-router";
import Sidebar from "./Sidebar.tsx";
import Archive from "./Archive.tsx";

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
                    <div className={"content"}>
                        <div className={"linksBar title"}>
                            <Link to={"/"}>Home</Link>
                        </div>
                        <div className={"linksBar title"}>
                            <Link to={"/archive"}>Archive</Link>
                        </div>
                        <div className={"linksBar title"}>
                            <Link to={"/about"}>About</Link>
                        </div>
                        <div className={"linksBar title"}>
                            <Link to={"/links"}>Links</Link>
                        </div>
                    </div>
                    <Routes>
                        <Route path="/blog/:id" element={<BlogEntry id={undefined}/>}/>
                        <Route path="/archive" element={<Archive />}/>
                        <Route path="/archive/:filter" element={<Archive />}/>
                        <Route path="/" element={<BlogEntry id={blogData.order[0]}/>}/>
                    </Routes>
                    <div className={"footer"}>Copyright © Mikaela Irish. All rights reserved.</div>
                </div>
                <Sidebar />
            </div>
        </BlogContext>
    )
}

export default App
