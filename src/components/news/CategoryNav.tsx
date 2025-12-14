import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface CategoryNavProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryNav = ({ activeCategory, onCategoryChange }: CategoryNavProps) => {
  const { t } = useLanguage();
  const categories = [
    { id: "all", name: t.forYou },
    { id: "world", name: t.world },
    { id: "technology", name: t.technology },
    { id: "business", name: t.business },
    { id: "sport", name: t.sports },
    { id: "culture", name: t.culture },
    { id: "science", name: t.science },
    { id: "environment", name: t.environment },
    { id: "fashion", name: t.beauty },
    { id: "lifeandstyle", name: t.lifestyle },
  ];

  return (
    <nav className="sticky top-[60px] sm:top-[69px] z-40 bg-background/80 backdrop-blur-xl border-b border-border/30">
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