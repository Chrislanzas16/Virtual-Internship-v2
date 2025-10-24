import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/router";
import { auth, googleProvider } from "@/lib/firebase";
import { useState, FormEvent } from "react";
import { close, setMode, setError } from "@/redux/authModalSlice";
import styles from "../styles/Auth.module.css";
import { FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
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
  const [loadingButton, setLoadingButtton] = useState<
    "guest" | "google" | "cta" | "forgot" | null
  >(null);

  if (!isOpen) return null;

  const redirectHome = () => {
    if (router.pathname === "/") {
      router.push("/for-you");
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(setError(null));

    try {
      setLoadingButtton(mode === "forgot" ? "forgot" : "cta");
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await sendPasswordResetEmail(auth, email);
        dispatch(setError("Reset link sent. Check your email."));
        return;
      }
      dispatch(close());
      redirectHome();
    } catch (err: any) {
      dispatch(setError(err.message));
    } finally {
      setLoadingButtton(null);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setLoadingButtton("google");
      dispatch(setError(null));
      await signInWithPopup(auth, googleProvider);
      dispatch(close());
      redirectHome();
    } catch (err: any) {
      dispatch(setError(err.message));
    } finally {
      setLoadingButtton(null);
    }
  };

  const loginAsGuest = async () => {
    try {
      setLoadingButtton("guest");
      dispatch(setError(null));
      await signInAnonymously(auth);
      dispatch(close());
      redirectHome();
    } catch (err: any) {
      dispatch(setError(err.message));
    } finally {
      setLoadingButtton(null);
    }
  };

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true">
      <div className={styles.card}>
        <button
          className={styles.closeBtn}
          onClick={() => dispatch(close())}
          aria-label="Close"
        >
          x
        </button>
        <h2 className={styles.title}>
          {mode === "login"
            ? "Log in to Summarist"
            : mode === "signup"
            ? "Sign up to Summarist"
            : "Reset your password"}
        </h2>

        {mode !== "forgot" && (
          <>
            <button
              className={styles.primaryBtn}
              onClick={loginAsGuest}
              disabled={loadingButton !== null}
            >
              <span className={styles.btnIcon}>
                <FaUser />
              </span>
              {loadingButton === "guest" ? (
                <span className={styles.spinnner}></span>
              ) : (
                "Login as a Guest"
              )}
            </button>

            <div className={styles.divider}>
              <span>or</span>
            </div>

            <button
              className={styles.primaryBtn}
              onClick={loginWithGoogle}
              disabled={loadingButton !== null}
            >
              <span className={styles.googleIcon}>
                <FcGoogle />
              </span>
              {loadingButton === "google" ? (
                <span className={styles.spinner}></span>
              ) : mode === "signup" ? (
                "Sign up with Google"
              ) : (
                "Login with Google"
              )}
            </button>
            <div className={styles.divider}>
              <span>or</span>
            </div>
          </>
        )}

        <form onSubmit={onSubmit}>
          {mode !== "forgot" ? (
            <>
              <input
                className={styles.input}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                className={styles.cta}
                type="submit"
                disabled={loadingButton !== null}
              >
                {loadingButton === "cta" ? (
                  <span className={styles.spinner}></span>
                ) : mode === "signup" ? (
                  "Sign Up"
                ) : (
                  "Login"
                )}
              </button>
            </>
          ) : (
            <>
              <input
                className={styles.input}
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                className={styles.cta}
                type="submit"
                disabled={loadingButton !== null}
              >
                {loadingButton === "forgot" ? (
                  <span className={styles.spinner}></span>
                ) : (
                  "Send reset password link"
                )}
              </button>
            </>
          )}
        </form>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.links}>
          {mode === "login" && (
            <>
              <button
                className={styles.linkBtn}
                onClick={() => dispatch(setMode("forgot"))}
              >
                Forgot your password?
              </button>
              <button
                className={styles.linkBtn}
                onClick={() => dispatch(setMode("signup"))}
              >
                Don't have an account?
              </button>
            </>
          )}
          {mode === "signup" && (
            <button
              className={styles.linkBtn}
              onClick={() => dispatch(setMode("login"))}
            >
              Already have an account?
            </button>
          )}
          {mode === "forgot" && (
            <button
              className={styles.linkBtn}
              onClick={() => dispatch(setMode("login"))}
            >
              Go to login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
