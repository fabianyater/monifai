import { Category } from "../../lib/types/Category";

type CategoryPillProps = {
  category: Category;
  selected: boolean;
  hasSelection?: boolean;
  onClick: () => void;
};

export const CategoryPill = ({
  category,
  selected,
  onClick,
  hasSelection = false,
}: CategoryPillProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-center py-1 px-2 border rounded-full cursor-pointer gap-2 transition-all
        hover:bg-gray-700 hover:text-white
        ${
          selected
            ? "border-white text-white bg-gray-700"
            : "border-gray-600 text-gray-400"
        }
        `}
    >
      <span className="text-xl">{category.emojis[0]}</span>
      <span className="text-sm font-medium">{category.name}</span>
      {hasSelection && selected && (
        <span className="text-xs text-gray-400">
          <i className="pi pi-chevron-right"></i>
        </span>
      )}
    </div>
  );
};
