// ============================================================
// 글 썸네일 생성기 (선명·플랫 일러스트)
// 외부 이미지에 의존하지 않고 글 id 기반으로 카테고리별 고유 SVG 생성.
// → 이미지 중복/깨짐/저작권 이슈가 원천적으로 없습니다.
// 카테고리 일러스트: 종합소득세=신고서, 공제=동전, 절세전략=방패+그래프,
//                   사업자세무=빌딩. 글마다 색조/배경에 변형을 줍니다.
// ============================================================

import type { CategorySlug } from "../config";

const PALETTE: Record<
  CategorySlug,
  { bg: string; bg2: string; ink: string; light: string; accent: string }
> = {
  종합소득세: { bg: "#0f766e", bg2: "#14b8a6", ink: "#042f2e", light: "#ccfbf1", accent: "#fbbf24" },
  공제: { bg: "#1d4ed8", bg2: "#3b82f6", ink: "#172554", light: "#dbeafe", accent: "#fcd34d" },
  절세전략: { bg: "#c2410c", bg2: "#f97316", ink: "#431407", light: "#ffedd5", accent: "#fde047" },
  사업자세무: { bg: "#4f46e5", bg2: "#6366f1", ink: "#1e1b4b", light: "#e0e7ff", accent: "#fbbf24" },
};

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function illustration(
  cat: CategorySlug,
  p: (typeof PALETTE)[CategorySlug]
): string {
  if (cat === "종합소득세") {
    return `
    <g transform="translate(248 56)">
      <rect x="0" y="0" width="96" height="124" rx="8" fill="#ffffff"/>
      <rect x="16" y="20" width="64" height="7" rx="3.5" fill="${p.bg2}"/>
      <rect x="16" y="36" width="48" height="6" rx="3" fill="${p.light}"/>
      <rect x="16" y="50" width="56" height="6" rx="3" fill="${p.light}"/>
      <rect x="16" y="64" width="40" height="6" rx="3" fill="${p.light}"/>
      <circle cx="70" cy="96" r="22" fill="${p.accent}" opacity="0.92"/>
      <path d="M60 96 l7 7 l13 -15" fill="none" stroke="${p.ink}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>`;
  }
  if (cat === "공제") {
    return `
    <g transform="translate(250 58)">
      <ellipse cx="48" cy="116" rx="46" ry="13" fill="${p.ink}" opacity="0.25"/>
      ${[0, 1, 2, 3]
        .map(
          (i) =>
            `<g transform="translate(0 ${92 - i * 22})"><ellipse cx="48" cy="12" rx="40" ry="12" fill="${p.accent}"/><rect x="8" y="6" width="80" height="14" fill="${p.accent}"/><ellipse cx="48" cy="6" rx="40" ry="12" fill="#ffffff" opacity="0.95"/><text x="48" y="11" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="800" fill="${p.bg}">₩</text></g>`
        )
        .join("")}
    </g>`;
  }
  if (cat === "절세전략") {
    return `
    <g transform="translate(252 50)">
      <path d="M44 4 L86 18 V64 C86 96 66 116 44 126 C22 116 2 96 2 64 V18 Z" fill="#ffffff"/>
      <path d="M22 78 L40 58 L52 70 L72 44" fill="none" stroke="${p.bg2}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M60 44 L72 44 L72 56" fill="none" stroke="${p.bg2}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    </g>`;
  }
  // 사업자세무 — 빌딩
  return `
  <g transform="translate(250 48)">
    <rect x="4" y="28" width="52" height="100" rx="5" fill="#ffffff"/>
    <rect x="60" y="8" width="40" height="120" rx="5" fill="${p.light}"/>
    ${[0, 1, 2, 3, 4]
      .map((r) =>
        [0, 1]
          .map(
            (c) =>
              `<rect x="${12 + c * 22}" y="${40 + r * 16}" width="12" height="9" rx="1.5" fill="${p.bg2}"/>`
          )
          .join("")
      )
      .join("")}
    ${[0, 1, 2, 3, 4, 5]
      .map(
        (r) =>
          `<rect x="68" y="${20 + r * 16}" width="10" height="9" rx="1.5" fill="${p.bg}"/><rect x="84" y="${20 + r * 16}" width="10" height="9" rx="1.5" fill="${p.bg}"/>`
      )
      .join("")}
  </g>`;
}

/** 글 카드/상세에 쓰는 고유 SVG (data URI) */
export function thumbnailFor(id: string, category: CategorySlug): string {
  const p = PALETTE[category];
  const h = hash(id);
  const ang = h % 40; // 그라데이션 각도 변형
  const bx = 30 + (h % 70);
  const by = 30 + ((h >> 3) % 60);
  const bx2 = 60 + ((h >> 5) % 90);
  const by2 = 50 + ((h >> 7) % 70);
  const r1 = 55 + (h % 35);
  const r2 = 30 + ((h >> 4) % 25);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice">
  <defs><linearGradient id="g${id}" x1="0" y1="0" x2="1" y2="1" gradientTransform="rotate(${ang} .5 .5)"><stop offset="0" stop-color="${p.bg}"/><stop offset="1" stop-color="${p.bg2}"/></linearGradient></defs>
  <rect width="400" height="240" fill="url(#g${id})"/>
  <circle cx="${bx}" cy="${by}" r="${r1}" fill="#ffffff" opacity="0.06"/>
  <circle cx="${bx2}" cy="${by2}" r="${r2}" fill="#ffffff" opacity="0.05"/>
  ${illustration(category, p)}
  <text x="32" y="150" font-family="sans-serif" font-size="13" font-weight="700" fill="${p.accent}" letter-spacing="2">TAX NOTE</text>
  <text x="32" y="184" font-family="sans-serif" font-size="30" font-weight="800" fill="#ffffff">${category}</text>
  <rect x="32" y="200" width="40" height="5" rx="2.5" fill="${p.accent}"/>
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
