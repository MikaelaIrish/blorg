import './App.css'
import {BlogContext, type BlogData, emptydata, loadBlogs} from "./blog-data.ts";
import BlogEntry from "./BlogEntry.tsx";
import {useEffect, useState} from "react";

function App() {
    const [blogData, setBlogData] = useState(emptydata)

    useEffect(() => {
        loadBlogs().then((data: BlogData) => setBlogData(data))
    })

    return (
        <BlogContext value={blogData}>
            <BlogEntry id={blogData.order[0]}/>
        </BlogContext>

    )
}

export default App
