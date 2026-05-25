// 검색엔진 색인 제출 (IndexNow) — 사용: npm run submit-index
// ⚠️ 반드시 배포가 끝난 뒤(URL 실제 접속 가능할 때) 실행하세요.
import { readFileSync, readdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const contentDir = join(root, "src", "content");

const SITE_HOST = "tax-note-phi.vercel.app";
const SITE_URL = `https://${SITE_HOST}`;
const INDEXNOW_KEY = "59672e9d42dde1379a432702015d7cd6";

function slugify(title) {
  return title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\uac00-\ud7a3a-z0-9\-]/g, "")
    .replace(/\-+/g, "-")
    .replace(/^\-|\-$/g, "");
}

// URL 목록 수집 (정적 페이지 + 카테고리 + 글)
const files = readdirSync(contentDir).filter(
  (f) => f.endsWith(".ts") && f !== "index.ts"
);
let posts = [];
const cats = new Set();
for (const f of files) {
  const src = readFileSync(join(contentDir, f), "utf8");
  const blocks = src.split(/\n\s{2,4}\{\s*\n/).slice(1);
  for (const b of blocks) {
    const id = b.match(/id:\s*"([^"]+)"/)?.[1];
    const title = b.match(/title:\s*"((?:[^"\\]|\\.)*)"/)?.[1];
    const category = b.match(/category:\s*"([^"]+)"/)?.[1];
    if (id && title) {
      posts.push({ id, title });
      if (category) cats.add(category);
    }
  }
}

const urls = [
  `${SITE_URL}/`,
  `${SITE_URL}/about`,
  `${SITE_URL}/notice`,
  `${SITE_URL}/privacy`,
  `${SITE_URL}/terms`,
  ...[...cats].map((c) => `${SITE_URL}/category/${encodeURIComponent(c)}`),
  ...posts.map((p) => `${SITE_URL}/post/${p.id}/${slugify(p.title)}`),
];

console.log(`=== 검색엔진 색인 제출 시작 (${urls.length}개 URL) ===`);

async function submit() {
  // 1) IndexNow (Bing, Naver, Yandex 등 공유 엔드포인트)
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: SITE_HOST,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    });
    console.log(`IndexNow 제출: ${res.status} ${res.statusText} (${urls.length}개 URL)`);
    if (res.ok || res.status === 202)
      console.log("  ✅ 색인 요청 접수됨 (Bing, Naver, Yandex 등)");
    else
      console.log(`  ⚠️ 응답 본문: ${await res.text()}`);
  } catch (e) {
    console.log(`  ❌ IndexNow 제출 실패: ${e.message}`);
  }

  console.log("=== 완료 ===");
  console.log("※ Google은 IndexNow 미지원 — sitemap.xml의 정확한 lastmod로 발견됩니다.");
  console.log("  (Google Search Console에 sitemap.xml 1회 제출 권장)");
}

submit();
