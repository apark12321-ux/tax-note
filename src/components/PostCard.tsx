import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import type { Post } from "../types";
import { slugify, formatDate } from "../lib/utils";
import { thumbnailFor } from "../lib/thumbnail";

export default function PostCard({ post }: { post: Post }) {
  const slug = slugify(post.title);
  return (
    <Link
      to={`/post/${post.id}/${slug}`}
      className="group block rounded-2xl overflow-hidden bg-white border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all"
    >
      <div className="aspect-[5/3] overflow-hidden bg-gray-100">
        <img
          src={thumbnailFor(post.id, post.category)}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            {post.category}
          </span>
        </div>
        <h3 className="font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-emerald-700 transition">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
        <div className="mt-4 flex items-center gap-3 text-xs text-gray-400">
          <span>{formatDate(post.date)}</span>
          <span className="flex items-center gap-1">
            <Clock size={12} /> {post.readTime}
          </span>
        </div>
      </div>
    </Link>
  );
}
