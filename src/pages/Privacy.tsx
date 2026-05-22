import { useEffect } from "react";
import { SITE } from "../config";
import { useSeo } from "../lib/useSeo";
import { formatDate } from "../lib/utils";

export default function Privacy() {
  useEffect(() => window.scrollTo(0, 0), []);
  useSeo({
    title: "개인정보처리방침",
    description: `${SITE.name}의 개인정보처리방침입니다.`,
    path: "/privacy",
  });

  const b = SITE.business;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
        개인정보처리방침
      </h1>
      <p className="text-gray-400 text-sm mb-8">
        시행일: {formatDate(SITE.launchDate)}
      </p>

      <div className="article-body">
        <p>
          {SITE.name}(이하 "사이트")는 이용자의 개인정보를 중요하게 생각하며,
          「개인정보 보호법」 등 관련 법령을 준수합니다. 본 방침은 사이트가
          이용자의 개인정보를 어떻게 수집·이용·보호하는지 안내합니다.
        </p>

        <h2>제1조 (개인정보의 처리 목적)</h2>
        <p>
          사이트는 별도의 회원가입 절차 없이 정보를 열람할 수 있는 콘텐츠
          제공형 서비스입니다. 사이트는 원칙적으로 이용자를 식별할 수 있는
          개인정보를 직접 수집하지 않으며, 다음의 제한적 목적에 한해 정보를
          처리합니다.
        </p>
        <ul>
          <li>문의 응대(이용자가 이메일로 문의한 경우)</li>
          <li>서비스 이용 통계 분석 및 품질 개선</li>
          <li>광고 게재 및 효과 측정</li>
        </ul>

        <h2>제2조 (수집하는 개인정보 항목 및 방법)</h2>
        <p>사이트가 처리할 수 있는 정보는 다음과 같습니다.</p>
        <ul>
          <li>
            <strong>문의 시:</strong> 이메일 주소, 문의 내용에 포함된 정보
            (이용자가 자발적으로 제공한 경우에 한함)
          </li>
          <li>
            <strong>자동 수집:</strong> 접속 IP, 쿠키, 브라우저·기기 정보, 방문
            기록 등 (방문 통계 및 광고 서비스 과정에서 자동 생성·수집)
          </li>
        </ul>

        <h2>제3조 (쿠키의 사용)</h2>
        <p>
          사이트는 이용자 경험 개선과 통계 분석, 광고 제공을 위해 쿠키를 사용할
          수 있습니다. 이용자는 웹브라우저 설정을 통해 쿠키 저장을 거부하거나
          삭제할 수 있습니다. 다만 쿠키 저장을 거부할 경우 일부 기능 이용에
          제한이 있을 수 있습니다.
        </p>

        <h2>제4조 (개인정보의 보유 및 이용 기간)</h2>
        <p>
          이메일 문의로 수집된 정보는 문의 처리 완료 후 관련 법령에 따른 보존
          기간이 없는 한 지체 없이 파기합니다. 자동 수집되는 정보는 통계·광고
          서비스 제공자의 정책에 따라 처리됩니다.
        </p>

        <h2>제5조 (개인정보의 제3자 제공)</h2>
        <p>
          사이트는 이용자의 개인정보를 본 방침에 명시한 범위를 넘어 제3자에게
          제공하지 않습니다. 다만 법령에 근거하거나 수사기관의 적법한 요청이
          있는 경우는 예외로 합니다.
        </p>

        <h2>제6조 (개인정보 처리의 위탁)</h2>
        <p>
          사이트는 서비스 운영을 위해 다음과 같이 외부 서비스를 이용할 수
          있으며, 이 과정에서 정보 처리가 위탁될 수 있습니다.
        </p>
        <div className="not-prose my-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-3 py-2 text-left font-semibold">
                  수탁 업체
                </th>
                <th className="border border-gray-200 px-3 py-2 text-left font-semibold">
                  위탁 업무
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-3 py-2">Google LLC</td>
                <td className="border border-gray-200 px-3 py-2">
                  광고 게재(AdSense), 방문 통계 분석
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">
                  호스팅 서비스 제공자
                </td>
                <td className="border border-gray-200 px-3 py-2">
                  웹사이트 호스팅 및 운영
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>제7조 (이용자의 권리와 행사 방법)</h2>
        <p>
          이용자는 자신의 개인정보에 대해 열람·정정·삭제·처리정지를 요청할 수
          있습니다. 요청은 아래 개인정보 보호책임자에게 이메일로 하실 수 있으며,
          사이트는 지체 없이 처리합니다.
        </p>

        <h2>제8조 (광고 게재 및 행태정보)</h2>
        <p>
          사이트는 Google AdSense 등 제3자 광고 서비스를 게재할 수 있습니다.
          이러한 광고 사업자는 쿠키 등을 이용해 이용자의 관심사에 기반한 맞춤형
          광고를 제공할 수 있습니다. 이용자는 아래 링크에서 맞춤형 광고 수신을
          거부하거나 관련 설정을 변경할 수 있습니다.
        </p>
        <ul>
          <li>
            Google 광고 설정:{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              adssettings.google.com
            </a>
          </li>
          <li>
            Google 광고 정책:{" "}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
            >
              policies.google.com/technologies/ads
            </a>
          </li>
          <li>
            Google 개인정보처리방침:{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              policies.google.com/privacy
            </a>
          </li>
        </ul>

        <h2>제9조 (개인정보의 안전성 확보 조치)</h2>
        <p>
          사이트는 처리하는 정보의 안전성을 확보하기 위해 접근 통제, 전송
          구간 암호화(HTTPS) 등 합리적인 보호 조치를 시행합니다.
        </p>

        <h2>제10조 (개인정보 보호책임자)</h2>
        <p>
          사이트는 개인정보 처리에 관한 업무를 총괄하는 보호책임자를 다음과
          같이 지정합니다.
        </p>
        <ul>
          <li>보호책임자: {SITE.privacyOfficer.name}</li>
          <li>
            이메일:{" "}
            <a href={`mailto:${SITE.privacyOfficer.email}`}>
              {SITE.privacyOfficer.email}
            </a>
          </li>
        </ul>

        <h2>제11조 (권익침해 구제 방법)</h2>
        <p>
          개인정보 침해에 대한 신고나 상담이 필요한 경우 아래 기관에 문의할 수
          있습니다.
        </p>
        <ul>
          <li>개인정보분쟁조정위원회: 1833-6972 (www.kopico.go.kr)</li>
          <li>개인정보침해신고센터: 118 (privacy.kisa.or.kr)</li>
          <li>대검찰청 사이버수사과: 1301 (www.spo.go.kr)</li>
          <li>경찰청 사이버수사국: 182 (ecrm.police.go.kr)</li>
        </ul>

        <h2>제12조 (정보주체의 동의 없는 처리)</h2>
        <p>
          사이트는 만 14세 미만 아동의 개인정보를 수집하지 않습니다. 아동이
          정보를 제공한 사실이 확인되면 지체 없이 파기합니다.
        </p>

        <h2>제13조 (방침의 변경)</h2>
        <p>
          본 개인정보처리방침은 법령·정책 변경에 따라 개정될 수 있으며, 변경 시
          사이트를 통해 공지합니다. 중요한 변경의 경우 시행 전 사전 안내합니다.
        </p>

        {b.enabled && (
          <p className="text-sm text-gray-500 mt-8">
            운영 사업자: {b.companyName} · 사업자등록번호 {b.bizRegNo} ·
            통신판매업 신고번호 {b.mailOrderNo}
          </p>
        )}
      </div>
    </div>
  );
}
