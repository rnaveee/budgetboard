
import type Category from "../../types/category";
import { useState } from 'react';

type EditCategoryModalProps = {
    category: Category;
    onClose: () => void;
    onUpdateCategory: (category: Category) => void | Promise<void>;
    onDeleteCategory: (category: Category) => void | Promise<void>;
};

export default function EditCategoryModal({ category, onClose, onUpdateCategory, onDeleteCategory }: EditCategoryModalProps){
    const [title, setTitle] = useState(category.name);
    const [budget, setBudget] = useState(String(category.budget));
    const [description, setDescription] = useState(category.description);
    const [color, setColor] = useState(category.color);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const updatedCategory: Category = {
            ...category,
            name: title,
            budget: Number(budget),
            description,
            color,
        };

        await onUpdateCategory(updatedCategory);
        onClose();
    }


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Edit category</h2>
                    <button
                        type="button"
                        className="justify-center items-center text-red-500"
                        onClick={onClose}
                    >
                        X
                    </button>
                </div>
                <div className="mt-4">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <label className="flex flex-col gap-1">
                            <span className="font-medium">Title</span>
                            <input
                                type="text"
                                defaultValue={category.name}
                                className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </label>
                        <label className="flex flex-col gap-1">
                            <span className="font-medium">Budget</span>
                            <input
                                type="number"
                                min="0"
                                defaultValue={category.budget}
                                className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(event) => setBudget(event.target.value)}
                            />
                        </label>
                        <label className="flex flex-col gap-1">
                            <span className="font-medium">Description</span>
                            <textarea
                                defaultValue={category.description}
                                className="min-h-24 w-full resize-none rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </label>
                        <label className="flex flex-col gap-1">
                            <span className="font-medium">Color</span>
                            <input
                                type="color"
                                defaultValue={category.color}
                                className="h-12 w-20 cursor-pointer rounded-lg border bg-white p-1"
                                onChange={(event) => setColor(event.target.value)}
                            />
                        </label>
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                className="flex-1 rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-500 active:bg-green-400"
                            >
                                Save category
                            </button>
                            <button
                                type="button"
                                className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-500 active:bg-red-400"
                                onClick={async () => {
                                    await onDeleteCategory(category)
                                    onClose();
                                }}
                            >
                                Delete category
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
