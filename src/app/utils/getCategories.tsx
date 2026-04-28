import type Category from "../../types/category.tsx"

export default function getCategories(): Category[] {
  if (typeof window === "undefined") {
    return [];
  }

  const savedCategories = localStorage.getItem("categories");

  if (!savedCategories) {
    return [];
  }

  return JSON.parse(savedCategories);
}