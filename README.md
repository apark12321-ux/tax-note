# 절세노트 (Jeolse Note)

한국의 세금·절세 정보를 쉽게 전달하는 콘텐츠 사이트입니다.
Vite + React + TypeScript + Tailwind v4 기반 SPA이며, 빌드 시 크롤러/AdSense 심사용 정적 HTML을 prerender 합니다.

## 개발

```bash
npm install
npm run dev       # 개발 서버
npm run verify    # 콘텐츠 정합성 검증 (이미지/앵커/카테고리 균형 등)
npm run build     # 타입체크 + 빌드 + sitemap + prerender (postbuild 자동)
npm run preview   # 빌드 결과 미리보기
```

## 운영 전 교체 체크리스트

`src/config.ts` 한 곳에서 대부분 관리됩니다.

1. **도메인**: `SITE.domain`, `SITE.url` → 실제 도메인
2. **사업자 정보**: `SITE.business.*` 의 `[대괄호]` 플레이스홀더 → 실제 값
   (개인 운영이면 `business.enabled = false`)
3. **이메일**: `SITE.contactEmail`, `SITE.privacyOfficer`
4. **AdSense**: `index.html` 의 `ca-pub-XXXXXXXXXX` 3곳 → 실제 게시자 ID
   그리고 `public/ads.txt` 의 `pub-XXXXXXXXXX`
5. **launchDate**: 실제 사이트 공개일 (개인정보처리방침 시행일과 자동 연동)

## 콘텐츠 추가

`src/content/*.ts` 에 글 객체를 추가하면 목록/카테고리/사이트맵/prerender에 자동 반영됩니다.
글 작성 후 반드시 `npm run verify` 로 정합성을 확인하세요.

## 주의

- 모든 세금 수치는 2026년 기준입니다. 세법 개정 시 본문과 발행일을 갱신하세요.
- 콘텐츠는 일반 정보 제공용이며 세무 상담을 대체하지 않습니다.
