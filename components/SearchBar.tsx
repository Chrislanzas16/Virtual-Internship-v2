import { FaSearch } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import styles from "@/styles/SearchBar.module.css";

type Props = {
  onToggleSidebar?: () => void;
}


export default function SearchBar({onToggleSidebar}: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.search__background}>
        <div className={styles.search__wrapper}>
          <figure></figure>
          <div className={styles.search__content}>
            <div className={styles.search}>
              <div className={styles["search__input--wrapper"]}>
                <input
                  className={styles.search__input}
                  placeholder="Search for books"
                  type="text"
                ></input>
                <div className={styles.search__icon}>
                  <FaSearch />
                </div>
              </div>
            </div>

           <div className="sidebar_toggle__btn" onClick={onToggleSidebar}>
            <HiMenu size={24} />
           </div>

          </div>
        </div>
      </div>
    </div>
  );
}
