import { Link } from "wouter";
import { useState, useEffect } from "react";
import { getCategories } from "@/lib/sanityClient";

export default function CategoryList() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    getCategories()
      .then(data => setCategories(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-foreground">Categories</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {categories.map((category) => (
          <Link key={category._id || category.slug} href={`/category/${category.slug}`}>
            <a className="block p-3 rounded-lg bg-card border border-border hover:border-primary hover:bg-secondary transition-all duration-200 text-center text-sm font-medium text-foreground hover:text-primary">
              {category.name}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
