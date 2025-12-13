import { Category } from "@/types/news";
import { cn } from "@/lib/utils";

const categories: Category[] = [
  { id: "all", name: "For You" },
  { id: "world", name: "World" },
  { id: "technology", name: "Technology" },
  { id: "business", name: "Business" },
  { id: "sport", name: "Sports" },
  { id: "culture", name: "Culture" },
  { id: "science", name: "Science" },
  { id: "environment", name: "Environment" },
];

interface CategoryNavProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryNav = ({ activeCategory, onCategoryChange }: CategoryNavProps) => {
  return (
    <nav className="sticky top-[73px] z-40 bg-background/80 backdrop-blur-xl border-b border-border/30">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                "category-pill whitespace-nowrap",
                activeCategory === category.id && "category-pill-active"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CategoryNav;
