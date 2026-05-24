// ============================================================
// 글 썸네일 생성기 (선명·플랫, 제목/주제별 일러스트)
// 글 id별로 주제에 맞는 일러스트를 그립니다.
// 외부 이미지 의존 없음 → 깨짐/중복/저작권 이슈 없음.
// 새 글 추가 시 ART_MAP에 id를 등록하면 됩니다.
//   (미등록 시 카테고리 기본 일러스트로 자동 대체)
// ============================================================

import type { CategorySlug } from "../config";

type Pal = { bg: string; bg2: string; ink: string; light: string; accent: string };

const PALETTE: Record<CategorySlug, Pal> = {
  종합소득세: { bg: "#0f766e", bg2: "#14b8a6", ink: "#042f2e", light: "#ccfbf1", accent: "#fbbf24" },
  공제: { bg: "#1d4ed8", bg2: "#3b82f6", ink: "#172554", light: "#dbeafe", accent: "#fcd34d" },
  절세전략: { bg: "#c2410c", bg2: "#f97316", ink: "#431407", light: "#ffedd5", accent: "#fde047" },
  사업자세무: { bg: "#4f46e5", bg2: "#6366f1", ink: "#1e1b4b", light: "#e0e7ff", accent: "#fbbf24" },
};

// ── 주제별 일러스트 (우측 영역) ─────────────────────────────
const ICON: Record<string, (p: Pal) => string> = {
  calendar: (p) => `<g transform="translate(256 52)"><rect x="0" y="8" width="104" height="92" rx="9" fill="#fff"/><rect x="0" y="8" width="104" height="24" rx="9" fill="${p.bg2}"/><rect x="0" y="22" width="104" height="10" fill="${p.bg2}"/><rect x="22" y="0" width="9" height="20" rx="4.5" fill="${p.light}"/><rect x="73" y="0" width="9" height="20" rx="4.5" fill="${p.light}"/><circle cx="52" cy="66" r="22" fill="${p.accent}"/><path d="M42 66 l7 8 l14 -16" fill="none" stroke="${p.ink}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></g>`,
  bars: (p) => `<g transform="translate(258 40)"><rect x="0" y="78" width="22" height="30" rx="3" fill="#fff" opacity="0.55"/><rect x="28" y="58" width="22" height="50" rx="3" fill="#fff" opacity="0.7"/><rect x="56" y="36" width="22" height="72" rx="3" fill="#fff" opacity="0.85"/><rect x="84" y="14" width="22" height="94" rx="3" fill="${p.accent}"/><path d="M6 74 L36 52 L64 32 L96 10" fill="none" stroke="${p.light}" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="2 6" opacity="0.8"/></g>`,
  ledger: (p) => `<g transform="translate(252 48)"><rect x="0" y="14" width="84" height="100" rx="7" fill="#fff"/><rect x="0" y="14" width="14" height="100" rx="7" fill="${p.bg2}"/><rect x="26" y="32" width="44" height="6" rx="3" fill="${p.light}"/><rect x="26" y="46" width="44" height="6" rx="3" fill="${p.light}"/><rect x="26" y="60" width="32" height="6" rx="3" fill="${p.light}"/><circle cx="78" cy="92" r="24" fill="none" stroke="${p.accent}" stroke-width="7"/><line x1="95" y1="109" x2="112" y2="126" stroke="${p.accent}" stroke-width="8" stroke-linecap="round"/></g>`,
  family: (p) => `<g transform="translate(254 50)"><circle cx="30" cy="34" r="18" fill="#fff"/><rect x="10" y="56" width="40" height="48" rx="18" fill="#fff"/><circle cx="74" cy="40" r="15" fill="${p.accent}"/><rect x="58" y="58" width="32" height="42" rx="15" fill="${p.accent}"/><circle cx="50" cy="74" r="11" fill="${p.light}"/><rect x="40" y="86" width="20" height="28" rx="10" fill="${p.light}"/></g>`,
  piggy: (p) => `<g transform="translate(252 56)"><ellipse cx="52" cy="62" rx="50" ry="40" fill="#fff"/><circle cx="70" cy="52" r="5" fill="${p.bg}"/><path d="M2 58 q-8 -2 -10 8 q6 6 14 2" fill="#fff"/><rect x="40" y="16" width="24" height="6" rx="3" fill="${p.ink}" opacity="0.3"/><rect x="14" y="96" width="12" height="16" rx="3" fill="#fff"/><rect x="78" y="96" width="12" height="16" rx="3" fill="#fff"/><circle cx="52" cy="6" r="13" fill="${p.accent}"/><text x="52" y="11" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="800" fill="${p.bg}">&#8361;</text></g>`,
  card: (p) => `<g transform="translate(248 60)"><rect x="0" y="6" width="116" height="76" rx="10" fill="#fff"/><rect x="0" y="22" width="116" height="16" fill="${p.bg2}"/><rect x="14" y="50" width="30" height="20" rx="4" fill="${p.accent}"/><rect x="54" y="58" width="48" height="6" rx="3" fill="${p.light}"/></g>`,
  growth: (p) => `<g transform="translate(256 44)"><path d="M8 104 L40 70 L60 86 L100 38" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M84 38 L100 38 L100 54" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><g transform="translate(38 78)"><path d="M14 36 V14" stroke="${p.accent}" stroke-width="6" stroke-linecap="round"/><path d="M14 20 q-16 -4 -16 -18 q16 0 16 14" fill="${p.accent}"/><path d="M14 26 q16 -4 16 -18 q-16 0 -16 14" fill="${p.light}"/></g></g>`,
  mededu: (p) => `<g transform="translate(252 50)"><rect x="2" y="30" width="56" height="56" rx="12" fill="#fff"/><rect x="22" y="42" width="16" height="32" rx="3" fill="${p.bg2}"/><rect x="14" y="50" width="32" height="16" rx="3" fill="${p.bg2}"/><path d="M58 96 L92 82 L116 92 L82 106 Z" fill="${p.accent}"/><path d="M92 99 V112 q0 6 -10 6" fill="none" stroke="${p.light}" stroke-width="4"/></g>`,
  umbrella: (p) => `<g transform="translate(252 46)"><path d="M52 20 a50 44 0 0 1 50 44 H2 a50 44 0 0 1 50 -44 Z" fill="${p.accent}"/><path d="M2 64 q14 -14 25 0 q14 -14 25 0 q14 -14 25 0 q14 -14 25 0" fill="none" stroke="${p.bg}" stroke-width="3" opacity="0.4"/><rect x="48" y="20" width="8" height="84" rx="4" fill="#fff"/><path d="M52 104 q0 14 -16 12" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/><rect x="44" y="6" width="16" height="16" rx="8" fill="#fff"/></g>`,
  laptop: (p) => `<g transform="translate(250 56)"><rect x="6" y="20" width="86" height="58" rx="6" fill="#fff"/><rect x="14" y="28" width="70" height="42" rx="3" fill="${p.bg2}"/><path d="M0 78 H98 L92 92 H6 Z" fill="${p.light}"/><g transform="translate(80 36)"><rect x="0" y="0" width="34" height="50" fill="${p.accent}"/><path d="M0 50 l5 -5 l5 5 l5 -5 l5 5 l5 -5 l5 5 V0 H0 Z" fill="${p.accent}"/><rect x="6" y="10" width="22" height="4" fill="${p.bg}"/><rect x="6" y="20" width="22" height="4" fill="${p.bg}"/><rect x="6" y="30" width="14" height="4" fill="${p.bg}"/></g></g>`,
  reduce: (p) => `<g transform="translate(258 44)"><g transform="translate(40 0)"><rect x="6" y="0" width="12" height="56" rx="6" fill="#fff"/><path d="M-6 44 L12 70 L30 44" fill="none" stroke="${p.accent}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></g><g transform="translate(0 78)"><ellipse cx="52" cy="22" rx="44" ry="13" fill="${p.accent}"/><rect x="8" y="10" width="88" height="14" fill="${p.accent}"/><ellipse cx="52" cy="10" rx="44" ry="13" fill="#fff"/><text x="52" y="15" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="800" fill="${p.bg}">&#8361;</text></g></g>`,
  shop: (p) => `<g transform="translate(252 48)"><path d="M4 36 L16 14 H92 L104 36 Z" fill="${p.accent}"/><rect x="8" y="36" width="92" height="72" fill="#fff"/><path d="M8 36 q12 12 24 0 q12 12 24 0 q12 12 24 0 q12 12 20 0" fill="none" stroke="${p.light}" stroke-width="3"/><rect x="24" y="56" width="26" height="52" fill="${p.bg2}"/><rect x="62" y="56" width="26" height="24" rx="3" fill="${p.light}"/></g>`,
  invoice: (p) => `<g transform="translate(256 46)"><rect x="0" y="4" width="92" height="116" rx="7" fill="#fff"/><rect x="14" y="22" width="40" height="7" rx="3.5" fill="${p.bg2}"/><rect x="14" y="40" width="64" height="5" rx="2.5" fill="${p.light}"/><rect x="14" y="52" width="64" height="5" rx="2.5" fill="${p.light}"/><rect x="14" y="64" width="44" height="5" rx="2.5" fill="${p.light}"/><circle cx="64" cy="92" r="20" fill="none" stroke="${p.accent}" stroke-width="5"/><text x="64" y="99" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="800" fill="${p.accent}">%</text></g>`,
  payout: (p) => `<g transform="translate(252 44)"><circle cx="40" cy="30" r="22" fill="${p.accent}"/><text x="40" y="38" text-anchor="middle" font-family="sans-serif" font-size="24" font-weight="800" fill="${p.bg}">&#8361;</text><path d="M2 116 q0 -34 36 -34 h28 q22 0 22 -14 q0 -8 -10 -8 h-30" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"/><path d="M48 60 h22 q12 0 12 10" fill="none" stroke="${p.light}" stroke-width="8" stroke-linecap="round"/></g>`,
  deadline: (p) => `<g transform="translate(256 48)"><circle cx="52" cy="60" r="50" fill="#fff"/><circle cx="52" cy="60" r="50" fill="none" stroke="${p.light}" stroke-width="3"/><circle cx="52" cy="60" r="6" fill="${p.bg2}"/><path d="M52 60 V28" stroke="${p.bg2}" stroke-width="6" stroke-linecap="round"/><path d="M52 60 L74 70" stroke="${p.accent}" stroke-width="6" stroke-linecap="round"/><g transform="translate(86 4)"><circle cx="14" cy="14" r="14" fill="${p.accent}"/><rect x="11" y="6" width="6" height="11" rx="3" fill="${p.bg}"/><circle cx="14" cy="20" r="2.4" fill="${p.bg}"/></g></g>`,
};

