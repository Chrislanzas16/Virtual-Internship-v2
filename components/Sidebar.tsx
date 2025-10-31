import styles from "@/styles/Sidebar.module.css";
import Link from "next/link";
import { HiOutlineHome } from "react-icons/hi";
import { HiOutlineBookmark } from "react-icons/hi";
import { HiOutlinePencil } from "react-icons/hi";
import { HiOutlineSearch } from "react-icons/hi";
import {
  HiOutlineCog6Tooth,
  HiOutlineQuestionMarkCircle,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import { open as openAuthModal } from "@/redux/authModalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  logoutLocal,
  selectAuthLoading,
  selectIsAuthed,
} from "@/redux/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

type Props = {
  isOpen: boolean,
  className?:string
}

export default function Sidebar({isOpen, className= ""}: Props ) {
  const dispatch = useAppDispatch();
  const isAuthed = useAppSelector(selectIsAuthed);
  const loading = useAppSelector(selectAuthLoading);

  const handleClick = async () => {
    if (loading) return;
    if (isAuthed) {
      await signOut(auth);
      dispatch(logoutLocal());
    } else {
      dispatch(openAuthModal());
    }
  };
  return (
    <>
      <div className={`${styles.sidebar} ${isOpen ? styles["sidebar--opened"] : " "} ${className} `}>
        <img
          className={styles.sidebar__logo}
          src="https://summarist.vercel.app/_next/static/media/logo.1b1c490b.png"
          alt="logo"
        />
        <div className={styles.sidebar__wrapper}>
          <div className={styles.sidebar__top}>
            <Link
              href={"/for-you"}
              className={styles["sidebar__link--wrapper"]}
            >
              <div className={styles["sidebar__link--line"]}></div>
              <div className={styles["sidebar__icon--wrapper"]}>
                <HiOutlineHome size={22} />
              </div>
              <div className={styles["sidebar__link--text"]}>For you</div>
            </Link>
            <Link
              href={"/library"}
              className={styles["sidebar__link--wrapper"]}
            >
              <div className={styles["sidebar__link--line"]}></div>
              <div className={styles["sidebar__icon--wrapper"]}>
                <HiOutlineBookmark size={22} />
              </div>
              <div className={styles["sidebar__link--text"]}>My Library</div>
            </Link>

            <div
              className={`${styles["sidebar__link--wrapper"]} ${styles["sidebar__link--not-allowed"]}`}
            >
              <div className={styles["sidebar__link--line"]}></div>
              <div className={styles["sidebar__icon--wrapper"]}>
                <HiOutlinePencil size={22} />
              </div>
              <div className={styles["sidebar__link--text"]}>Highlights</div>
            </div>

            <div
              className={`${styles["sidebar__link--wrapper"]} ${styles["sidebar__link--not-allowed"]}`}
            >
              <div className={styles["sidebar__link--line"]}></div>
              <div className={styles["sidebar__icon--wrapper"]}>
                <HiOutlineSearch size={22} />
              </div>
              <div className={styles["sidebar__link--text"]}>Search</div>
            </div>
          </div>

          <div className={styles.sidebar__bottom}>
            <Link
              href={"/settings"}
              className={styles["sidebar__link--wrapper"]}
            >
              <div className={styles["sidebar__link--line"]}></div>
              <div className={styles["sidebar__icon--wrapper"]}>
                <HiOutlineCog6Tooth size={22} />
              </div>
              <div className={styles["sidebar__link--text"]}>Settings</div>
            </Link>
            <div
              className={`${styles["sidebar__link--wrapper"]} ${styles["sidebar__link--not-allowed"]}`}
            >
              <div className={styles["sidebar__link--line"]}></div>
              <div className={styles["sidebar__icon--wrapper"]}>
                <HiOutlineQuestionMarkCircle size={22} />
              </div>
              <div className={styles["sidebar__link--text"]}>
                Help & Support
              </div>
            </div>

            <button
              type="button"
              onClick={handleClick}
              className={styles["sidebar__link--wrapper"]}
            >
              <div className={styles["sidebar__link--line"]}></div>
              <div className={styles["sidebar__icon--wrapper"]}>
                <HiOutlineArrowRightOnRectangle size={22} />
              </div>
              <div className={styles["sidebar__link--text"]}>
                {isAuthed ? "Logout" : "Login"}
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
