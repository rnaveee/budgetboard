'use client';

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
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
import { supabase } from "../utils/supabase";

export default function BudgetBoard() {
  const [income, setIncome] = useState("");
  const [savings, setSavings] = useState("");
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    }

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    }
  }, []);

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

  /*  category functions  */
  async function deleteCategory(deletedCategory: Category) {
    const updatedCategories = categories.filter((category) => {
      return category.id !== deletedCategory.id;
    });

    if(!user){
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
      return;
    }

    const { error } = await supabase
      .from("budgets")
      .delete()
      .eq("id", deletedCategory.id)
      .eq("user.id", user.id);
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

    if(!user){
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
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
      .eq("user_id", user.id);

    if (error) {
      console.error(error);
      return;
    }

    setCategories(updatedCategories);
  }

  async function addCategory(newCategory: Category){
    const updatedCategories = [...categories, newCategory];

    if(!user){
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
      return;
    }

    const { error } = await supabase.from("categories").insert({
      id: newCategory.id,
      user_id: user.id,
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
