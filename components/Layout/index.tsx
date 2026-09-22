import type { ReactNode } from "react";
import Navbar from "../Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="my-4 w-full text-center text-4xl text-green-600">
        MealMate
      </header>

      <main className="w-full flex-1">{children}</main>

      <footer className="w-full">
        <Navbar />
      </footer>
    </div>
  );
}
