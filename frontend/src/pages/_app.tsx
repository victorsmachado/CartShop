import { AppProps } from "next/app";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";
import { QueryClient, QueryClientProvider } from "react-query";
import { CartProvider } from "@/context/CartContext";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <ChakraProvider>
      <CartProvider>
        <QueryClientProvider client={queryClient}>
          <DefaultSeo
            titleTemplate={`%s - My App`}
            description={`My App is a great app`}
            openGraph={{
              type: "website",
              locale: "en_IE",
              url: `https://myapp.com${router.asPath}`,
              site_name: "My App",
            }}
          />
          <CSSReset />
          <Component {...pageProps} />
        </QueryClientProvider>
      </CartProvider>
    </ChakraProvider>
  );
}

export default MyApp;
