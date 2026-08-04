import fs from "fs-extra";
// @ts-expect-error - no dev dependency
import metadataParser from "markdown-yaml-metadata-parser";
import {format} from "date-fns";
import type {BlogItem} from "./src/blog-data";

const files = fs.readdirSync("./public/content/blog", { withFileTypes: true })

function canonicalId(item?: BlogItem): string | undefined {
    if (item == undefined) {
        return undefined;
    }
    return `${format(item.timestamp, "yyyy-MM-dd")}|${item.id}`;
}

function collate(path: string): any[] {
    const files = fs.readdirSync(path, { withFileTypes: true })
    let processed: any[] = [];

    for (const entry of files) {
        if (entry.isDirectory()) {
            processed = processed.concat(collate(path + entry.name));
        } else if (entry.name.endsWith(".md")) {
            const parsed = metadataParser(fs.readFileSync(path + "/" + entry.name).toString())
            processed.push({
                ...parsed.metadata,
                id: entry.name.substring(0, entry.name.length - 3)
            })
        }
    }

    return processed;
}

let process = collate("./public/content/blog/");

process = process.sort(
    (a, b) => a.timestamp > b.timestamp ? -1 : a.timestamp < b.timestamp ? 1 : 0)

console.log(process)

const output = []
for (const i in process) {
    output.push({
        ...process[i],
        next: canonicalId(process[parseInt(i)-1]) ?? null,
        previous: canonicalId(process[parseInt(i)+1]) ?? null
    })
}

fs.writeJsonSync("./public/content/blog/meta.json", output, {spaces: 4})






