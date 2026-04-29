type SavingsCardProps = {
  income: string;
  savings: string;
};

function parseMoney(value: string) {
  return Number(value.replace("$", "").replaceAll(",", "")) || 0;
}

function getSavingsAmount(income: string, savings: string) {
  const monthlyIncome = parseMoney(income);
  const trimmedSavings = savings.trim();

  if (trimmedSavings.endsWith("%")) {
    const percentage = Number(trimmedSavings.replace("%", ""));
    return monthlyIncome * (percentage / 100);
  }

  return parseMoney(trimmedSavings);
}

export default function SavingsCard({ income, savings }: SavingsCardProps) {
  const trimmedSavings = savings.trim();
  const savingsAmount = trimmedSavings ? getSavingsAmount(income, savings) : 0;
  const savingsDisplay = `$${savingsAmount.toFixed(2)}`;

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
