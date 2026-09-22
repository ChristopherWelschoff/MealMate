import type { AppProps } from "next/app";
import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import useSWR, { SWRConfig } from "swr";
import type { Recipe } from "@/types";

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

export default function App({ Component, pageProps }: AppProps) {
  const {
    data: recipes,
    error,
    isLoading,
  } = useSWR<Recipe[]>("/api/recipes", fetcher);
  const { data: categories } = useSWR<Recipe[]>("/api/categories", fetcher);

  const router = useRouter();
  const isHome = router.pathname === "/";

  if (isHome) {
    return <Component {...pageProps} />;
  }

  return (
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
  );
}
