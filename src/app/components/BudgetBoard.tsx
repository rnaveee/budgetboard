'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import FreeMoneyCard from "./FreeMoneyCard";
import IncomeForm from "./IncomeForm";
import NewCategoryButton from "./NewCategoryButton";
import SavingsCard from "./SavingsCard";
import SavingsForm from "./SavingsForm";
import handleCalculation from "../utils/handleCalculation";
import type Category from "../../types/category";
import CreateCategoryModal from "./CreateCategoryModal"
import EditCategoryModal from "./EditCategoryModal";
import { useSupabase } from "../utils/supabase";

const STORAGE_KEYS = {
  income: "income",
  savings: "savings",
  categories: "categories",
};

type CategoryRow = {
  id: string;
  budget_id: string;
  name: string;
  budget: number;
  description: string;
  color: string;
};

function getStoredValue<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  const storedValue = localStorage.getItem(key);

  if (!storedValue) {
    return fallback;
  }

  return JSON.parse(storedValue) as T;
}

function saveStoredValue<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

function mapCategoryRow(row: CategoryRow): Category {
  return {
    id: row.id,
    budgetId: row.budget_id,
    name: row.name,
    budget: row.budget,
    description: row.description,
    color: row.color,
  };
}

export default function BudgetBoard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [income, setIncome] = useState(() =>
    getStoredValue(STORAGE_KEYS.income, "")
  );
  const [savings, setSavings] = useState(() =>
    getStoredValue(STORAGE_KEYS.savings, "")
  );
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>(() =>
    getStoredValue<Category[]>(STORAGE_KEYS.categories, [])
  );
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const supabase = useSupabase();

  useEffect(() => {
    async function syncSupabaseCategories() {
      if (!isLoaded || !isSignedIn || !user) {
        return;
      }

      const localCategories = getStoredValue<Category[]>(
        STORAGE_KEYS.categories,
        []
      );

      if (localCategories.length > 0) {
        const rows = localCategories.map((category) => ({
          id: category.id,
          clerk_user_id: user.id,
          budget_id: category.budgetId,
          name: category.name,
          budget: category.budget,
          description: category.description,
          color: category.color,
        }));
        
        const { error } = await supabase
          .from("categories")
          .upsert(rows, { onConflict: "id" });
        if(error){
          console.error(error);
          return;
        }

        localStorage.removeItem(STORAGE_KEYS.categories);
      }

      const { data, error } = await supabase
          .from("categories")
          .select("id, budget_id, name, budget, description, color")
          .eq("clerk_user_id", user.id);

        if (error) {
          console.error(error);
          return;
        }

        setCategories((data ?? []).map(mapCategoryRow));
      }

    syncSupabaseCategories();
  }, [isLoaded, isSignedIn, user, supabase]);

  function saveLocalCategories(updatedCategories: Category[]) {
    setCategories(updatedCategories);
    saveStoredValue(STORAGE_KEYS.categories, updatedCategories);
  }

  /*  category functions  */
  async function deleteCategory(deletedCategory: Category) {
    const updatedCategories = categories.filter((category) => {
      return category.id !== deletedCategory.id;
    });

    if (!isSignedIn || !user) {
      saveLocalCategories(updatedCategories);
      return;
    }

    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", deletedCategory.id)
      .eq("clerk_user_id", user.id);

    if(error){
      console.error(error);
      return;
    }

    setCategories(updatedCategories);
  }

  async function updateCategory(updatedCategory: Category){
    const updatedCategories = categories.map((category) => {
      if(category.id === updatedCategory.id){
        return updatedCategory;
      }

      return category;
    });

    if (!isSignedIn || !user) {
      saveLocalCategories(updatedCategories);
      return;
    }

    const { error } = await supabase
      .from("categories")
      .update({
        budget_id: updatedCategory.budgetId,
        name: updatedCategory.name,
        budget: updatedCategory.budget,
        description: updatedCategory.description,
        color: updatedCategory.color,
      })
      .eq("id", updatedCategory.id)
      .eq("clerk_user_id", user.id);

    if (error) {
      console.error(error);
      return;
    }

    setCategories(updatedCategories);
  }

  async function addCategory(newCategory: Category){
    const updatedCategories = [...categories, newCategory];

    if (!isSignedIn || !user) {
      saveLocalCategories(updatedCategories);
      return;
    }

    const { error } = await supabase.from("categories").insert({
      id: newCategory.id,
      clerk_user_id: user.id,
      budget_id: newCategory.budgetId,
      name: newCategory.name,
      budget: newCategory.budget,
      description: newCategory.description,
      color: newCategory.color,
    });
    if(error){
      console.error(error);
      return;
    }

    setCategories(updatedCategories);
  }

  function handleNewIncome(newIncome: string){
    setIncome(newIncome);
    saveStoredValue(STORAGE_KEYS.income, newIncome);
  }

  function handleNewSavings(newSavings: string){
    setSavings(newSavings);
    saveStoredValue(STORAGE_KEYS.savings, newSavings);
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
      <div className="mt-3 flex flex-col items-center justify-center gap-3 lg:flex-row">
        <FreeMoneyCard leftoverMoney={leftoverMoney} />
        <SavingsCard income={income} savings={savings} />
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
      {editingCategory && (
        <EditCategoryModal 
        category={editingCategory}
        onClose={() => setEditingCategory(null)} 
        onUpdateCategory={updateCategory}
        onDeleteCategory={deleteCategory}
        />
      )}
    </section>
  );
}
