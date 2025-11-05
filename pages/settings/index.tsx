import styles from "@/styles/Settings.module.css";
import Link from "next/link";
import {
  selectAuthLoading,
  selectIsAuthed,
  selectUserEmail,
} from "@/redux/authSlice";
import { open } from "@/redux/authModalSlice";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import loginImage from "@/public/login.webp";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Settings() {
  const isLoggedIn = useAppSelector(selectIsAuthed);
  const dispatch = useAppDispatch();
  const userEmail = useAppSelector(selectUserEmail);
  const authLoading = useAppSelector(selectAuthLoading);

  type Plan = "basic" | "premium" | "premium-plus";
  let userPlan = "basic" as Plan;

  if (authLoading) {
    return (
      <div className="container">
        <div className="row">
          <div
            className={` ${styles["section__title"]} ${styles["page__title"]}`}
          >
            Settings
          </div>
          <div className={styles.skeleton} style={{width:160,height:24, marginBottom:12}}></div>
          <div className={styles.skeleton} style={{width:280,height:24, marginBottom:32}}></div>
          <div className={styles.skeleton} style={{width:160,height:24, marginBottom:12}}></div>
          <div className={styles.skeleton} style={{width:280,height:24}}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div
          className={` ${styles["section__title"]} ${styles["page__title"]}`}
        >
          Settings
        </div>

        {!isLoggedIn ? (
          <div className={styles["settings__login--wrapper"]}>
            <Image src={loginImage} alt="login" />
            <div className={styles["settings__login--text"]}>
              Log in to your account to see your details.
            </div>
            <button
              onClick={() => dispatch(open())}
              className={`${styles["settings__login--btn"]} ${styles["btn"]}`}
            >
              Login
            </button>
          </div>
        ) : (
          <>
            <div className={styles.setting__content}>
              <div className={styles["settings__sub--title"]}>
                Your Subscription Plan
              </div>
              {userPlan === "basic" && (
                <>
                  <div className={styles.settings__text}>Basic</div>
                  <Link
                    href={"/choose-plan"}
                    className={`${styles["settings__upgrade--btn"]} ${styles["btn"]}`}
                  >
                    Upgrade to Premium
                  </Link>
                </>
              )}

              {userPlan === "premium" && (
                <div className={styles.settings__text}>Premium</div>
              )}

              {userPlan === "premium-plus" && (
                <div className={styles.settings__text}>Premium Plus</div>
              )}
            </div>
            <div className={styles.setting__content}>
              <div className={styles["settings__sub--title"]}>Email</div>
              <div className={styles.settings__text}>
                {userEmail ?? "guest@summarist.app"}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
