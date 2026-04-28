'use client';

import { useState } from "react";
import CategoryCard from "./CategoryCard";
import FreeMoneyCard from "./FreeMoneyCard";
import IncomeForm from "./IncomeForm";
import NewCategoryButton from "./NewCategoryButton";
import SavingsForm from "./SavingsForm";
import handleCalculation from "../utils/handleCalculation";
import type Category from "../../types/category";
import CreateCategoryModal from "./CreateCategoryModal"

const categories: Category[] = [
  {
    id: "1",
    budgetId: "budget-1",
    name: "Food",
    budget: 400,
    description: "The food I spend in a month",
    color: "#22c55e",
  },
  {
    id: "2",
    budgetId: "budget-1",
    name: "Japan Trip",
    budget: 100,
    description: "Japan trip budget for food and stuff",
    color: "#3b82f6",
  },
  {
    id: "3",
    budgetId: "budget-1",
    name: "Clothes",
    budget: 100,
    description: "Clothes I spend money on per month",
    color: "#f97316",
  },
];

export default function BudgetBoard() {
  const [income, setIncome] = useState("");
  const [savings, setSavings] = useState("");
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  

  const leftoverMoney = handleCalculation({
    income,
    savings,
    categories,
  });

  return (
    <section className="-mx-4 -mb-4 min-h-[calc(100vh-7rem)] bg-gray-200 px-4 py-6 md:-mx-8 md:-mb-8 md:min-h-[calc(100vh-8rem)] md:px-8 md:py-8">
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <IncomeForm income={income} onIncomeChange={setIncome} />
        <SavingsForm savings={savings} onSavingsChange={setSavings} />
      </div>
      <div className="flex justify-center mt-3">
        <FreeMoneyCard leftoverMoney={leftoverMoney} />
      </div>
      <div className="flex mt-4 justify-center gap-3 flex-wrap">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
        <div className="flex w-full justify-center sm:w-auto sm:items-center">
          <NewCategoryButton onClick={() => setIsCategoryModalOpen(true)}/>
        </div>
      </div>
      {isCategoryModalOpen && (
        <CreateCategoryModal
          onClose={() => setIsCategoryModalOpen(false)}
        />
      )}
    </section>
  );
}
