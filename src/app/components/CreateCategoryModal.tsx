
type CreateCategoryModalProps = {
    onClose: () => void;
};

export default function CreateCategoryModal({ onClose }: CreateCategoryModalProps){
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
                    <form className="flex flex-col gap-4">
                        <label className="flex flex-col gap-1">
                            <span className="font-medium">Title</span>
                            <input
                                type="text"
                                placeholder="Food"
                                className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </label>
                        <label className="flex flex-col gap-1">
                            <span className="font-medium">Budget</span>
                            <input
                                type="number"
                                placeholder="400"
                                min="0"
                                className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </label>
                        <label className="flex flex-col gap-1">
                            <span className="font-medium">Description</span>
                            <textarea
                                placeholder="Groceries, restaurants, and coffee"
                                className="min-h-24 w-full resize-none rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
