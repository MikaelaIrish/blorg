import {type JSX, useContext} from "react";
import {ARCHIVE_SIZE, BlogContext} from "./blog-data.ts";
import {Link} from "react-router";

function Sidebar(): JSX.Element {
    const blogData = useContext(BlogContext)

    return (
        <div className={"sidebar right"}>
            <div className={"title"}>Previously</div>
            {Array.from(Array(Math.min(blogData.order.length - 1, ARCHIVE_SIZE))
                .keys()).map((n) =>
                <li className={"prevEntry"}>
                    <Link className={"blog-link"} to={"/blog/" + blogData.order[n + 1]}>
                        {blogData?.items.get(blogData.order[n + 1])?.title}
                    </Link>
                    <div className={"subtitle"}>{blogData?.items.get(blogData.order[n + 1])?.description}</div>
                </li>)
            }
        </div>
    )
}

export default Sidebar
