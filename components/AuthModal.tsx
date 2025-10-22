import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/router";
import { auth, googleProvider } from "@/lib/firebase";
import { useState, FormEvent } from "react";
import { close, setMode, setError } from "@/redux/authModalSlice";
import styles from "../styles/Auth.module.css";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  signInAnonymously,
} from "firebase/auth";

export default function AuthModal() {
  const dispatch = useAppDispatch();
  const { isOpen, mode, error } = useAppSelector((s) => s.authModal);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const redirectHome = () => {
    if (router.pathname === "/") {
      router.push("/for-you");
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    dispatch(setError(null));

    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await sendPasswordResetEmail(auth, email);
        dispatch(setError("Reset link sent. Check your email."));
        setLoading(false);
        return;
      }
      dispatch(close());
      redirectHome();
    } catch (err: any) {
      dispatch(setError(err.message));
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      dispatch(setError(null));
      await signInWithPopup(auth, googleProvider);
      dispatch(close());
      redirectHome();
    } catch (err: any) {
      dispatch(setError(err.message));
    } finally {
      setLoading(false);
    }
  };

  const loginAsGuest = async () => {
    try {
        setLoading(true)
        dispatch(setError(null))
        await signInAnonymously(auth)
        dispatch(close())
        redirectHome()
    } catch (err:any){
        dispatch(setError(err.message))
    } finally {
        setLoading(false)
    }
  }

  return <></>;
}
