import Link from "next/link";
import { motion } from "motion/react";
import {
  Apple,
  Carrot,
  Cherry,
  Citrus,
  Croissant,
  Egg,
  Fish,
  Leaf,
  Salad,
  Wheat,
  type LucideIcon,
} from "lucide-react";

import { Satisfy } from "next/font/google";

const logoFont = Satisfy({ subsets: ["latin"], weight: ["400"] });

type FloatingIngredient = {
  Icon: LucideIcon;
  top: string;
  left: string;
  size: number;
  driftX: number;
  driftY: number;
  duration: number;
  delay: number;
};

const ingredients: FloatingIngredient[] = [
  {
    Icon: Carrot,
    top: "18%",
    left: "12%",
    size: 30,
    driftX: 28,
    driftY: 22,
    duration: 9,
    delay: 0.1,
  },
  {
    Icon: Egg,
    top: "14%",
    left: "80%",
    size: 26,
    driftX: 22,
    driftY: 30,
    duration: 11,
    delay: 0.3,
  },
  {
    Icon: Cherry,
    top: "7%",
    left: "60%",
    size: 24,
    driftX: 30,
    driftY: 18,
    duration: 8,
    delay: 0.5,
  },
  {
    Icon: Apple,
    top: "40%",
    left: "8%",
    size: 24,
    driftX: 18,
    driftY: 28,
    duration: 10,
    delay: 0.2,
  },
  {
    Icon: Salad,
    top: "42%",
    left: "88%",
    size: 26,
    driftX: 20,
    driftY: 30,
    duration: 12,
    delay: 0.4,
  },
  {
    Icon: Wheat,
    top: "62%",
    left: "12%",
    size: 30,
    driftX: 24,
    driftY: 34,
    duration: 10,
    delay: 0.6,
  },
  {
    Icon: Citrus,
    top: "66%",
    left: "84%",
    size: 30,
    driftX: 30,
    driftY: 24,
    duration: 9,
    delay: 0.7,
  },
  {
    Icon: Fish,
    top: "92%",
    left: "18%",
    size: 30,
    driftX: 30,
    driftY: 14,
    duration: 11,
    delay: 0.8,
  },
  {
    Icon: Croissant,
    top: "94%",
    left: "80%",
    size: 30,
    driftX: 24,
    driftY: 12,
    duration: 10,
    delay: 0.9,
  },
];

export default function WelcomePage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_40%,#ecfdf3,#fafaf7_70%)] px-4">
      {/*Flying ingredients*/}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {ingredients.map(
          (
            { Icon, top, left, size, driftX, driftY, duration, delay },
            index,
          ) => (
            <motion.div
              key={index}
              className="absolute"
              style={{ top, left }}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 0.35,
                x: [0, driftX, -driftX * 0.6, 0],
                y: [0, -driftY, driftY * 0.5, 0],
                rotate: [0, 12, -10, 0],
              }}
              transition={{
                opacity: { duration: 1, delay },
                x: { duration, repeat: Infinity, ease: "easeInOut", delay },
                y: {
                  duration: duration * 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay,
                },
                rotate: {
                  duration: duration * 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay,
                },
              }}
            >
              <Icon size={size} strokeWidth={1.4} className="text-green-800" />
            </motion.div>
          ),
        )}
      </div>

      {/* Logo */}
      <div className="relative flex items-center justify-center">
        <motion.div
          className="absolute size-32 rounded-full bg-green-100"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.8, scale: [0.8, 1, 1.05, 1] }}
          transition={{
            opacity: { duration: 1.2, ease: "easeOut" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -25 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        >
          <motion.div
            animate={{ rotate: [0, 3, -3, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.3,
            }}
          >
            <Leaf size={64} className="fill-green-900 stroke-green-900" />
          </motion.div>
        </motion.div>
      </div>

      {/* Title */}
      <motion.h1
        className={`${logoFont.className} relative mt-6 text-6xl text-green-900`}
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, ease: "easeOut", delay: 1 }}
      >
        MealMate
      </motion.h1>

      {/* Divider line */}
      <motion.div
        className="relative mt-3 h-px w-20 bg-green-800/60"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 1.7 }}
      />

      {/* Slogan */}
      <motion.p
        className="relative mt-4 text-sm uppercase tracking-[0.25em] text-gray-500"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 2 }}
      >
        Welcome
      </motion.p>

      {/* Button */}
      <motion.div
        className="relative mt-16"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 2.5 }}
      >
        <Link
          href="/landingPage"
          className="inline-block rounded-full bg-green-900 px-10 py-3 text-sm font-medium uppercase tracking-[0.15em] text-white shadow-md transition hover:bg-green-800 hover:shadow-lg"
        >
          {`Lets cook`}
        </Link>
      </motion.div>
    </main>
  );
}