// ── 글 id → [일러스트, 짧은 라벨] ──────────────────────────
const ART_MAP: Record<string, [string, string]> = {
  "income-1": ["calendar", "신고 대상·기간"],
  "income-2": ["bars", "세율·누진공제"],
  "income-3": ["ledger", "장부 vs 추계"],
  "income-4": ["deadline", "신고 마감·가산세"],
  "deduct-1": ["family", "인적공제"],
  "deduct-2": ["piggy", "연금저축·IRP"],
  "deduct-3": ["card", "신용카드 공제"],
  "deduct-4": ["growth", "국민성장펀드"],
  "deduct-5": ["mededu", "의료비·교육비"],
  "save-1": ["umbrella", "노란우산공제"],
  "save-2": ["laptop", "프리랜서 경비"],
  "save-3": ["reduce", "과세표준 낮추기"],
  "biz-1": ["shop", "사업자등록"],
  "biz-2": ["invoice", "부가가치세"],
  "biz-3": ["payout", "원천징수 3.3%"],
};

// 카테고리별 기본 일러스트 (미등록 글 대비)
const CATEGORY_DEFAULT: Record<CategorySlug, string> = {
  종합소득세: "calendar",
  공제: "piggy",
  절세전략: "umbrella",
  사업자세무: "shop",
};

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
  const mapped = ART_MAP[id];
  const iconKey = mapped ? mapped[0] : CATEGORY_DEFAULT[category];
  const label = mapped ? mapped[1] : category;
  const draw = ICON[iconKey] ?? ICON[CATEGORY_DEFAULT[category]];

  const h = hash(id);
  const ang = h % 40;
  const bx = 30 + (h % 70);
  const by = 30 + ((h >> 3) % 60);
  const r1 = 55 + (h % 35);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice">
  <defs><linearGradient id="g${id}" x1="0" y1="0" x2="1" y2="1" gradientTransform="rotate(${ang} .5 .5)"><stop offset="0" stop-color="${p.bg}"/><stop offset="1" stop-color="${p.bg2}"/></linearGradient></defs>
  <rect width="400" height="240" fill="url(#g${id})"/>
  <circle cx="${bx}" cy="${by}" r="${r1}" fill="#ffffff" opacity="0.06"/>
  ${draw(p)}
  <text x="32" y="150" font-family="sans-serif" font-size="13" font-weight="700" fill="${p.accent}" letter-spacing="2">TAX NOTE</text>
  <text x="32" y="184" font-family="sans-serif" font-size="26" font-weight="800" fill="#ffffff">${label}</text>
  <rect x="32" y="200" width="40" height="5" rx="2.5" fill="${p.accent}"/>
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
