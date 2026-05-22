// 콘텐츠 품질·정합성 자동 검증
// 사용: node scripts/verify-content.mjs
import { readFileSync, readdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const contentDir = join(__dirname, "..", "src", "content");

let errors = 0;
let warnings = 0;
const err = (m) => {
  console.log("❌ " + m);
  errors++;
};
const warn = (m) => {
  console.log("⚠️  " + m);
  warnings++;
};
const ok = (m) => console.log("✅ " + m);

const files = readdirSync(contentDir).filter(
  (f) => f.endsWith(".ts") && f !== "index.ts"
);
const srcAll = files.map((f) => readFileSync(join(contentDir, f), "utf8")).join("\n");

// 1) 이미지 prefix 중복 (image 필드는 SVG 생성으로 대체됐지만 잔존 URL 검사)
const imgIds = [...srcAll.matchAll(/photo-(\d{10})/g)].map((m) => m[1]);
const imgCounts = {};
imgIds.forEach((id) => (imgCounts[id] = (imgCounts[id] || 0) + 1));
const imgDupes = Object.entries(imgCounts).filter(([, v]) => v > 1);
if (imgIds.length === 0) ok("외부 이미지 미사용 (SVG 썸네일 생성 방식)");
else if (imgDupes.length) err(`이미지 prefix 중복: ${JSON.stringify(imgDupes)}`);
else ok(`이미지 prefix ${imgIds.length}개 모두 고유`);

// 2) 마크다운 잔재 검사 (본문 content 내 ** 또는 ##)
const contentBlocks = [...srcAll.matchAll(/content:\s*`([\s\S]*?)`,?\n\s*\},?/g)].map(
  (m) => m[1]
);
let mdResidue = 0;
contentBlocks.forEach((c) => {
  if (/\*\*/.test(c)) mdResidue++;
  if (/^#{1,6}\s/m.test(c)) mdResidue++;
});
if (mdResidue) warn(`마크다운 잔재(** 또는 #) 의심 ${mdResidue}건 — sanitize로 처리됨`);
else ok("본문 마크다운 잔재 없음");

// 3) TOC 앵커 정합성: href="#sectionN" ↔ id="sectionN"
let anchorMismatch = 0;
contentBlocks.forEach((c) => {
  const hrefs = [...c.matchAll(/href="#(section\d+)"/g)].map((m) => m[1]);
  const ids = [...c.matchAll(/id="(section\d+)"/g)].map((m) => m[1]);
  hrefs.forEach((h) => {
    if (!ids.includes(h)) anchorMismatch++;
  });
});
if (anchorMismatch) err(`TOC 앵커 불일치 ${anchorMismatch}건`);
else ok("TOC 앵커 ↔ 본문 id 정합");

// 4) 카테고리 균형
const cats = [...srcAll.matchAll(/category:\s*"([^"]+)"/g)].map((m) => m[1]);
const catCounts = {};
cats.forEach((c) => (catCounts[c] = (catCounts[c] || 0) + 1));
ok(`카테고리 분포: ${JSON.stringify(catCounts)}`);

// 5) 저자 일관성
const authors = [...new Set([...srcAll.matchAll(/author:\s*"([^"]+)"/g)].map((m) => m[1]))];
ok(`저자: ${authors.join(", ")}`);

// 6) 발행일 존재
const dates = [...srcAll.matchAll(/date:\s*"(\d{4}-\d{2}-\d{2})"/g)].map((m) => m[1]);
ok(`발행일 ${dates.length}건 (범위 ${dates.sort()[0]} ~ ${dates.sort().slice(-1)[0]})`);

// 7) 면책 문구 존재 (각 글에 "2026년 기준" 또는 면책 표현)
const disclaimers = (srcAll.match(/세무 상담|참고용|일반 정보|일반적인 세무 정보|상담을 대체/g) || []).length;
if (disclaimers >= contentBlocks.length) ok(`면책 문구 충분 (${disclaimers}건)`);
else warn(`면책 문구 ${disclaimers}건 — 글 수(${contentBlocks.length}) 대비 확인 필요`);

console.log(`\n결과: 에러 ${errors} / 경고 ${warnings}`);
process.exit(errors > 0 ? 1 : 0);
