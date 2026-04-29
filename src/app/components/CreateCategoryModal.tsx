'use client';

import React, { useState } from "react";
import type Category from "../../types/category";

type CreateCategoryModalProps = {
    onClose: () => void;
    onAddCategory: (category: Category) => void;
};

export default function CreateCategoryModal({ onClose, onAddCategory }: CreateCategoryModalProps){

    const [title, setTitle] = useState("");
    const [budget, setBudget] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("#3b3b3b");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const newCategory: Category = {
            id: crypto.randomUUID(),
            budgetId: "budget-1",
            name: title,
            budget: Number(budget),
            description,
            color,
        };

        onAddCategory(newCategory);
        onClose();
    }

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">New category</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="justify-center items-center text-red-500"
                    >
                        X
                    </button>
                </div>
                <div className="mt-4">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <label className="flex flex-col gap-1">
                            <span className="font-medium">Title</span>
                            <input
                                type="text"
                                placeholder="Food"
                                className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </label>
                        <label className="flex flex-col gap-1">
                            <span className="font-medium">Budget</span>
                            <input
                                type="number"
                                placeholder="400"
                                min="0"
                                className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(event) => setBudget(event.target.value)}
                            />
                        </label>
                        <label className="flex flex-col gap-1">
                            <span className="font-medium">Description</span>
                            <textarea
                                placeholder="Groceries, restaurants, and coffee"
                                className="min-h-24 w-full resize-none rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </label>
                        <label className="flex flex-col gap-1">
                            <span className="font-medium">Color</span>
                            <input
                                type="color"
                                value={color}
                                className="h-12 w-20 cursor-pointer rounded-lg border bg-white p-1"
                                onChange={(event) => setColor(event.target.value)}
                            />
                        </label>
                        <button
                            type="submit"
                            className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-500 active:bg-green-400"
                        >
                            Add category
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
