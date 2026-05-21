// sitemap.xml 생성 — 사용: node scripts/sitemap.mjs
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const contentDir = join(root, "src", "content");
const SITE_URL = "https://tax-note-phi.vercel.app";

function slugify(title) {
  return title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\uac00-\ud7a3a-z0-9\-]/g, "")
    .replace(/\-+/g, "-")
    .replace(/^\-|\-$/g, "");
}

const files = readdirSync(contentDir).filter(
  (f) => f.endsWith(".ts") && f !== "index.ts"
);
let posts = [];
for (const f of files) {
  const src = readFileSync(join(contentDir, f), "utf8");
  const blocks = src.split(/\n\s*\{\s*\n/).slice(1);
  for (const b of blocks) {
    const id = b.match(/id:\s*"([^"]+)"/)?.[1];
    const title = b.match(/title:\s*"((?:[^"\\]|\\.)*)"/)?.[1];
    const category = b.match(/category:\s*"([^"]+)"/)?.[1];
    const date = b.match(/date:\s*"([^"]+)"/)?.[1];
    const updated = b.match(/updated:\s*"([^"]+)"/)?.[1];
    if (id && title) posts.push({ id, title, category, lastmod: updated || date });
  }
}

const categories = [...new Set(posts.map((p) => p.category))];
const today = "2026-05-21";

const urls = [
  { loc: `${SITE_URL}/`, lastmod: today, priority: "1.0" },
  { loc: `${SITE_URL}/about`, lastmod: today, priority: "0.5" },
  { loc: `${SITE_URL}/notice`, lastmod: today, priority: "0.4" },
  { loc: `${SITE_URL}/privacy`, lastmod: today, priority: "0.3" },
  { loc: `${SITE_URL}/terms`, lastmod: today, priority: "0.3" },
  ...categories.map((c) => ({
    loc: `${SITE_URL}/category/${encodeURIComponent(c)}`,
    lastmod: today,
    priority: "0.7",
  })),
  ...posts.map((p) => ({
    loc: `${SITE_URL}/post/${p.id}/${slugify(p.title)}`,
    lastmod: p.lastmod,
    priority: "0.8",
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><priority>${u.priority}</priority></url>`
  )
  .join("\n")}
</urlset>`;

writeFileSync(join(root, "dist", "sitemap.xml"), xml);
writeFileSync(join(root, "public", "sitemap.xml"), xml);
console.log(`✅ sitemap.xml 생성 (${urls.length} URLs)`);
