'use client';

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function Header() {
  const { isLoaded, isSignedIn } = useUser();

  return (
    <header className="-mx-4 flex flex-col items-center gap-4 border-b border-gray-300 px-4 pb-5 text-center sm:flex-row sm:justify-between sm:text-left md:-mx-8 md:px-8 md:pb-8">
      <h1 className="text-3xl font-bold text-green-600 drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)] sm:text-4xl md:text-5xl">
        BudgetBoard
      </h1>

      <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:justify-start">
        <a
          className="text-base font-medium text-black sm:text-lg"
          href="https://ca.linkedin.com/in/ryan-nave-36bb62333"
        >
          Contact me
        </a>

        {isLoaded && !isSignedIn && (
          <SignInButton mode="modal">
            <button className="text-base font-medium text-black sm:text-lg">
              Sign in
            </button>
          </SignInButton>
        )}

        {isLoaded && isSignedIn && <UserButton />}
      </nav>
    </header>
  );
}
