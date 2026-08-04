import type {BlogItem} from "./blog-data.ts";
import {BSKY_DID} from "./settings.ts";
import {useEffect, useState} from "react";
import {AppBskyFeedDefs, AppBskyFeedGetPostThread} from "@atproto/api";
import {Link} from "react-router";

type Reply = {
    post: {
        uri: string
        likeCount?: number
        repostCount?: number
        replyCount?: number,
    };
};

type Thread = {
    replies: Reply[];
    post: {
        likeCount?: number;
        repostCount?: number;
        replyCount?:number;
    };
};

function getPostURI(blogItem?: BlogItem): string | undefined {
    if (blogItem?.commentKey) {
        return "https://bsky.app/profile/" + BSKY_DID + "/post/" + blogItem.commentKey
    }

    return undefined
}

const fetchThreadData = async (uri, setThread, setError) => {
    try {
        const thread = await getPostThread(uri);
        setThread(thread);
    } catch (err) {
        setError('Error loading comments: ' + err);
    }
};

interface CommentProps {
    uri: string | undefined;
    thread: Thread | undefined;
    visible: number;
}

const Comments: React.FC<CommentProps> = (props: CommentProps) => {
    return (
        <div></div>
    );
}


interface CommentSectionProps {
    blogItem?: BlogItem
}

const CommentSection: React.FC<CommentSectionProps> = (props: CommentSectionProps) => {
    const [thread, setThread] = useState<Thread | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState(3);
    const postURI = getPostURI(props.blogItem);

    useEffect(() => {
        fetchThreadData(postURI, setThread, setError);
    }, [props.blogItem, postURI]);

    if (error) {
        return <p className="text-center">{error}</p>;
    }

    if (!thread) {
        return <p className="text-center">Loading comments...</p>;
    }

    if (!thread.replies || thread.replies.length === 0) {
        return <div />;
    }

    const showMore = () => {
        setVisibleCount((prevCount) => prevCount + 5);
    };

    console.log("thread: ", thread.post);

    return (
        <div className={"commentSection"}>
            <div className={"title"}>Comments</div>
            <div>Reply on Blusky <Link to={postURI ?? ""}>here</Link> to comment!</div>
            <Comments uri={postURI} visible={visibleCount ?? 0} thread={thread}/>
            {thread.replies?.length > visibleCount && (
                <button onClick={showMore} className={"showMore"}>
                    Show more comments
                </button>
            )}
        </div>
    )
}

const getPostThread = async (uri: string) => {
    const params = new URLSearchParams({ uri });

    const res = await fetch(
        "https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?" +
        params.toString(),
        {
            method: 'GET',
            headers: {
                "Accept": "application/json",
            },
            cache: "no-store",
        },
    );

    if (!res.ok) {
        console.error(await res.text());
        throw new Error("Failed to fetch post thread");
    }

    const data = (await res.json()) as AppBskyFeedGetPostThread.OutputSchema;

    if (!AppBskyFeedDefs.isThreadViewPost(data.thread)) {
        throw new Error("Could not find thread");
    }

    return data.thread;
};

export default CommentSection;
