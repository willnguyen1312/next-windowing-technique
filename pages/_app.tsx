import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
