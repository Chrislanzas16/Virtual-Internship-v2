import styles from "../../styles/ForYou.module.css";
import { FaSearch } from "react-icons/fa";

export default function forYou() {
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
          </div>
        </div>
      </div>
      <h1>This is for you page</h1>
    </div>
  );
}
