import Header from "./components/Header";
import BudgetBoard from "./components/BudgetBoard";
import WhatIsBudgetBoard from "./components/WhatIsBudgetBoard";

export default function Home() {
  return (
    <main>
      <Header />
      <BudgetBoard />
      <WhatIsBudgetBoard />
    </main>
  );
}
