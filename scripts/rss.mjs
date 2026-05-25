// RSS 피드 생성 — 사용: node scripts/rss.mjs (postbuild에서 자동 실행)
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const contentDir = join(root, "src", "content");

const SITE_URL = "https://tax-note-phi.vercel.app";
const SITE_NAME = "절세노트";
const SITE_DESC =
  "종합소득세, 공제, 절세전략, 사업자세무를 쉽게 정리한 한국 세금 정보 가이드.";

function slugify(title) {
  return title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\uac00-\ud7a3a-z0-9\-]/g, "")
    .replace(/\-+/g, "-")
    .replace(/^\-|\-$/g, "");
}

function esc(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const files = readdirSync(contentDir).filter(
  (f) => f.endsWith(".ts") && f !== "index.ts"
);
let posts = [];
for (const f of files) {
  const src = readFileSync(join(contentDir, f), "utf8");
  const blocks = src.split(/\n\s{2,4}\{\s*\n/).slice(1);
  for (const b of blocks) {
    const id = b.match(/id:\s*"([^"]+)"/)?.[1];
    const title = b.match(/title:\s*"((?:[^"\\]|\\.)*)"/)?.[1];
    const excerpt = b.match(/excerpt:\s*\n?\s*"((?:[^"\\]|\\.)*)"/)?.[1];
    const category = b.match(/category:\s*"([^"]+)"/)?.[1];
    const date = b.match(/date:\s*"([^"]+)"/)?.[1];
    const updated = b.match(/updated:\s*"([^"]+)"/)?.[1];
    if (id && title) posts.push({ id, title, excerpt: excerpt || "", category, date, updated: updated || date });
  }
}
// 최신순 정렬
posts.sort((a, b) => (a.date < b.date ? 1 : -1));

const pubDate = (d) => new Date(d + "T09:00:00+09:00").toUTCString();

const items = posts
  .map(
    (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE_URL}/post/${p.id}/${slugify(p.title)}</link>
      <guid isPermaLink="true">${SITE_URL}/post/${p.id}/${slugify(p.title)}</guid>
      <description>${esc(p.excerpt)}</description>
      <category>${esc(p.category || "")}</category>
      <pubDate>${pubDate(p.date)}</pubDate>
    </item>`
  )
  .join("\n");

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}/</link>
    <description>${esc(SITE_DESC)}</description>
    <language>ko-KR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

writeFileSync(join(root, "dist", "rss.xml"), rss);
console.log(`✅ rss.xml 생성 (${posts.length} items)`);
