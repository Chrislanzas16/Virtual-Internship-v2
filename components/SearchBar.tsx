import { FaSearch } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import styles from "@/styles/SearchBar.module.css";
import { useDebounce } from "@/hooks/useDebounce";
import { useState, useEffect } from "react";
import Link from "next/link";


type Props = {
  onToggleSidebar?: () => void;
};

interface SearchResult {
  id: string;
  title: string;
  author: string;
  imageLink: string;
}

export default function SearchBar({ onToggleSidebar }: Props) {
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const debouncedQuery = useDebounce<string>(query, 300);
  const [loading, setLoading] = useState(false);

  const handleSelect = () => {
    setSearchResults([]);
    setLoading(false)
    setQuery("");
  }


  useEffect(() => {
    if (debouncedQuery) {
      const fetchResults = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${debouncedQuery}`
          );
          const data: SearchResult[] = await response.json();
          setSearchResults(data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchResults();
    } else {
      setSearchResults([]);
    }
  }, [debouncedQuery]);

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
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                ></input>

                {debouncedQuery && (
                  <>
                    {loading ? (
                      <ul className={styles["search__books--wrapper"]}>Loading...</ul>
                    ) : searchResults.length > 0 ? (
                      <ul className={styles["search__books--wrapper"]}>
                        {searchResults.map((result) => (
                          <Link
                            key={result.id}
                            className={styles["search__book--link"]}
                            href={`/book/${result.id}`}
                            onClick={handleSelect}
                          >
                            <figure
                              className={styles["book__image--wrapper-search"]}
                            >
                              <img
                                className={styles.book__image}
                                src={result.imageLink}
                                alt=""
                              />
                            </figure>

                            <div>
                              <div className={styles["search__book--title"]}>
                                {result.title}
                              </div>
                              <div className={styles["search__book--author"]}>
                                {result.author}
                              </div>
                              <div className={styles["search__book--duration"]}>
                                <div
                                  className={
                                    styles["recommended__book--details"]
                                  }
                                >
                                  <div
                                    className={
                                      styles["recommended__book--details-icon"]
                                    }
                                  >
                                    <svg
                                      stroke="currentColor"
                                      fill="currentColor"
                                      strokeWidth="0"
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
                                    className={
                                      styles["recommended__book--details-text"]
                                    }
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </ul>
                    ) : (
                      <div className={styles["search__books--wrapper"]}>
                        <p className={styles["search__empty"]}>
                          No books found
                        </p>
                      </div>
                    )}
                  </>
                )}

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
