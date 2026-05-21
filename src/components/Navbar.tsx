import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Receipt } from "lucide-react";
import { SITE, CATEGORIES } from "../config";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const goHome = () => {
    setOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* 로고 + 사이트명 (모바일에서도 표시, 클릭 시 홈) */}
          <button
            onClick={goHome}
            className="flex items-center gap-2 group"
            aria-label="홈으로"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-600 text-white">
              <Receipt size={20} />
            </span>
            <span className="font-extrabold text-lg tracking-tight text-gray-900">
              {SITE.name}
            </span>
          </button>

          {/* 데스크탑 메뉴 */}
          <nav className="hidden md:flex items-center gap-1">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to={`/category/${encodeURIComponent(c.slug)}`}
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 transition"
              >
                {c.name}
              </Link>
            ))}
            <Link
              to="/about"
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 transition"
            >
              소개
            </Link>
          </nav>

          {/* 모바일 토글 */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setOpen((v) => !v)}
            aria-label="메뉴"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {open && (
        <nav className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to={`/category/${encodeURIComponent(c.slug)}`}
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-emerald-50"
            >
              {c.name}
            </Link>
          ))}
          <Link
            to="/about"
            onClick={() => setOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-emerald-50"
          >
            소개
          </Link>
        </nav>
      )}
    </header>
  );
}
