import type { AppProps } from "next/app";
import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import type { Recipe } from "@/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function App({ Component, pageProps }: AppProps) {
  const {
    data: recipes,
    error,
    isLoading,
  } = useSWR<Recipe[]>("/api/recipes", fetcher);
  console.log(recipes);
  const router = useRouter();
  const isHome = router.pathname === "/";

  if (isHome) {
    return <Component {...pageProps} />;
  }

  return (
    <>
      <Layout>
        <Component
          recipes={recipes}
          error={error}
          isLoading={isLoading}
          {...pageProps}
        />
      </Layout>
    </>
  );
}
