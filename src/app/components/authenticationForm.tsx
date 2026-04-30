

export default function AuthenticationForm() {
  return (
    <section className="-mx-4 -mb-4 flex min-h-[calc(100vh-7rem)] items-center justify-center bg-gray-200 px-4 py-8 md:-mx-8 md:-mb-8 md:min-h-[calc(100vh-8rem)] md:px-8">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-md">
        <h1 className="text-center text-2xl font-bold text-green-700">
          BudgetBoard
        </h1>

        <form className="mt-6 flex flex-col gap-4" data-auth-form>
          <input
            id="sign-in"
            type="radio"
            name="auth-mode"
            defaultChecked
            className="sr-only"
          />
          <input
            id="sign-up"
            type="radio"
            name="auth-mode"
            className="sr-only"
          />

          <div className="relative grid rounded-lg bg-gray-100 p-1">
            <div className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-md bg-white shadow-sm transition-transform duration-300 ease-out [[data-auth-form]:has(#sign-up:checked)_&]:translate-x-full" />

            <div className="relative grid grid-cols-2">
              <label
                htmlFor="sign-in"
                className="cursor-pointer rounded-md px-4 py-2 text-center font-medium text-green-700 transition-colors duration-300 [[data-auth-form]:has(#sign-up:checked)_&]:text-gray-500"
              >
                Sign in
              </label>
              <label
                htmlFor="sign-up"
                className="cursor-pointer rounded-md px-4 py-2 text-center font-medium text-gray-500 transition-colors duration-300 [[data-auth-form]:has(#sign-up:checked)_&]:text-green-700"
              >
                Sign up
              </label>
            </div>
          </div>

          <label className="flex flex-col gap-1">
            <span className="font-medium">Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-medium">Password</span>
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <button
            type="submit"
            className="mt-2 rounded-lg bg-green-600 px-4 py-3 font-medium text-white transition-colors hover:bg-green-500 active:bg-green-400 [[data-auth-form]:has(#sign-up:checked)_&]:hidden"
          >
            Sign in
          </button>
          <button
            type="submit"
            className="mt-2 hidden rounded-lg bg-green-600 px-4 py-3 font-medium text-white transition-colors hover:bg-green-500 active:bg-green-400 [[data-auth-form]:has(#sign-up:checked)_&]:block"
          >
            Sign up
          </button>
        </form>
      </div>
    </section>
  );
}
