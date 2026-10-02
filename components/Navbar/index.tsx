import { Heart, Leaf, User, ChefHat, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  fillWhenActive: boolean;
};

const navItems: NavItem[] = [
  { href: "/landingPage", label: "Recipes", icon: Leaf, fillWhenActive: true },
  {
    href: "/my-recipes",
    label: "My-Recipes",
    icon: ChefHat,
    fillWhenActive: true,
  },
  {
    href: "/recipes/favoriteRecipes",
    label: "Favorites",
    icon: Heart,
    fillWhenActive: true,
  },
  {
    href: "/profile",
    label: "Profile",
    icon: User,
    fillWhenActive: true,
  },
];

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="mt-9 flex w-full justify-evenly border-t border-border bg-card/90 px-3 py-2 shadow-[0_-4px_12px_rgba(0,0,0,0.04)] backdrop-blur">
      {navItems.map(({ href, label, icon: Icon, fillWhenActive }) => {
        const isActive = router.pathname === href;

        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`flex flex-col items-center gap-1 rounded-xl px-4 py-1.5 transition ${
              isActive
                ? "bg-secondary text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <Icon
              size={22}
              strokeWidth={isActive ? 2 : 1.6}
              className={isActive && fillWhenActive ? "fill-primary" : ""}
            />
            <span className="text-[10px] font-medium uppercase tracking-[0.15em]">
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
