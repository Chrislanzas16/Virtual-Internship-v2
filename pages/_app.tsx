import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import AuthModal from "@/components/AuthModal";
import type { AppProps } from "next/app";
import AppShell from "@/components/AppShell";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AppShell>
        <Component {...pageProps} />
      </AppShell>
      <AuthModal />
    </Provider>
  );
}
