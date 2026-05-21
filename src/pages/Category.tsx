import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { CATEGORIES } from "../config";
import { getPostsByCategory } from "../content";
import PostCard from "../components/PostCard";
import { useSeo } from "../lib/useSeo";

export default function Category() {
  const { slug } = useParams();
  const decoded = slug ? decodeURIComponent(slug) : "";
  const cat = CATEGORIES.find((c) => c.slug === decoded);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useSeo({
    title: cat ? cat.name : "카테고리",
    description: cat?.description ?? "",
    path: `/category/${encodeURIComponent(decoded)}`,
  });

  if (!cat) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <p className="text-gray-500">존재하지 않는 카테고리입니다.</p>
        <Link to="/" className="mt-4 inline-block text-emerald-700 hover:underline">
          홈으로
        </Link>
      </div>
    );
  }

  const posts = getPostsByCategory(cat.slug);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          {cat.name}
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
          {cat.description}
        </p>
        <p className="mt-2 text-sm text-gray-400">{posts.length}개의 글</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
