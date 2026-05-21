// ============================================================
// 글 썸네일 생성기
// 외부 이미지(Unsplash 등)에 의존하지 않고, 글 id 기반으로
// 카테고리별 색상·기하 패턴을 가진 고유 SVG를 생성합니다.
// → 이미지 중복/깨짐/저작권 이슈가 원천적으로 없습니다.
// ============================================================

import type { CategorySlug } from "../config";

const PALETTE: Record<CategorySlug, { from: string; to: string; accent: string }> =
  {
    종합소득세: { from: "#065f46", to: "#10b981", accent: "#a7f3d0" },
    공제: { from: "#1e3a8a", to: "#3b82f6", accent: "#bfdbfe" },
    절세전략: { from: "#7c2d12", to: "#ea580c", accent: "#fed7aa" },
    사업자세무: { from: "#3730a3", to: "#6366f1", accent: "#c7d2fe" },
  };

// 간단한 해시 → 패턴 변형에 사용
function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

/** 글 카드/상세에 쓰는 고유 SVG (data URI) */
export function thumbnailFor(id: string, category: CategorySlug): string {
  const p = PALETTE[category];
  const h = hash(id);
  const rot = h % 360;
  const cx = 30 + (h % 40);
  const cy = 30 + ((h >> 3) % 40);
  const r1 = 18 + (h % 14);
  const r2 = 26 + ((h >> 5) % 18);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${p.from}"/>
      <stop offset="1" stop-color="${p.to}"/>
    </linearGradient>
  </defs>
  <rect width="400" height="240" fill="url(#g)"/>
  <g transform="rotate(${rot} 200 120)" opacity="0.15" fill="none" stroke="${p.accent}" stroke-width="2">
    <circle cx="${cx * 4}" cy="${cy * 2.4}" r="${r1 * 3}"/>
    <circle cx="${cx * 4}" cy="${cy * 2.4}" r="${r2 * 3}"/>
  </g>
  <g opacity="0.22" fill="${p.accent}" transform="translate(0 -16)">
    <rect x="316" y="150" width="12" height="58" rx="2"/>
    <rect x="334" y="128" width="12" height="80" rx="2"/>
    <rect x="352" y="104" width="12" height="104" rx="2"/>
  </g>
  <text x="200" y="120" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-size="30" font-weight="800" fill="#ffffff" opacity="0.96">${category}</text>
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
