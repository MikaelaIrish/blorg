import {createContext} from "react";
// @ts-expect-error the module works
import metadataParser from "markdown-yaml-metadata-parser";

interface BlogItem {
    id: string;
    title: string;
    author: string
    timestamp: Date;
    keywords: string[];
    description: string;
    headerImage: string;
    next: string | null;
    previous: string | null;
}

export interface BlogData {
    items: Map<string, BlogItem>;
    order: string[];
}

export const emptydata: BlogData = {
    items: new Map,
    order: []
}

function parseItem(json: any): BlogItem {
    return {
        ...json,
        headerImage: json["header-image"],
        timestamp: new Date(json.timestamp)
    }
}

function parseBlogData(json: string): BlogData {
    console.log(json)
    const items: BlogItem[] = JSON.parse(json)
    const data: BlogData = {
        items: new Map<string, BlogItem>(),
        order: []
    }

    for (const item of items) {
        data.items.set(item.id, parseItem(item))
        data.order.push(item.id)
    }

    return data;
}

export async function loadBlogs(): Promise<BlogData> {
    return fetch("./content/blog/meta.json")
        .then(meta => meta.text())
        .then(parseBlogData)
}

export function getBlogPath(item: BlogItem | undefined): string {
    if (item === undefined) {
        return "./content/notFound.md"
    }

    return "./content/blog/" + item.id + ".md"
}

export async function getBlogContent(item: BlogItem | undefined, callback: (a: string) => void) {
    fetch(getBlogPath(item))
        .then((res) => res.text())
        .then(content => metadataParser(content).content)
        .then(content => callback(content))
}


export const BlogContext = createContext(emptydata)
