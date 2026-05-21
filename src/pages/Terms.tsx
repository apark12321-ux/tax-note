import { useEffect } from "react";
import { SITE } from "../config";
import { useSeo } from "../lib/useSeo";
import { formatDate } from "../lib/utils";

export default function Terms() {
  useEffect(() => window.scrollTo(0, 0), []);
  useSeo({
    title: "이용약관",
    description: `${SITE.name} 서비스 이용약관입니다.`,
    path: "/terms",
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
        이용약관
      </h1>
      <p className="text-gray-400 text-sm mb-8">
        시행일: {formatDate(SITE.launchDate)}
      </p>

      <div className="article-body">
        <h2>제1조 (목적)</h2>
        <p>
          본 약관은 {SITE.name}(이하 "사이트")가 제공하는 세금·절세 정보 콘텐츠
          서비스의 이용 조건과 절차, 이용자와 사이트의 권리·의무를 규정함을
          목적으로 합니다.
        </p>

        <h2>제2조 (정보의 성격)</h2>
        <p>
          사이트가 제공하는 모든 콘텐츠는 일반적인 정보 제공을 목적으로 합니다.
          이는 세무사·회계사 등 전문가의 개별 상담을 대체하지 않으며, 특정
          개인의 구체적 사안에 대한 법적·세무적 자문이 아닙니다. 이용자는 실제
          신고·납부에 앞서 국세청 등 공식 채널 또는 전문가를 통해 본인의 상황을
          확인할 책임이 있습니다.
        </p>

        <h2>제3조 (정보의 정확성과 면책)</h2>
        <p>
          사이트는 정확한 정보를 제공하기 위해 노력하나, 세법은 수시로
          개정됩니다. 콘텐츠의 정확성·완전성·최신성을 보증하지 않으며, 정보를
          신뢰하여 내린 결정으로 발생한 손해에 대해 책임을 지지 않습니다.
        </p>

        <h2>제4조 (저작권)</h2>
        <p>
          사이트에 게시된 콘텐츠의 저작권은 사이트 또는 정당한 권리자에게
          있습니다. 사전 동의 없는 무단 복제·배포·전송을 금지합니다. 출처를
          밝힌 인용은 관련 법령이 정한 범위 내에서 가능합니다.
        </p>

        <h2>제5조 (광고 및 제휴)</h2>
        <p>
          사이트는 운영을 위해 제3자 광고(예: Google AdSense)를 게재할 수 있으며,
          제휴 마케팅을 통해 일정 수수료를 받을 수 있습니다. 제휴 링크가 포함된
          콘텐츠에는 그 사실을 표시합니다. 광고·제휴 상품의 거래는 해당 사업자와
          이용자 간에 이루어지며, 사이트는 그 거래에 대해 책임을 지지 않습니다.
        </p>

        <h2>제6조 (금지 행위)</h2>
        <ul>
          <li>사이트 콘텐츠의 무단 복제·상업적 이용</li>
          <li>자동화된 수단을 통한 비정상적 접근 및 데이터 수집</li>
          <li>사이트 운영을 방해하는 일체의 행위</li>
        </ul>

        <h2>제7조 (약관의 변경)</h2>
        <p>
          본 약관은 관련 법령에 위배되지 않는 범위에서 변경될 수 있으며, 변경
          시 사이트 내 공지를 통해 안내합니다.
        </p>

        <h2>제8조 (문의)</h2>
        <p>
          약관 관련 문의는{" "}
          <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a> 으로
          연락하시기 바랍니다.
        </p>
      </div>
    </div>
  );
}
