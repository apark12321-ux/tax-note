import { useEffect } from "react";
import { SITE, CATEGORIES } from "../config";
import { useSeo } from "../lib/useSeo";
import { formatDate } from "../lib/utils";

export default function About() {
  useEffect(() => window.scrollTo(0, 0), []);
  useSeo({
    title: "사이트 소개",
    description: `${SITE.name}는 한국의 세금과 절세 정보를 쉽게 풀어 전달하는 정보 가이드입니다. 운영 원칙과 편집 방향을 소개합니다.`,
    path: "/about",
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
        {SITE.name} 소개
      </h1>
      <p className="text-gray-400 text-sm mb-8">
        운영 시작일: {formatDate(SITE.launchDate)}
      </p>

      <div className="article-body">
        <h2>우리가 하는 일</h2>
        <p>
          {SITE.name}는 복잡하고 어렵게 느껴지는 한국의 세금 제도를 누구나
          이해할 수 있도록 쉽게 풀어 설명하는 정보 가이드입니다. 종합소득세
          신고를 앞두고 막막한 프리랜서와 자영업자, 절세에 관심 있는 직장인과
          일반인을 주된 독자로 생각하고 글을 씁니다.
        </p>

        <h2>다루는 주제</h2>
        <ul>
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <strong>{c.name}:</strong> {c.short}
            </li>
          ))}
        </ul>

        <h2>편집 원칙</h2>
        <p>
          세금은 개인의 재정과 직결되는 민감한 주제입니다. 그래서 다음 원칙을
          지킵니다.
        </p>
        <ul>
          <li>
            <strong>출처 기반:</strong> 세율·공제 한도 등 수치는 국세청·홈택스
            등 공식 자료를 기준으로 작성하며, 적용 연도를 명시합니다.
          </li>
          <li>
            <strong>변경 가능성 안내:</strong> 세법은 매년 바뀝니다. 본문에 기준
            연도를 표기하고, 정확한 적용은 공식 채널 확인을 권합니다.
          </li>
          <li>
            <strong>상담 대체 아님:</strong> 모든 글은 일반적인 정보 제공
            목적이며, 개별 세무 상담을 대체하지 않습니다.
          </li>
        </ul>

        <h2>문의</h2>
        <p>
          내용 관련 문의나 정정 요청은{" "}
          <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a> 으로
          보내주시면 검토 후 반영하겠습니다.
        </p>
      </div>
    </div>
  );
}
