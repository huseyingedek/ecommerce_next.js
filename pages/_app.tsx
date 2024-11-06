import '@/Public/styles/globals.css'
import '@/Public/styles/products.css'
import type { AppProps } from 'next/app'
import { Layout } from "@/Core/index";
import { Provider } from "react-redux";
import store from "@/Redux/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
