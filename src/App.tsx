import './App.css'
import {BlogContext, type BlogData, emptydata, loadBlogs} from "./blog-data.ts";
import BlogEntry from "./BlogEntry.tsx";
import {useEffect, useState} from "react";
import {Route, Routes} from "react-router";

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
            <div className={"content"}>
                <div className={"sidebar"}></div>
                <div className={"center"}>
                    <img width="800px" src="/content/images/header.png"></img>
                    <Routes>
                        <Route path="/" element={<BlogEntry id={blogData.order[0]}/>}/>
                        <Route path="/blog/:id" element={<BlogEntry id={undefined}/>}/>
                    </Routes>
                </div>
                <div className={"sidebar"}></div>
            </div>
        </BlogContext>
    )
}

export default App
