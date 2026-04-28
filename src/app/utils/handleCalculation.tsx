type CategoryBudget = {
  budget: number;
};

type CalculationInput = {
  income: string;
  savings: string;
  categories: CategoryBudget[];
};

function parseMoney(value: string) {
  return Number(value.replace("$", "").replaceAll(",", "")) || 0;
}

function getSavingsAmount(income: number, savings: string) {
  const trimmedSavings = savings.trim();

  if (trimmedSavings.endsWith("%")) {
    const percentage = Number(trimmedSavings.replace("%", ""));
    return income * (percentage / 100);
  }

  return parseMoney(trimmedSavings);
}

export default function handleCalculation({
  income,
  savings,
  categories,
}: CalculationInput) {
  const monthlyIncome = parseMoney(income);
  const savingsAmount = getSavingsAmount(monthlyIncome, savings);
  const categoryTotal = categories.reduce(
    (total, category) => total + category.budget,
    0
  );

  return monthlyIncome - savingsAmount - categoryTotal;
}
