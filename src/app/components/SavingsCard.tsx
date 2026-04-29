type SavingsCardProps = {
  savings: string;
};

export default function SavingsCard({ savings }: SavingsCardProps) {
  const trimmedSavings = savings.trim();
  const savingsDisplay = trimmedSavings ? trimmedSavings : "$0.00";

  return (
    <div className="card w-full max-w-sm bg-white px-3 py-3 shadow-lg border border-green-200">
      <div className="card-body flex-row items-center justify-between gap-4">
        <div>
          <h2 className="card-title text-2xl">Savings</h2>
          <p className="text-base">Savings per month</p>
        </div>
        <h1 className="text-3xl font-bold text-green-700">
          {savingsDisplay}
        </h1>
      </div>
    </div>
  );
}
