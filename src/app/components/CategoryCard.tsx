import type Category from "../../types/category";

type CategoryCardProps = {
    category: Category;
    onEdit: () => void;
}

export default function CategoryCard({ category, onEdit }: CategoryCardProps){

    return (
        <div
            className="card relative max-w-xs bg-white shadow-sm flex border"
            style={{ borderColor: category.color }}
        >
            <button
                type="button"
                aria-label={`Settings for ${category.name}`}
                className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-500"
                onClick={onEdit}
            >
                ⚙️
            </button>
            <div className="card-body flex items-center">
                <h2 className="card-title">{category.name}</h2>
                <h2
                    className="text-3xl font-bold"
                    style={{ color: category.color }}
                >
                    {category.budget}$
                </h2>
                <p>{category.description}</p>
            </div>
            <figure
                className='flex min-h-3'
                style={{ backgroundColor: category.color }}
            >
            </figure>
        </div>
    )
}
