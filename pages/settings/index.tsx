import styles from "@/styles/Settings.module.css";
import Link from "next/link";
import { selectIsAuthed } from "@/redux/authSlice";
import { open } from "@/redux/authModalSlice";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import loginImage from "@/public/login.webp";
import Image from "next/image";

export default function Settings() {
  const isLoggedIn = useAppSelector(selectIsAuthed);
  const dispatch = useAppDispatch();

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
              <div className={styles.settings__text}>Basic</div>
              <Link href={"/choose-plan"} className={`${styles["settings__upgrade--btn"]} ${styles["btn"]}`} >
              Upgrade to Premium
              </Link>
            </div>
            <div className={styles.setting__content}>
              <div className={styles["settings__sub--title"]}>Email</div>
              <div className={styles.settings__text}>Email</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
