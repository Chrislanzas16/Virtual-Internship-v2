import styles from "../../styles/ForYou.module.css";
import { useEffect, useState } from "react";
import { getBooks } from "@/lib/book";
import type { Book } from "@/types/book";
import Link from "next/link";
import { useAppSelector } from "@/redux/store";
import { selectAuthLoading, selectIsAuthed } from "@/redux/authSlice";

export default function ForYou() {
  const [selected, setSelected] = useState<Book | null>(null);
  const [recommended, setRecommended] = useState<Book[]>([]);
  const [suggested, setSuggested] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const isLoggedIn = useAppSelector(selectIsAuthed);
  const authLoading = useAppSelector(selectAuthLoading);

  useEffect(() => {
    (async () => {
      try {
        const [sel, recs, sugg] = await Promise.all([
          getBooks("selected"),
          getBooks("recommended"),
          getBooks("suggested"),
        ]);

        const selectedBook = Array.isArray(sel) ? sel[0] : sel;

        setSelected(selectedBook);
        setRecommended(recs);
        setSuggested(sugg);
      } catch (e: any) {
        setErr(e.message ?? "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="row">
      <div className="container">
        <div className={styles.foryou__wrapper}>
          <div className={styles["for-you__title"]}>Selected just for you</div>
          {selected && (
            <Link
              className={styles.selected__book}
              href={`/book/${selected.id}`}
            >
              <div className={styles["selected__book--sub-title"]}>
                {selected.subTitle}
              </div>
              <div className={styles["selected__book--line"]}></div>
              <div className={styles["selected__book--content"]}>
                <figure className={styles["book__image--wrapper"]}>
                  <img
                    className={styles.book__image}
                    src={selected.imageLink}
                    alt=""
                  />
                </figure>
                <div className={styles["selected__book--text"]}>
                  <div className={styles["selected__book--title"]}>
                    {selected.title}
                  </div>
                  <div className={styles["selected__book--author"]}>
                    {selected.author}
                  </div>
                  <div className={styles["selected__book--duration-wrapper"]}>
                    <div className={styles["selected__book--icon"]}>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
                      </svg>
                    </div>
                    <div className={styles["selected__book--duration"]}></div>
                  </div>
                </div>
              </div>
            </Link>
          )}

          <div>
            <div className={styles["for-you__title"]}>Recommended For You</div>
            <div className={styles["for-you__sub--title"]}>
              We think you'll like these
            </div>
            <div className={styles["for-you__recommended--books"]}>
              {recommended.map((book) => (
                <Link
                  key={book.id}
                  className={styles["for-you__recommended--books-link"]}
                  href={`/book/${book.id}`}
                >
                  {!authLoading && book.subscriptionRequired && !isLoggedIn && (
                    <div className={styles.book__pill}>Premium</div>
                  )}

                  <figure className={styles["book__image--wrapper-too"]}>
                    <img
                      className={styles.book__image}
                      src={book.imageLink}
                      alt=""
                    />
                  </figure>
                  <div className={styles["recommended__book--title"]}>
                    {book.title}
                  </div>
                  <div className={styles["recommended__book--author"]}>
                    {book.author}
                  </div>
                  <div className={styles["recommended__book--sub-title"]}>
                    {book.subTitle}
                  </div>
                  <div className={styles["recommended__book--details-wrapper"]}>
                    <div className={styles["recommended__book--details"]}>
                      <div
                        className={styles["recommended__book--details-icon"]}
                      >
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 24 24"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                          <path d="M13 7h-2v6h6v-2h-4z"></path>
                        </svg>
                      </div>
                      <div
                        className={styles["recommended__book--details-text"]}
                      ></div>
                    </div>
                    <div className={styles["recommended__book--details"]}>
                      <div
                        className={styles["recommended__book--details-icon"]}
                      >
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 1024 1024"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"></path>
                        </svg>
                      </div>
                      <div
                        className={styles["recommended__book--details-text"]}
                      >
                        {book.averageRating}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className={styles["for-you__title"]}>Suggested Books</div>
            <div className={styles["for-you__sub--title"]}>
              Browse those books
            </div>
            <div className={styles["for-you__recommended--books"]}>
              {suggested.map((book) => (
                <Link
                  key={book.id}
                  className={styles["for-you__recommended--books-link"]}
                  href={`/book/${book.id}`}
                >
                  {!authLoading && book.subscriptionRequired && !isLoggedIn && (
                    <div className={styles.book__pill}>Premium</div>
                  )}
                  <figure className={styles["book__image--wrapper-too"]}>
                    <img
                      className={styles.book__image}
                      src={book.imageLink}
                      alt=""
                    />
                  </figure>
                  <div className={styles["recommended__book--title"]}>
                    {book.title}
                  </div>
                  <div className={styles["recommended__book--author"]}>
                    {book.author}
                  </div>
                  <div className={styles["recommended__book--sub-title"]}>
                    {book.subTitle}
                  </div>
                  <div className={styles["recommended__book--details-wrapper"]}>
                    <div className={styles["recommended__book--details"]}>
                      <div
                        className={styles["recommended__book--details-icon"]}
                      >
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 24 24"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                          <path d="M13 7h-2v6h6v-2h-4z"></path>
                        </svg>
                      </div>
                      <div
                        className={styles["recommended__book--details-text"]}
                      ></div>
                    </div>
                    <div className={styles["recommended__book--details"]}>
                      <div
                        className={styles["recommended__book--details-icon"]}
                      >
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 1024 1024"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"></path>
                        </svg>
                      </div>
                      <div
                        className={styles["recommended__book--details-text"]}
                      >
                        {book.averageRating}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
