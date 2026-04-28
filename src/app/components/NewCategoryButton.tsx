
type NewCategoryButtonProps = {
    onClick: () => void;
}

export default function NewCategoryButton({ onClick }: NewCategoryButtonProps){

    return (
        <>

            <button
            onClick={onClick}
            className="w-12 border rounded-lg p-3 bg-green-600 text-white hover:bg-green-500 active:bg-green-400"
            >
                +
            </button>

        </>

    )
}