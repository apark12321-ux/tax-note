import type { CategorySlug } from "./config";

export interface Post {
  id: string; // "income-1", "deduct-1", "save-1", "biz-1"
  title: string;
  excerpt: string; // 2~3문장 요약 (meta description으로도 활용)
  content: string; // HTML 본문
  category: CategorySlug;
  author: string;
  date: string; // 발행일 "2026-05-21"
  updated?: string; // 최종 갱신일 (발행일과 다를 수 있음)
  image: string; // Unsplash URL
  readTime: string; // "10분"
  hashtags?: string[];
}
