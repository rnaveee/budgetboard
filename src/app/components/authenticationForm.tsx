import { SignIn } from "@clerk/nextjs";

export default function AuthenticationForm() {
  return (
    <section className="-mx-4 -mb-4 flex min-h-[calc(100vh-7rem)] items-center justify-center bg-gray-200 px-4 py-8 md:-mx-8 md:-mb-8 md:min-h-[calc(100vh-8rem)] md:px-8">
      <SignIn
        routing="hash"
        appearance={{
          elements: {
            cardBox: "shadow-md",
            card: "rounded-xl border-0 shadow-none",
            headerTitle: "text-green-700",
            formButtonPrimary:
              "bg-green-600 hover:bg-green-500 active:bg-green-400",
            footerActionLink: "text-green-700 hover:text-green-600",
          },
        }}
      />
    </section>
  );
}
