import type { ReactNode } from "react";
import Link from "next/link";
import { Leaf } from "lucide-react";
import Navbar from "../Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="my-4 flex w-full items-center justify-center">
        <Link href="/landingPage" className="flex items-center gap-2">
          <Leaf size={28} className="fill-primary stroke-primary" />
          <span className="font-logo text-4xl text-primary">MealMate</span>
        </Link>
      </header>

      <main className="w-full flex-1">{children}</main>

      <footer className="sticky bottom-0 w-full">
        <Navbar />
      </footer>
    </div>
  );
}
