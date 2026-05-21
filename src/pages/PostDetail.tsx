import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Clock, Share2, Printer, ArrowLeft } from "lucide-react";
import { getPostById, getPostsByCategory } from "../content";
import { sanitizeContent, slugify, formatDate } from "../lib/utils";
import { thumbnailFor } from "../lib/thumbnail";
import { useSeo } from "../lib/useSeo";
import { SITE } from "../config";
import PostCard from "../components/PostCard";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = id ? getPostById(id) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useSeo({
    title: post?.title ?? "글을 찾을 수 없습니다",
    description: post?.excerpt ?? "",
    path: post ? `/post/${post.id}/${slugify(post.title)}` : "/",
    type: "article",
  });

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <p className="text-gray-500">요청하신 글을 찾을 수 없습니다.</p>
        <Link to="/" className="mt-4 inline-block text-emerald-700 hover:underline">
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  const related = getPostsByCategory(post.category)
    .filter((p) => p.id !== post.id)
    .slice(0, 3);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, url });
      } catch {
        /* 사용자가 취소한 경우 무시 */
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert("링크가 클립보드에 복사되었습니다.");
      } catch {
        alert(url);
      }
    }
  };

  // Article JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: SITE.name },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}/post/${post.id}/${slugify(post.title)}`,
    },
  };

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-emerald-700 mb-6"
      >
        <ArrowLeft size={16} /> 뒤로
      </button>

      {/* 헤더 */}
      <div className="mb-6">
        <Link
          to={`/category/${encodeURIComponent(post.category)}`}
          className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full"
        >
          {post.category}
        </Link>
        <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-400">
          <span>{post.author}</span>
          <span>{formatDate(post.date)}</span>
          {post.updated && post.updated !== post.date && (
            <span>업데이트 {formatDate(post.updated)}</span>
          )}
          <span className="flex items-center gap-1">
            <Clock size={14} /> {post.readTime}
          </span>
        </div>
      </div>

      {/* 대표 이미지 */}
      <div className="aspect-[16/7] rounded-2xl overflow-hidden mb-8 bg-gray-100">
        <img
          src={thumbnailFor(post.id, post.category)}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 본문 (sanitize 거침) */}
      <div
        className="article-body"
        dangerouslySetInnerHTML={{ __html: sanitizeContent(post.content) }}
      />

      {/* 해시태그 */}
      {post.hashtags && (
        <div className="mt-10 flex flex-wrap gap-2">
          {post.hashtags.map((t) => (
            <span
              key={t}
              className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full"
            >
              #{t}
            </span>
          ))}
        </div>
      )}

      {/* 공유/인쇄 */}
      <div className="mt-8 flex gap-3">
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700"
        >
          <Share2 size={16} /> 공유하기
        </button>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50"
        >
          <Printer size={16} /> 인쇄
        </button>
      </div>

      {/* 관련 글 */}
      {related.length > 0 && (
        <div className="mt-16 pt-10 border-t border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            이 카테고리의 다른 글
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {related.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
