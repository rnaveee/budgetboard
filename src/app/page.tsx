import Header from "./components/Header";
import IncomeForm from "./components/IncomeForm"
import CategoryCard from "./components/CategoryCard"
import SavingsForm from "./components/SavingsForm"

export default function Home() {
  return (
    <main>
      <Header />
      <section className="-mx-4 -mb-4 min-h-[calc(100vh-7rem)] bg-gray-200 px-4 py-6 md:-mx-8 md:-mb-8 md:min-h-[calc(100vh-8rem)] md:px-8 md:py-8">
        <div className='flex flex-col justify-center gap-4 sm:flex-row'>
          <IncomeForm />
          <SavingsForm />
        </div>
        <div className='flex mt-4 justify-center gap-3 flex-wrap'>
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </div>
      </section>
    </main>
  );
}
