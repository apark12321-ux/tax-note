import type { Post } from "../types";

// ============================================================
// 종합소득세 카테고리 — 톤: 정중한 컨설턴트(~습니다체)
// 모든 세율/수치는 2026년 기준이며 본문에 "2026년 기준" 명시
// ============================================================

export const incomeTaxPosts: Post[] = [
  {
    id: "income-1",
    title: "종합소득세 신고, 나는 대상일까? 신고 대상과 기간 총정리 (2026년 기준)",
    excerpt:
      "프리랜서, 자영업자, 두 곳 이상에서 급여를 받은 직장인이라면 5월 종합소득세 신고 대상일 수 있습니다. 2026년 신고 기간과 대상자 판단 기준을 정리했습니다.",
    category: "종합소득세",
    author: "절세노트 편집팀",
    date: "2026-05-12",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    readTime: "9분",
    hashtags: [
      "종합소득세",
      "종소세신고",
      "신고대상",
      "프리랜서세금",
      "자영업자세금",
      "5월종합소득세",
      "홈택스",
      "원천징수",
    ],
    content: `
<div class="toc-card">
  <p><strong>이 글의 순서</strong></p>
  <ul>
    <li><a href="#section1">1. 종합소득세란 무엇인가</a></li>
    <li><a href="#section2">2. 2026년 신고 기간</a></li>
    <li><a href="#section3">3. 신고 대상자 판단</a></li>
    <li><a href="#section4">4. 신고하지 않아도 되는 경우</a></li>
    <li><a href="#section5">5. 신고 전 준비물</a></li>
  </ul>
</div>

<h2>5월은 종합소득세의 달입니다</h2>
<p>매년 5월이 되면 "나도 종합소득세를 신고해야 하나" 고민하는 분들이 많습니다. 직장에서 연말정산만 해온 분이라면 더욱 낯설 수 있습니다. 결론부터 말씀드리면, 한 해 동안 근로소득 외에 다른 소득이 있었거나, 사업·프리랜서 소득이 있었다면 신고 대상일 가능성이 높습니다. 하나씩 차근차근 살펴보겠습니다.</p>

<h3 id="section1">1. 종합소득세란 무엇인가</h3>
<p>종합소득세는 한 해 동안 개인이 벌어들인 여러 종류의 소득을 모두 합산하여 과세하는 세금입니다. 합산 대상이 되는 소득은 이자소득, 배당소득, 사업소득, 근로소득, 연금소득, 기타소득 이렇게 여섯 가지입니다.</p>
<p>직장인의 급여(근로소득)는 회사가 연말정산으로 정산해 주기 때문에 별도 신고가 필요 없는 경우가 많습니다. 그러나 근로소득 외에 다른 소득이 함께 있다면, 이를 합산해 다시 정산하는 절차가 바로 종합소득세 신고입니다.</p>

<h3 id="section2">2. 2026년 신고 기간</h3>
<p>종합소득세는 소득이 발생한 다음 해 5월 1일부터 5월 31일까지 신고·납부하는 것이 원칙입니다. <strong>2026년에는 5월 31일이 일요일이기 때문에, 신고·납부 기한이 다음 날인 6월 1일(월)까지 연장</strong>됩니다.</p>
<ul>
  <li><strong>신고·납부 기간:</strong> 2026년 5월 1일 ~ 6월 1일(월)</li>
  <li><strong>대상 소득:</strong> 2025년 한 해 동안 발생한 종합소득</li>
  <li><strong>성실신고확인 대상자:</strong> 6월 30일까지 신고 기한이 연장됩니다</li>
</ul>
<p>기한을 넘기면 무신고가산세와 납부지연가산세가 붙으므로, 대상자라면 기간 내 신고를 마치는 것이 중요합니다.</p>

<h3 id="section3">3. 신고 대상자 판단</h3>
<p>다음에 해당한다면 종합소득세 신고 대상일 가능성이 큽니다.</p>
<ul>
  <li><strong>사업소득자:</strong> 자영업자, 그리고 3.3%를 떼고 대금을 받는 프리랜서(인적용역 사업소득자)</li>
  <li><strong>두 곳 이상에서 근로소득:</strong> 2곳 이상 회사에서 급여를 받았으나 합산하여 연말정산하지 않은 경우</li>
  <li><strong>금융소득 2,000만 원 초과:</strong> 이자·배당을 합쳐 연 2,000만 원을 넘으면 종합과세 대상</li>
  <li><strong>기타소득이 일정 규모 이상:</strong> 강연료, 원고료 등 기타소득금액이 연 300만 원을 초과하면 종합과세</li>
  <li><strong>연금소득:</strong> 사적연금 등 일정 요건에 해당하는 경우</li>
</ul>
<p>특히 프리랜서로 일하며 대금에서 3.3%가 원천징수된 분들은, 이 3.3%가 미리 낸 세금일 뿐 최종 정산이 아니라는 점을 기억해야 합니다. 실제 세액을 계산해 보면 환급을 받는 경우도 적지 않습니다.</p>

<h3 id="section4">4. 신고하지 않아도 되는 경우</h3>
<p>반대로 다음의 경우에는 별도로 종합소득세를 신고하지 않아도 되는 것이 일반적입니다.</p>
<ul>
  <li>한 직장에서만 근로소득이 있고 연말정산을 정상적으로 마친 경우</li>
  <li>금융소득(이자·배당) 합계가 2,000만 원 이하로 분리과세로 끝나는 경우</li>
  <li>비과세·분리과세로 납세 의무가 종결되는 소득만 있는 경우</li>
</ul>
<p>다만 본인의 상황이 애매하다면, 국세청 홈택스에서 제공하는 신고 안내문을 확인하는 것이 가장 정확합니다.</p>

<h3 id="section5">5. 신고 전 준비물</h3>
<p>신고를 앞두고 미리 챙겨두면 좋은 자료는 다음과 같습니다.</p>
<ul>
  <li><strong>소득 자료:</strong> 사업장 매출 내역, 원천징수영수증, 지급명세서</li>
  <li><strong>경비 증빙:</strong> 세금계산서, 카드 매출전표, 현금영수증 등 적격증빙</li>
  <li><strong>공제 자료:</strong> 인적공제 대상자 정보, 노란우산·연금저축 납입 내역</li>
</ul>
<p>홈택스의 모두채움 서비스나 신고도움 자료를 활용하면 상당 부분 자동으로 채워지므로, 처음 신고하는 분도 어렵지 않게 시작할 수 있습니다. 자세한 신고 방법은 <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer">국세청</a> 및 <a href="https://hometax.go.kr" target="_blank" rel="noopener noreferrer">홈택스</a>에서 확인하실 수 있습니다.</p>

<p class="text-sm text-gray-500 mt-8">※ 본 글은 2026년 기준 일반적인 세무 정보 안내이며, 세무 상담을 대체하지 않습니다. 본인의 정확한 신고 대상 여부와 세액은 국세청 홈택스 또는 세무 전문가와 확인하시기 바랍니다.</p>
<p class="text-xs text-gray-400 mt-2">최종 업데이트: 2026-05-12</p>
`,
  },
  {
    id: "income-2",
    title: "종합소득세 세율 구조 완벽 이해 — 누진세율과 누진공제액 (2026년)",
    excerpt:
      "종합소득세는 6%부터 45%까지 8단계 누진세율로 매겨집니다. 과세표준 구간과 누진공제액을 활용한 정확한 세액 계산법을 예시와 함께 설명합니다.",
    category: "종합소득세",
    author: "절세노트 편집팀",
    date: "2026-05-16",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    readTime: "8분",
    hashtags: [
      "종합소득세율",
      "누진세율",
      "누진공제액",
      "과세표준",
      "세액계산",
      "소득세계산",
      "2026세율표",
    ],
    content: `
<div class="toc">
  <p><strong>목차</strong></p>
  <ul>
    <li><a href="#section1">1. 누진세율이란</a></li>
    <li><a href="#section2">2. 2026년 세율표 8단계</a></li>
    <li><a href="#section3">3. 누진공제액으로 간편 계산</a></li>
    <li><a href="#section4">4. 실제 계산 예시</a></li>
    <li><a href="#section5">5. 구간 경계에서 주의할 점</a></li>
  </ul>
</div>

<h2>"5천만 원 넘으면 세율이 확 오른다"는 말, 사실일까?</h2>
<p>종합소득세를 처음 접하면 "소득이 한 구간만 넘어도 세금이 폭탄처럼 늘어난다"는 이야기를 듣게 됩니다. 절반은 맞고 절반은 오해입니다. 누진세율의 작동 방식을 정확히 이해하면, 막연한 두려움 대신 합리적인 계획을 세울 수 있습니다.</p>

<h3 id="section1">1. 누진세율이란</h3>
<p>대한민국 소득세는 소득이 높을수록 더 높은 세율을 적용하는 누진세 구조입니다. 중요한 점은, 소득이 상위 구간에 진입하더라도 <strong>전체 소득에 높은 세율이 적용되는 것이 아니라, 해당 구간을 초과한 부분에만 높은 세율이 적용</strong>된다는 것입니다.</p>
<p>예를 들어 과세표준이 1,500만 원이라면, 1,400만 원까지는 6%, 그 초과분 100만 원에만 15%가 적용됩니다. 전체 1,500만 원에 15%가 붙는 것이 아닙니다.</p>

<h3 id="section2">2. 2026년 세율표 8단계</h3>
<p>2026년 기준 종합소득세 과세표준 구간과 세율은 다음과 같습니다.</p>
<div class="not-prose my-6 overflow-x-auto">
  <table class="w-full border-collapse text-sm">
    <thead>
      <tr class="bg-emerald-50">
        <th class="border border-emerald-200 px-3 py-2 text-left font-semibold">과세표준</th>
        <th class="border border-emerald-200 px-3 py-2 text-center font-semibold">세율</th>
        <th class="border border-emerald-200 px-3 py-2 text-right font-semibold">누진공제액</th>
      </tr>
    </thead>
    <tbody>
      <tr><td class="border border-gray-200 px-3 py-2">1,400만 원 이하</td><td class="border border-gray-200 px-3 py-2 text-center">6%</td><td class="border border-gray-200 px-3 py-2 text-right">-</td></tr>
      <tr><td class="border border-gray-200 px-3 py-2">1,400만 ~ 5,000만 원</td><td class="border border-gray-200 px-3 py-2 text-center">15%</td><td class="border border-gray-200 px-3 py-2 text-right">126만 원</td></tr>
      <tr><td class="border border-gray-200 px-3 py-2">5,000만 ~ 8,800만 원</td><td class="border border-gray-200 px-3 py-2 text-center">24%</td><td class="border border-gray-200 px-3 py-2 text-right">576만 원</td></tr>
      <tr><td class="border border-gray-200 px-3 py-2">8,800만 ~ 1억 5,000만 원</td><td class="border border-gray-200 px-3 py-2 text-center">35%</td><td class="border border-gray-200 px-3 py-2 text-right">1,544만 원</td></tr>
      <tr><td class="border border-gray-200 px-3 py-2">1억 5,000만 ~ 3억 원</td><td class="border border-gray-200 px-3 py-2 text-center">38%</td><td class="border border-gray-200 px-3 py-2 text-right">1,994만 원</td></tr>
      <tr><td class="border border-gray-200 px-3 py-2">3억 ~ 5억 원</td><td class="border border-gray-200 px-3 py-2 text-center">40%</td><td class="border border-gray-200 px-3 py-2 text-right">2,594만 원</td></tr>
      <tr><td class="border border-gray-200 px-3 py-2">5억 ~ 10억 원</td><td class="border border-gray-200 px-3 py-2 text-center">42%</td><td class="border border-gray-200 px-3 py-2 text-right">3,594만 원</td></tr>
      <tr><td class="border border-gray-200 px-3 py-2">10억 원 초과</td><td class="border border-gray-200 px-3 py-2 text-center">45%</td><td class="border border-gray-200 px-3 py-2 text-right">6,594만 원</td></tr>
    </tbody>
  </table>
</div>

<h3 id="section3">3. 누진공제액으로 간편 계산</h3>
<p>구간별로 나눠 계산하는 것은 번거롭기 때문에, 실무에서는 누진공제액을 활용한 간편식을 사용합니다.</p>
<ul>
  <li><strong>산출세액 = 과세표준 × 세율 − 누진공제액</strong></li>
</ul>
<p>이 공식 하나면 어느 구간이든 한 번에 산출세액을 구할 수 있습니다. 누진공제액이 바로 "낮은 구간에 낮은 세율을 적용한 효과"를 한꺼번에 반영한 값이기 때문입니다.</p>

<h3 id="section4">4. 실제 계산 예시</h3>
<p>과세표준이 5,000만 원인 경우를 보겠습니다.</p>
<ul>
  <li>5,000만 원 × 24% = 1,200만 원</li>
  <li>1,200만 원 − 누진공제 576만 원 = <strong>624만 원</strong></li>
</ul>
<p>참고로 여기에 산출세액의 10%인 지방소득세가 별도로 더해집니다. 또한 과세표준은 매출이 아니라 매출에서 필요경비와 각종 공제를 뺀 금액이라는 점을 기억해야 합니다.</p>

<h3 id="section5">5. 구간 경계에서 주의할 점</h3>
<p>구간이 바뀌는 경계, 특히 15%에서 24%로 뛰는 5,000만 원 부근에서는 공제 항목을 얼마나 확보하느냐가 실효세율을 크게 좌우합니다. 과세표준을 한 구간 아래로 낮출 수 있다면 절세 효과가 상당히 커집니다. 구체적인 공제·절세 방법은 별도의 글에서 자세히 다룹니다.</p>

<p class="text-sm text-gray-500 mt-8">※ 본 글은 2026년 기준 정보이며, 세율과 구간은 세법 개정에 따라 달라질 수 있습니다. 정확한 세액은 국세청 홈택스 또는 세무 전문가와 확인하시기 바랍니다.</p>
<p class="text-xs text-gray-400 mt-2">최종 업데이트: 2026-05-16</p>
`,
  },
  {
    id: "income-3",
    title: "장부신고 vs 추계신고, 무엇이 유리할까? 기장의무와 경비율의 모든 것",
    excerpt:
      "종합소득세 신고에는 장부를 쓰는 방법과 경비율로 추산하는 방법이 있습니다. 간편장부·복식부기 의무와 단순경비율·기준경비율 적용 기준을 정리합니다.",
    category: "종합소득세",
    author: "절세노트 편집팀",
    date: "2026-05-18",
    updated: "2026-05-20",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
    readTime: "10분",
    hashtags: [
      "장부신고",
      "추계신고",
      "단순경비율",
      "기준경비율",
      "간편장부",
      "복식부기",
      "기장의무",
    ],
    content: `
<div class="toc-minimal">
  <p><strong>한눈에 보기</strong></p>
  <ul>
    <li><a href="#section1">1. 두 가지 신고 방식</a></li>
    <li><a href="#section2">2. 기장의무 판단</a></li>
    <li><a href="#section3">3. 경비율 신고의 구조</a></li>
    <li><a href="#section4">4. 어느 쪽이 유리한가</a></li>
    <li><a href="#section5">5. 무기장 가산세 주의</a></li>
    <li><a href="#section6">6. 결론과 실무 팁</a></li>
  </ul>
</div>

<h2>같은 매출인데 세금이 다른 이유</h2>
<p>같은 매출을 올린 두 사업자가 전혀 다른 세금을 내는 일이 종종 있습니다. 핵심은 "소득금액을 어떻게 계산했는가"에 있습니다. 종합소득세는 매출이 아니라 소득금액(매출 − 필요경비)에 매겨지는데, 이 필요경비를 산정하는 방식이 신고 방법에 따라 달라지기 때문입니다.</p>

<h3 id="section1">1. 두 가지 신고 방식</h3>
<p>종합소득세 신고는 크게 두 가지로 나뉩니다.</p>
<ul>
  <li><strong>장부신고:</strong> 실제 수입과 비용을 장부에 기록해 소득금액을 계산하는 방식</li>
  <li><strong>추계신고:</strong> 장부 없이 정해진 경비율로 필요경비를 추산하는 방식</li>
</ul>
<p>장부를 제대로 갖추면 실제 지출한 경비를 모두 인정받을 수 있지만, 기록과 증빙 관리가 필요합니다. 추계신고는 간편하지만 인정받는 경비가 정해진 비율로 제한됩니다.</p>

<h3 id="section2">2. 기장의무 판단</h3>
<p>사업자는 직전 연도 수입금액에 따라 장부 작성 의무가 달라집니다. 업종별로 기준이 다르지만 일반적인 틀은 다음과 같습니다.</p>
<ul>
  <li><strong>복식부기의무자:</strong> 수입금액이 업종별 기준을 넘는 사업자. 정식 복식부기 장부를 작성해야 합니다.</li>
  <li><strong>간편장부대상자:</strong> 신규 사업자이거나 수입금액이 일정 기준 미만인 사업자. 가계부 형태의 간편장부로 신고할 수 있습니다.</li>
</ul>
<p>국세청은 소규모 사업자를 위해 간편장부 제도를 운영하고 있으며, 간편장부대상자가 성실히 기장해 신고하면 일정 세액공제 혜택도 받을 수 있습니다.</p>

<h3 id="section3">3. 경비율 신고의 구조</h3>
<p>장부를 작성하지 않고 추계신고할 때는 두 가지 경비율 중 하나가 적용됩니다.</p>
<ul>
  <li><strong>단순경비율:</strong> 영세·신규 사업자에게 적용. 수입금액에 단순경비율을 곱한 금액을 통째로 경비로 인정합니다. 계산이 간단하고 인정 경비가 큰 편입니다.</li>
  <li><strong>기준경비율:</strong> 일정 규모 이상 사업자에게 적용. 매입·임차료·인건비 등 주요 경비는 증빙으로, 나머지는 기준경비율로 추산합니다.</li>
</ul>
<p>본인이 어느 경비율 대상인지는 업종과 직전 연도 수입금액에 따라 결정되며, 홈택스 신고 안내문에서 확인할 수 있습니다.</p>

<h3 id="section4">4. 어느 쪽이 유리한가</h3>
<p>일반적인 판단 기준은 다음과 같습니다.</p>
<ul>
  <li><strong>실제 경비가 경비율보다 클 때:</strong> 장부신고가 유리합니다. 인테리어, 장비, 임차료 등 큰 지출이 있었던 사업자가 여기에 해당합니다.</li>
  <li><strong>실제 경비가 적거나 증빙이 부족할 때:</strong> 단순경비율 추계신고가 오히려 유리할 수 있습니다. 특히 경비가 거의 들지 않는 인적용역 프리랜서가 그렇습니다.</li>
</ul>
<p>다만 단순경비율은 누구나 적용받을 수 있는 것이 아니므로, 본인 대상 여부를 먼저 확인해야 합니다.</p>

<h3 id="section5">5. 무기장 가산세 주의</h3>
<p>복식부기의무자가 장부 없이 추계신고하면 무기장가산세가 부과될 수 있습니다. 또한 일정 규모 이상의 사업자가 장부를 작성하지 않으면 추가 불이익이 따를 수 있으므로, 규모가 커진 사업자는 장부 작성을 권장합니다.</p>

<h3 id="section6">6. 결론과 실무 팁</h3>
<p>매출 규모가 작고 경비가 거의 없는 초기 프리랜서라면 추계신고로 간단히, 매출이 커지고 실제 경비 지출이 많아지면 장부신고로 전환하는 것이 일반적인 흐름입니다. 평소 적격증빙(세금계산서, 카드, 현금영수증)을 모아두면 어느 방식이든 선택지가 넓어집니다.</p>

<p class="text-sm text-gray-500 mt-8">※ 본 글은 2026년 기준 일반 정보입니다. 업종별 기장의무 기준과 경비율은 매년 고시되므로, 본인 사업장 기준은 국세청 홈택스에서 반드시 확인하시기 바랍니다.</p>
<p class="text-xs text-gray-400 mt-2">최종 업데이트: 2026-05-20</p>
`,
  },
];
