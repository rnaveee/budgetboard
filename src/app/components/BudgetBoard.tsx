'use client';

import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import FreeMoneyCard from "./FreeMoneyCard";
import IncomeForm from "./IncomeForm";
import NewCategoryButton from "./NewCategoryButton";
import SavingsForm from "./SavingsForm";
import handleCalculation from "../utils/handleCalculation";
import type Category from "../../types/category";
import CreateCategoryModal from "./CreateCategoryModal"

export default function BudgetBoard() {
  const [income, setIncome] = useState("");
  const [savings, setSavings] = useState("");
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const savedIncome = localStorage.getItem("income");

    if (savedIncome) {
      setIncome(JSON.parse(savedIncome));
    }

    const savedSavings = localStorage.getItem("savings");

    if (savedSavings) {
      setSavings(JSON.parse(savedSavings));
    }

    const savedCategories = localStorage.getItem("categories");

    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  function addCategory(newCategory: Category){
    const updatedCategories = [...categories, newCategory];

    localStorage.setItem('categories', JSON.stringify(updatedCategories));

    setCategories(updatedCategories);
  }

  function handleNewIncome(newIncome: string){
    setIncome(newIncome);
    localStorage.setItem('income', JSON.stringify(newIncome));
  }

  function handleNewSavings(newSavings: string){
    setSavings(newSavings);
    localStorage.setItem('savings', JSON.stringify(newSavings));
  }

  const leftoverMoney = handleCalculation({
    income,
    savings,
    categories,
  });

  return (
    <section className="-mx-4 -mb-4 min-h-[calc(100vh-7rem)] bg-gray-200 px-4 py-6 md:-mx-8 md:-mb-8 md:min-h-[calc(100vh-8rem)] md:px-8 md:py-8">
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <IncomeForm income={income} onIncomeChange={handleNewIncome} />
        <SavingsForm savings={savings} onSavingsChange={handleNewSavings} />
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
          onAddCategory={addCategory}
        />
      )}
    </section>
  );
}
