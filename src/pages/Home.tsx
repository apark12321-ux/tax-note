import { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import { SITE, CATEGORIES } from "../config";
import { POSTS, searchPosts } from "../content";
import PostCard from "../components/PostCard";
import { useSeo } from "../lib/useSeo";

export default function Home() {
  useSeo({
    title: SITE.name,
    description: SITE.description,
    path: "/",
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";
  const [input, setInput] = useState(urlQuery);
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const debounceRef = useRef<number | undefined>(undefined);

  // input 변경 → 디바운스 500ms → URL ?q= 반영
  useEffect(() => {
    window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      if (input.trim()) {
        setSearchParams({ q: input.trim() }, { replace: true });
      } else {
        setSearchParams({}, { replace: true });
      }
    }, 500);
    return () => window.clearTimeout(debounceRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  // URL이 외부(뒤로가기 등)로 바뀌면 input 동기화
  useEffect(() => {
    setInput(urlQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlQuery]);

  const isSearching = urlQuery.trim().length > 0;

  const results = useMemo(() => {
    if (isSearching) return searchPosts(urlQuery);
    if (activeCat) return POSTS.filter((p) => p.category === activeCat);
    return POSTS;
  }, [isSearching, urlQuery, activeCat]);

  const clearSearch = () => {
    setInput("");
    setSearchParams({}, { replace: true });
  };

  return (
    <div>
      {/* 히어로 */}
      <section className="bg-gradient-to-b from-emerald-50 to-white border-b border-emerald-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20 text-center">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
            어려운 세금을 쉽게,<br className="sm:hidden" /> 절세는 정확하게
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            종합소득세 신고부터 공제·절세 전략, 사업자 세무까지. 프리랜서와
            자영업자, 직장인을 위한 한국 세금 정보 가이드입니다.
          </p>

          {/* 검색바 */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="궁금한 세금 주제를 검색하세요 (예: 연금저축, 부가세)"
              className="w-full pl-12 pr-12 py-3.5 rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            {input && (
              <button
                onClick={clearSearch}
                aria-label="검색어 지우기"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {isSearching ? (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600">
              <span className="font-bold text-gray-900">"{urlQuery}"</span> 검색
              결과 {results.length}건
            </p>
            <button
              onClick={clearSearch}
              className="text-sm text-emerald-700 hover:underline"
            >
              검색 닫기
            </button>
          </div>
        ) : (
          /* 카테고리 필터 */
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCat(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCat === null
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              전체
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.slug}
                onClick={() => setActiveCat(c.slug)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeCat === c.slug
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        )}

        {results.length === 0 ? (
          <div className="py-20 text-center text-gray-400">
            검색 결과가 없습니다. 다른 키워드로 시도해 보세요.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
