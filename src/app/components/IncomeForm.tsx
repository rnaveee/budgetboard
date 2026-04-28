'use client';

type IncomeFormProps = {
    income: string;
    onIncomeChange: (income: string) => void;
};

export default function IncomeForm({ income, onIncomeChange }: IncomeFormProps){

    return (
        <div className="bg-white shadow-md rounded-xl p-6 max-w-md w-full flex flex-col items-center">
            <h1 className='text-xl'>Your monthly income</h1>
            <div>
                <form className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 pt-3">
                        <div className="text-xl">$</div>
                        <input
                        type="number"
                        placeholder="1000"
                        value={income}
                        onChange={(e) => onIncomeChange(e.target.value)}
                        className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
