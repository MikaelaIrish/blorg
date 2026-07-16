import {type JSX, useContext} from "react";
import {ARCHIVE_SIZE, BlogContext} from "./blog-data.ts";
import {Link} from "react-router";

function Sidebar(): JSX.Element {
    const blogData = useContext(BlogContext)

    return (
        <div className={"sidebar right"}>
            <div>
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
            <div className={"rss"}>
                <a href="/xml/rss.xml"><img src="/content/images/rss.png" width="36" height="14"/></a>
            </div>
            <div className={"weblinks"}>
                <div className={"title"}>Contacts</div>
                <a rel="me" href="https://dice.camp/@paints_erratically"><img src="/content/images/mastodon-logo-black.svg"/></a>
                <a rel="me" href="https://bsky.app/profile/paintserratically.bsky.social"><img src="/content/images/bluesk.svg"/></a>
            </div>
        </div>
    )
}

export default Sidebar
