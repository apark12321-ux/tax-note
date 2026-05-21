import { Link } from "react-router-dom";
import { SITE, CATEGORIES } from "../config";

export default function Footer() {
  const b = SITE.business;
  return (
    <footer className="mt-20 border-t border-gray-100 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div className="col-span-2 md:col-span-1">
            <div className="font-extrabold text-base text-gray-900 mb-2">
              {SITE.name}
            </div>
            <p className="text-gray-500 leading-relaxed">{SITE.tagline}</p>
          </div>

          <div>
            <div className="font-semibold text-gray-800 mb-3">카테고리</div>
            <ul className="space-y-2">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/category/${encodeURIComponent(c.slug)}`}
                    className="text-gray-500 hover:text-emerald-700"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-semibold text-gray-800 mb-3">사이트 정보</div>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-500 hover:text-emerald-700">사이트 소개</Link></li>
              <li><Link to="/notice" className="text-gray-500 hover:text-emerald-700">공지사항</Link></li>
              <li><Link to="/privacy" className="text-gray-500 hover:text-emerald-700">개인정보처리방침</Link></li>
              <li><Link to="/terms" className="text-gray-500 hover:text-emerald-700">이용약관</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-gray-800 mb-3">문의</div>
            <ul className="space-y-2 text-gray-500">
              <li>{SITE.contactEmail}</li>
            </ul>
          </div>
        </div>

        {/* 사업자 정보 (사업자 운영 시) */}
        {b.enabled && (
          <div className="mt-10 pt-6 border-t border-gray-200 text-xs text-gray-400 leading-relaxed space-y-1">
            <div>상호: {b.companyName} | 대표자: {b.representative}</div>
            <div>사업자등록번호: {b.bizRegNo} | 통신판매업 신고번호: {b.mailOrderNo}</div>
            <div>주소: {b.address}</div>
          </div>
        )}

        <div className="mt-6 text-xs text-gray-400">
          © {new Date().getFullYear()} {SITE.name}. 본 사이트의 정보는 일반적인
          참고 목적이며 세무 상담을 대체하지 않습니다.
        </div>
      </div>
    </footer>
  );
}
