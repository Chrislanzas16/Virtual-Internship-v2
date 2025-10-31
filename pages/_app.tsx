import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store, useAppDispatch } from "@/redux/store";
import AuthModal from "@/components/AuthModal";
import type { AppProps } from "next/app";
import AppShell from "@/components/AppShell";
import { useEffect } from "react";
import { setUser, startLoading } from "@/redux/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

function AuthGate() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(startLoading());

    const unsub = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        dispatch(setUser({ uid: fbUser.uid, email: fbUser.email }));
      } else {
        dispatch(setUser(null));
      }
    });
    return () => unsub();
  }, [dispatch]);
  return null;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthGate />
      <AppShell>
        <Component {...pageProps} />
      </AppShell>
      <AuthModal />
    </Provider>
  );
}
