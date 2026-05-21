import type { Post } from "../types";
import { incomeTaxPosts } from "./income-tax";
import { deductionPosts } from "./deductions";
import { strategyPosts } from "./strategy";
import { businessPosts } from "./business";
import type { CategorySlug } from "../config";

// 발행일 내림차순 정렬 (최신 글이 먼저)
export const POSTS: Post[] = [
  ...incomeTaxPosts,
  ...deductionPosts,
  ...strategyPosts,
  ...businessPosts,
].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export function getPostsByCategory(slug: CategorySlug): Post[] {
  return POSTS.filter((p) => p.category === slug);
}

export function getPostById(id: string): Post | undefined {
  return POSTS.find((p) => p.id === id);
}

export function searchPosts(query: string): Post[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return POSTS.filter((p) => {
    const haystack = (
      p.title +
      " " +
      p.excerpt +
      " " +
      (p.hashtags?.join(" ") ?? "") +
      " " +
      p.category
    ).toLowerCase();
    return haystack.includes(q);
  });
}
