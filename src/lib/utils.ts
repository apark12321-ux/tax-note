// ============================================================
// 공용 유틸 함수
// React 렌더링과 prerender 양쪽에서 동일하게 사용됩니다.
// ============================================================

/**
 * 본문에 실수로 남은 마크다운 잔재를 HTML로 정리합니다.
 * - **텍스트** → <strong>텍스트</strong>
 * - __텍스트__ → <strong>텍스트</strong>
 * - 짝이 맞지 않는 ** 또는 __ 는 제거
 * dangerouslySetInnerHTML로 렌더링하기 때문에 반드시 거쳐야 합니다.
 */
export function sanitizeContent(html: string): string {
  let out = html;

  // **bold** → <strong>
  out = out.replace(/\*\*([^*\n]+?)\*\*/g, "<strong>$1</strong>");
  // __bold__ → <strong>  (단, 단어 내부 밑줄은 건드리지 않도록 경계 고려)
  out = out.replace(/__([^_\n]+?)__/g, "<strong>$1</strong>");

  // 남은 짝 안 맞는 마크다운 기호 제거
  out = out.replace(/\*\*/g, "");
  out = out.replace(/(^|[\s>])__(?=[\s<]|$)/g, "$1");

  return out;
}

/**
 * 한글 슬러그 생성. ⚠️ 길이 제한(.slice)을 절대 넣지 마세요.
 * 잘린 슬러그와 완전 슬러그가 서로 다른 URL로 갈려 중복 색인 문제가 생깁니다.
 */
export function slugify(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/[\s]+/g, "-") // 공백 → 대시
    .replace(/[^\uac00-\ud7a3a-z0-9\-]/g, "") // 한글/영문/숫자/대시만 허용
    .replace(/\-+/g, "-") // 연속 대시 정리
    .replace(/^\-|\-$/g, ""); // 양끝 대시 제거
}

/** HTML 태그 제거 후 순수 텍스트 반환 */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

/** 본문 글자 수 기준 읽기 시간 추정 (한국어 분당 약 500자) */
export function calculateReadTime(html: string): string {
  const text = stripHtml(html);
  const chars = text.length;
  const minutes = Math.max(1, Math.round(chars / 500));
  return `${minutes}분`;
}

/** "2026-05-21" → "2026년 5월 21일" */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${y}년 ${m}월 ${d}일`;
}

/** classNames 결합 (조건부 클래스) */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
