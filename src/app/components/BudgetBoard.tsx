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

function mapCategoryToRow(category: Category, clerkUserId: string) {
  return {
    id: category.id,
    clerk_user_id: clerkUserId,
    budget_id: category.budgetId,
    name: category.name,
    budget: category.budget,
    description: category.description,
    color: category.color,
  };
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object" && error && "message" in error) {
    return String(error.message);
  }

  if (typeof error === "string") {
    return error;
  }

  return "Something went wrong. Please try again.";
}

export default function BudgetBoard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [income, setIncome] = useState("");
  const [savings, setSavings] = useState("");
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const { client: supabase, isLoaded: isSupabaseLoaded } = useSupabase();

  function showError(error: unknown) {
    console.error(error);
    setErrorMessage(getErrorMessage(error));
  }

  useEffect(() => {
    async function syncSupabaseCategories() {
      if (!isLoaded || !isSupabaseLoaded) {
        return;
      }

      if (!isSignedIn || !user) {
        setIncome(getStoredValue(STORAGE_KEYS.income, ""));
        setSavings(getStoredValue(STORAGE_KEYS.savings, ""));
        setCategories(getStoredValue<Category[]>(STORAGE_KEYS.categories, []));
        return;
      }

      if (!supabase) {
        showError("Supabase is not configured. Add your Supabase environment variables in Vercel.");
        return;
      }

      const localIncome = getStoredValue(STORAGE_KEYS.income, "");
      const localSavings = getStoredValue(STORAGE_KEYS.savings, "");

      if (localIncome || localSavings) {
        const { error: settingsMigrationError } = await supabase.from("budget_settings").upsert({
          clerk_user_id: user.id,
          income: localIncome,
          savings: localSavings,
          updated_at: new Date().toISOString(),
        });

        if (settingsMigrationError) {
          showError(settingsMigrationError);
          return;
        }

        localStorage.removeItem(STORAGE_KEYS.income);
        localStorage.removeItem(STORAGE_KEYS.savings);
      }

      const { data: settingsData, error: settingsError } = await supabase
        .from("budget_settings")
        .select("income, savings")
        .eq("clerk_user_id", user.id)
        .maybeSingle();

      if (settingsError) {
        showError(settingsError);
        return;
      }

      if (settingsData) {
        setIncome(settingsData.income ?? "");
        setSavings(settingsData.savings ?? "");
      }

      const localCategories = getStoredValue<Category[]>(
        STORAGE_KEYS.categories,
        []
      );

      if (localCategories.length > 0) {
        const rows = localCategories.map((category) =>
          mapCategoryToRow(category, user.id)
        );
        
        const { error: categoriesMigrationError } = await supabase
          .from("categories")
          .upsert(rows, { onConflict: "id" });
        if(categoriesMigrationError){
          showError(categoriesMigrationError);
          return;
        }

        localStorage.removeItem(STORAGE_KEYS.categories);
      }

      const { data: categoriesData, error: categoriesError } = await supabase
          .from("categories")
          .select("id, budget_id, name, budget, description, color")
          .eq("clerk_user_id", user.id);

        if (categoriesError) {
          showError(categoriesError);
          return;
        }

        setCategories((categoriesData ?? []).map(mapCategoryRow));
      }

    syncSupabaseCategories();
  }, [isLoaded, isSignedIn, isSupabaseLoaded, user, supabase]);

  useEffect(() => {
    let shouldLoad = true;

    async function loadLocalBudgetValues() {
      await Promise.resolve();

      if (!shouldLoad) {
        return;
      }

      setIncome(getStoredValue(STORAGE_KEYS.income, ""));
      setSavings(getStoredValue(STORAGE_KEYS.savings, ""));
    }

    loadLocalBudgetValues();

    return () => {
      shouldLoad = false;
    };
    
  }, []);

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

    if (!isSupabaseLoaded || !supabase) {
      showError("Supabase is not ready. Check your Supabase environment variables.");
      return;
    }

    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", deletedCategory.id)
      .eq("clerk_user_id", user.id);

    if(error){
      showError(error);
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

    if (!isSupabaseLoaded || !supabase) {
      showError("Supabase is not ready. Check your Supabase environment variables.");
      return;
    }

    const { error } = await supabase
      .from("categories")
      .update(mapCategoryToRow(updatedCategory, user.id))
      .eq("id", updatedCategory.id)
      .eq("clerk_user_id", user.id);

    if (error) {
      showError(error);
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

    if (!isSupabaseLoaded || !supabase) {
      showError("Supabase is not ready. Check your Supabase environment variables.");
      return;
    }

    const { error } = await supabase
      .from("categories")
      .insert(mapCategoryToRow(newCategory, user.id));
    if(error){
      showError(error);
      return;
    }

    setCategories(updatedCategories);
  }

  async function handleNewIncome(newIncome: string) {
    setIncome(newIncome);

    if (!isSignedIn || !user) {
      saveStoredValue(STORAGE_KEYS.income, newIncome);
      return;
    }

    if (!isSupabaseLoaded || !supabase) {
      showError("Supabase is not ready. Check your Supabase environment variables.");
      return;
    }

    const { error } = await supabase.from("budget_settings").upsert({
      clerk_user_id: user.id,
      income: newIncome,
      savings,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      showError(error);
    }
  }

  async function handleNewSavings(newSavings: string) {
    setSavings(newSavings);

    if (!isSignedIn || !user) {
      saveStoredValue(STORAGE_KEYS.savings, newSavings);
      return;
    }

    if (!isSupabaseLoaded || !supabase) {
      showError("Supabase is not ready. Check your Supabase environment variables.");
      return;
    }

    const { error } = await supabase.from("budget_settings").upsert({
      clerk_user_id: user.id,
      income,
      savings: newSavings,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      showError(error);
    }
  }

  const leftoverMoney = handleCalculation({
    income,
    savings,
    categories,
  });

  return (
    <section className="-mx-4 -mb-4 min-h-[calc(100vh-7rem)] bg-gray-200 px-4 py-6 md:-mx-8 md:-mb-8 md:min-h-[calc(100vh-8rem)] md:px-8 md:py-8">
      {errorMessage && (
        <div className="fixed right-4 top-4 z-50 max-w-sm rounded-lg border border-red-200 bg-white p-4 text-black shadow-lg">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <h2 className="font-semibold text-red-700">Something went wrong</h2>
              <p className="mt-1 text-sm text-gray-700">{errorMessage}</p>
            </div>
            <button
              type="button"
              className="text-lg leading-none text-gray-500 hover:text-black"
              onClick={() => setErrorMessage("")}
            >
              X
            </button>
          </div>
        </div>
      )}
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
