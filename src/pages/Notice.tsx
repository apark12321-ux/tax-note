import { useEffect } from "react";
import { SITE } from "../config";
import { useSeo } from "../lib/useSeo";
import { formatDate } from "../lib/utils";

// 실제 운영 이력. 사이트가 실제로 성장하면서 항목을 추가하세요.
const NOTICES = [
  {
    date: SITE.launchDate,
    title: "절세노트 오픈",
    body: "한국의 세금·절세 정보를 쉽게 전달하기 위해 절세노트를 시작합니다. 종합소득세, 공제, 절세전략, 사업자세무 네 가지 주제로 글을 발행합니다.",
  },
];

export default function Notice() {
  useEffect(() => window.scrollTo(0, 0), []);
  useSeo({
    title: "공지사항",
    description: `${SITE.name}의 운영 소식과 업데이트 안내입니다.`,
    path: "/notice",
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-8">
        공지사항
      </h1>
      <div className="space-y-6">
        {NOTICES.map((n) => (
          <div
            key={n.date + n.title}
            className="rounded-2xl border border-gray-100 p-6 bg-white"
          >
            <div className="text-xs text-gray-400 mb-2">{formatDate(n.date)}</div>
            <h2 className="font-bold text-gray-900 mb-2">{n.title}</h2>
            <p className="text-gray-600 leading-relaxed">{n.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
