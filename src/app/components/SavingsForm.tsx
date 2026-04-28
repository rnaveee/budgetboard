'use client';

type SavingsFormProps = {
    savings: string;
    onSavingsChange: (savings: string) => void;
};

export default function SavingsForm({ savings, onSavingsChange }: SavingsFormProps){

    return (
        <div className="bg-white shadow-md rounded-xl p-6 max-w-md w-full flex flex-col items-center">
            <h1 className='text-xl'>Your savings</h1>
            <div>
                <form className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 pt-3">
                        <input
                        type="text"
                        placeholder="$1000, 20%"
                        value={savings}
                        onChange={(e) => onSavingsChange(e.target.value)}
                        className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
