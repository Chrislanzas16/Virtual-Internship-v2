import styles from "../../styles/ForYou.module.css";
import { useEffect, useState } from "react";
import { getBooks } from "@/lib/book";
import type { Book } from "@/types/book";

export default function ForYou() {
  const [selected, setSelected] = useState<Book | null>(null);
  const [recommended, setRecommended] = useState<Book[]>([]);
  const [suggested, setSuggested] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [sel, recs, sugg] = await Promise.all([
          getBooks("selected"),
          getBooks("recommended"),
          getBooks("suggested"),
        ]);
        setSelected(sel);
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
    <div className={styles.row}>
      <div className={styles.container}>
        <div className={styles.foryou__wrapper}>
          <div className={styles["for-you__title"]}>Selected just for you</div>
        </div>
      </div>
    </div>
  );
}
