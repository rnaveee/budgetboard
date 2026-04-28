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
import getCategories from "../utils/getCategories";


export default function BudgetBoard() {
  const [income, setIncome] = useState("");
  const [savings, setSavings] = useState("");
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>(() => {
    return getCategories();
  });
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  function addCategory(newCategory: Category){
    const updatedCategories = [...categories, newCategory];

    setCategories(updatedCategories);

    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  }

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
          <CategoryCard onEdit={() => setEditingCategory(category)} key={category.id} category={category} />
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
