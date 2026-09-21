import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="text-center text-4xl my-4 text-green-600">
        MealMate
      </header>
      <main>{children}</main>
    </>
  );
}
