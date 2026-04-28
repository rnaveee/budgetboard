import Header from "./components/Header";
import IncomeForm from "./components/IncomeForm"
import CategoryCard from "./components/CategoryCard"
import SavingsForm from "./components/SavingsForm"
import CreateButton from "./components/CreateButton"
import NewCategoryButton from "./components/NewCategoryButton";
import FreeMoneyCard from "./components/FreeMoneyCard";

export default function Home() {
  return (
    <main>
      <Header />
      <section className="-mx-4 -mb-4 min-h-[calc(100vh-7rem)] bg-gray-200 px-4 py-6 md:-mx-8 md:-mb-8 md:min-h-[calc(100vh-8rem)] md:px-8 md:py-8">
        <div className='flex flex-col justify-center gap-4 sm:flex-row'>
          <IncomeForm />
          <SavingsForm />
        </div>
        <div className='flex justify-center mt-3'>
          <CreateButton />
        </div>
        <div className='flex justify-center mt-3'>
          <FreeMoneyCard />
        </div>
        <div className='flex mt-4 justify-center gap-3 flex-wrap'>
          <CategoryCard
            category={{
              id: "1",
              budgetId: "budget-1",
              name: "Food",
              budget: 400,
              description: "The food I spend in a month",
              color: "#22c55e",
            }}
          />
          <CategoryCard
            category={{
              id: "2",
              budgetId: "budget-1",
              name: "Japan Trip",
              budget: 1000,
              description: "Japan trip budget for food and stuff",
              color: "#3b82f6",
            }}
          />
          <CategoryCard
            category={{
              id: "3",
              budgetId: "budget-1",
              name: "Clothes",
              budget: 100,
              description: "Clothes I spend money on per month",
              color: "#f97316",
            }}
          />
          <div className="flex w-full justify-center sm:w-auto sm:items-center">
            <NewCategoryButton/>
          </div>
        </div>
      </section>
    </main>
  );
}
