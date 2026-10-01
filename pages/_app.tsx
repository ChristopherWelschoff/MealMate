import type { AppProps } from "next/app";
import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import useSWR, { SWRConfig } from "swr";
import type { Recipe, Category } from "@/types";
import { ToastContainer, Slide } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import { Satisfy } from "next/font/google";

const logoFont = Satisfy({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-satisfy",
});

const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error(
      "An error occurred while fetching the data.",
    ) as Error & {
      info?: unknown;
      status?: number;
    };

    error.info = await response.json();
    error.status = response.status;

    throw error;
  }

  return response.json();
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const {
    data: recipes,
    error,
    isLoading,
  } = useSWR<Recipe[]>("/api/recipes", fetcher);
  const { data: categories } = useSWR<Category[]>("/api/categories", fetcher);

  const router = useRouter();
  const isHome = router.pathname === "/";

  if (isHome) {
    return (
      <SessionProvider session={session}>
        <div className={logoFont.variable}>
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    );
  }

  return (
    <SessionProvider session={session}>
      {" "}
      <div className={logoFont.variable}>
        <SWRConfig value={{ fetcher }}>
          <Layout>
            <Component
              recipes={recipes}
              categories={categories}
              error={error}
              isLoading={isLoading}
              {...pageProps}
            />
          </Layout>
        </SWRConfig>
        <ToastContainer
          position="bottom-center"
          autoClose={2500}
          hideProgressBar
          closeOnClick
          pauseOnHover
          theme="light"
          transition={Slide}
          toastClassName="!shadow-lg !border !border-border !text-sm"
        />
      </div>
    </SessionProvider>
  );
}
