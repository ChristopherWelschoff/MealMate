import { Leaf, Heart, Plus } from "lucide-react";
import { useRouter } from "next/router";
import Link from "next/link";
export default function Navbar() {
  const router = useRouter();

  const isActive = (href: string) => router.pathname === href;
  return (
    <nav className=" flex justify-evenly w-full border-t-3 p-3 mt-9 bg-white">
      <Link href="/landingPage">
        <div className="flex flex-col items-center">
          <Leaf
            className={
              isActive("/landingPage")
                ? "fill-green-900 stroke-black"
                : "stroke-gray-500"
            }
          />
        </div>
      </Link>

      <div className="flex flex-col items-center">
        <Link href="/recipe/createRecipe">
          <Plus
            className={
              isActive("/recipe/createRecipe")
                ? "fill-green-900 stroke-black"
                : "stroke-gray-500"
            }
          />
        </Link>
      </div>

      <div className="flex flex-col items-center">
        <Heart
          className={
            isActive("") ? "fill-green-900 stroke-black" : "stroke-gray-500"
          }
        />
      </div>
    </nav>
  );
}
