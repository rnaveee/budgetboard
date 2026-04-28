import type Category from "../../types/category";

type CategoryCardProps = {
    category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps){



    return (
        <div
            className="card max-w-xs bg-white shadow-sm flex border"
            style={{ borderColor: category.color }}
        >
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
