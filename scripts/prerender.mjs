// 빌드 후 정적 HTML 생성 (크롤러/AdSense 심사가 JS 없이 콘텐츠를 읽도록)
// 사용: npm run build && node scripts/prerender.mjs
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const dist = join(root, "dist");

// dist/index.html 을 템플릿으로 사용 (AdSense 코드/메타가 이미 포함됨)
const template = readFileSync(join(dist, "index.html"), "utf8");

// 콘텐츠를 직접 파싱 (TS를 JS로 간단 변환 없이 정규식 추출)
const contentDir = join(root, "src", "content");
import { readdirSync } from "fs";
const files = readdirSync(contentDir).filter(
  (f) => f.endsWith(".ts") && f !== "index.ts"
);

function extractPosts(src) {
  const posts = [];
  // 각 객체 블록을 거칠게 분리
  const blocks = src.split(/\n\s*\{\s*\n/).slice(1);
  for (const b of blocks) {
    const id = b.match(/id:\s*"([^"]+)"/)?.[1];
    const title = b.match(/title:\s*"((?:[^"\\]|\\.)*)"/)?.[1];
    const excerpt = b.match(/excerpt:\s*\n?\s*"((?:[^"\\]|\\.)*)"/)?.[1];
    const category = b.match(/category:\s*"([^"]+)"/)?.[1];
    const date = b.match(/date:\s*"([^"]+)"/)?.[1];
    const content = b.match(/content:\s*`([\s\S]*?)`,?\s*\n\s*\}/)?.[1];
    if (id && title && content) {
      posts.push({ id, title, excerpt: excerpt || "", category, date, content });
    }
  }
  return posts;
}

function slugify(title) {
  return title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\uac00-\ud7a3a-z0-9\-]/g, "")
    .replace(/\-+/g, "-")
    .replace(/^\-|\-$/g, "");
}

function sanitize(html) {
  return html
    .replace(/\*\*([^*\n]+?)\*\*/g, "<strong>$1</strong>")
    .replace(/__([^_\n]+?)__/g, "<strong>$1</strong>")
    .replace(/\*\*/g, "");
}

let allPosts = [];
for (const f of files) {
  allPosts = allPosts.concat(extractPosts(readFileSync(join(contentDir, f), "utf8")));
}

console.log(`prerender 대상 글: ${allPosts.length}개`);

// 템플릿에 본문 주입: <div id="root"></div> 를 콘텐츠로 채움
function inject(html, { title, description, bodyHtml, canonical }) {
  let out = html;
  // title
  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  // description
  out = out.replace(
    /<meta name="description"[^>]*>/,
    `<meta name="description" content="${description.replace(/"/g, "&quot;")}" />`
  );
  // canonical
  out = out.replace(
    /<link rel="canonical"[^>]*>/,
    `<link rel="canonical" href="${canonical}" />`
  );
  // root 콘텐츠 주입 (JS 하이드레이션 전 크롤러가 읽을 정적 콘텐츠)
  out = out.replace(
    /<div id="root">\s*<\/div>/,
    `<div id="root">${bodyHtml}</div>`
  );
  return out;
}

const SITE_URL = "https://tax-note-phi.vercel.app";

// 글 상세 페이지들
for (const p of allPosts) {
  const slug = slugify(p.title);
  const dir = join(dist, "post", p.id, slug);
  mkdirSync(dir, { recursive: true });
  const bodyHtml = `
    <article style="max-width:768px;margin:0 auto;padding:2rem 1rem">
      <nav><a href="/">절세노트</a> &rsaquo; <a href="/category/${encodeURIComponent(p.category)}">${p.category}</a></nav>
      <h1>${p.title}</h1>
      <p>${p.excerpt}</p>
      <div class="article-body">${sanitize(p.content)}</div>
    </article>`;
  const html = inject(template, {
    title: `${p.title} | 절세노트`,
    description: p.excerpt,
    bodyHtml,
    canonical: `${SITE_URL}/post/${p.id}/${slug}`,
  });
  writeFileSync(join(dir, "index.html"), html);
}

// 카테고리 페이지
const categories = [...new Set(allPosts.map((p) => p.category))];
for (const cat of categories) {
  const dir = join(dist, "category", cat);
  mkdirSync(dir, { recursive: true });
  const list = allPosts
    .filter((p) => p.category === cat)
    .map(
      (p) =>
        `<li><a href="/post/${p.id}/${slugify(p.title)}">${p.title}</a><p>${p.excerpt}</p></li>`
    )
    .join("");
  const bodyHtml = `
    <section style="max-width:960px;margin:0 auto;padding:2rem 1rem">
      <h1>${cat}</h1>
      <ul>${list}</ul>
    </section>`;
  const html = inject(template, {
    title: `${cat} | 절세노트`,
    description: `${cat} 관련 글 모음 — 절세노트`,
    bodyHtml,
    canonical: `${SITE_URL}/category/${encodeURIComponent(cat)}`,
  });
  writeFileSync(join(dir, "index.html"), html);
}

// 홈 (정적 글 목록 주입)
const homeList = allPosts
  .map(
    (p) =>
      `<li><a href="/post/${p.id}/${slugify(p.title)}">${p.title}</a><p>${p.excerpt}</p></li>`
  )
  .join("");
const homeBody = `
  <section style="max-width:960px;margin:0 auto;padding:2rem 1rem">
    <h1>절세노트 — 어려운 세금을 쉽게, 절세는 정확하게</h1>
    <p>종합소득세 신고부터 공제·절세 전략, 사업자 세무까지. 한국 세금 정보 가이드입니다.</p>
    <ul>${homeList}</ul>
  </section>`;
writeFileSync(
  join(dist, "index.html"),
  inject(template, {
    title: "절세노트 — 어려운 세금을 쉽게, 절세는 정확하게",
    description:
      "종합소득세 신고, 소득공제·세액공제, 절세 전략, 사업자 세무까지. 프리랜서·자영업자·직장인을 위한 한국 세금 정보 종합 가이드입니다.",
    bodyHtml: homeBody,
    canonical: `${SITE_URL}/`,
  })
);

console.log("✅ prerender 완료");
