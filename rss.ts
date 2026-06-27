import fs from "fs-extra";
import * as dotenv from 'dotenv'
// @ts-expect-error - no dev dependency
import metadataParser from "markdown-yaml-metadata-parser";

dotenv.config()

const ROOT = process.env.PUBLIC_URL

const files = fs.readdirSync("./public/content/blog", { withFileTypes: true })

fs.mkdirSync("./public/xml")

let toProcess: any[] = []

for (const entry of files) {
    if (entry.name.endsWith(".md")) {
        const parsed = metadataParser(fs.readFileSync("./public/content/blog/" + entry.name).toString())
        toProcess.push({
            ...parsed.metadata,
            id: entry.name.substring(0, entry.name.length - 3)
        })
    }
}

toProcess = toProcess.sort(
    (a, b) => a.timestamp > b.timestamp ? -1 : a.timestamp < b.timestamp ? 1 : 0)

function item(item: any): string {
    return (
        `
    <item>
        <title>${item["title"]}</title>
        <link>${ROOT + "/#/blog/" + item["id"]}</link>
        <description>${item["description"]}</description>
    </item>
        `
    )
}

function rss(): string {
    return (
        `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
<title>I Welcome Our Polyhedral Overlords</title>
<link>${ROOT}</link>
<copyright>${"© " + new Date().getFullYear() + " Mikaela Irish. All rights reserved."}</copyright>
<image>${ROOT + "/content/images/header.png"}</image>
${ toProcess.map(x => item(x)).join("\n") }
</channel>
</rss>
        `
    )
}

const xml = rss();

fs.writeFileSync("./public/xml/rss.xml", xml)









