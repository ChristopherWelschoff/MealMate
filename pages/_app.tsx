import type { AppProps } from "next/app";
import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isHome = router.pathname === "/";

  if (isHome) {
    return <Component {...pageProps} />;
  }

  return (
    <>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </>
  );
}
