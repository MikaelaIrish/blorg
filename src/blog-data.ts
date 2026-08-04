import {createContext} from "react";
// @ts-expect-error the module works
import metadataParser from "markdown-yaml-metadata-parser";
import { format } from 'date-fns';

export const ARCHIVE_SIZE = 5;

export interface BlogItem {
    id: string;
    title: string;
    author: string
    timestamp: Date;
    keywords: string[];
    description: string;
    headerImage: string;
    next: string | null;
    previous: string | null;
    commentKey: string | null;
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

export function canonicalId(item?: BlogItem): string | undefined {
    if (item === undefined)
        return undefined;
    return buildId(item.id, `${format(item.timestamp, "yyyy-MM-dd")}`);
}

export function buildId(id: string, date: string): string {
    return `${date}|${id}`;
}

export function firstItem(blogData?: BlogData): BlogItem | undefined {
    return getBlogItem(blogData, blogData?.order[0])
}

function parseBlogData(json: string): BlogData {
    const items: BlogItem[] = JSON.parse(json)
    const data: BlogData = {
        items: new Map<string, BlogItem>(),
        order: []
    }

    for (const item of items) {
        const fullId = canonicalId(item)
        if (fullId !== undefined) {
            data.items.set(fullId, parseItem(item))
            data.order.push(fullId)
        }
    }

    return data;
}

export function getBlogRoute(item?: BlogItem): string {
    if (item === undefined) {
        return "";
    }

    return `/blog/${format(item.timestamp, "yyyy-MM-dd")}/${item.id}`
}

function getBlogContentPath(item?: BlogItem): string {
    if (item === undefined) {
        return "/content/notFound.md"
    }

    const path = `/content/blog/${ format(item.timestamp, 'yyyy-MM-dd')}/${item.id}.md`;
    return path
}

export async function loadBlogs(): Promise<BlogData> {
    return fetch("/content/blog/meta.json")
        .then(meta => meta.text())
        .then(parseBlogData)
}

export function getBlogItem(data: BlogData | undefined, canonicalId?: string, id?: string, date?: string): BlogItem | undefined {
    if (data === undefined) {
        return undefined;
    }

    if (canonicalId !== undefined) {
        return data.items.get(canonicalId);
    }

    if (id === undefined) {
        return undefined;
    }

    //We have all info
    if (date !== undefined) {
        const canonicalId = buildId(id, date);
        return data.items.get(canonicalId);
    }
    //Otherwise search to match the id alone, picking the newest entry
    for (const itemId of data.order) {
        if (data.items.get(itemId)?.id === id) {
            return data.items.get(itemId);
        }
    }

    return undefined;
}

export async function getBlogContent(item: BlogItem | undefined, callback: (a: string) => void) {
    fetch(getBlogContentPath(item))
        .then((res) => res.text())
        .then(content => metadataParser(content).content)
        .then(content => callback(content))
}


export const BlogContext = createContext(emptydata)
