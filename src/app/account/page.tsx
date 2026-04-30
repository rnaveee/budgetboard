import AuthenticationForm from "../components/authenticationForm";
import Header from "../components/Header";
import WhatIsBudgetBoard from "../components/WhatIsBudgetBoard";

export default function Home() {
  return (
    <main>
        <Header/>
        <AuthenticationForm/>
        <WhatIsBudgetBoard/>
    </main>
  );
}