import fs from "fs-extra";
import metadataParser from "markdown-yaml-metadata-parser";

var files = fs.readdirSync("./public/content/blog", { withFileTypes: true })

var process = []

for (const entry of files) {
    if (entry.name.endsWith(".md")) {
        const parsed = metadataParser(fs.readFileSync("./public/content/blog/" + entry.name).toString())
        process.push({
            ...parsed.metadata,
            id: entry.name.substring(0, entry.name.length - 3)
        })
    }
}

process = process.sort(
    (a, b) => a.timestamp > b.timestamp ? -1 : a.timestamp < b.timestamp ? 1 : 0)

const output = []
for (const i in process) {
    output.push({
        ...process[i],
        next: process[parseInt(i)-1]?.id ?? null,
        previous: process[parseInt(i)+1]?.id ?? null
    })
}

fs.writeJsonSync("./public/content/blog/meta.json", output, {spaces: 4})




