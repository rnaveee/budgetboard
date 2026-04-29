export default function WhatIsBudgetBoard() {
  return (
    <section className="-mx-4 bg-white px-4 py-8 md:-mx-8 md:px-8">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-3 text-center">
        <h2 className="text-2xl font-bold text-green-700">What is BudgetBoard?</h2>
        <div>
          BudgetBoard is an app designed to track your monthly savings.
        </div>
        <div className="text-xl font-bold text-center">
          How it works
        </div>
        <p>
          By inputting your monthly income, and how much money you want to put into your savings per month,
          BudgetBoard will calculate the leftover money you have after your budgeting!
        </p>
        <div className="text-xl font-bold">
          Categories
        </div>
        <p>
          BudgetBoard lets you create budgeting categories so you can set how much money you want to save.
          BudgetBoard will automatically take out money from the leftover money to calculate how much money you have left!
        </p>
        <div className="text-xl font-bold">
          Data
        </div>
        <p>
          BudgetBoard stores your settings and budgets on your local machine, so you can only access your budgets on the device you created it on.
          <br/>
          <strong>Sharing between other devices will come soon!</strong>

        </p>
      </div>
    </section>
  );
}
