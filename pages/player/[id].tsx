import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { getBookById } from "@/lib/book";
import { Book } from "@/types/book";
import styles from "@/styles/PlayerPage.module.css";

export default function PlayerPage() {
  const router = useRouter();
  const { id } = router.query as { id?: string };
  const [book, setBook] = useState<Book | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!id) return;
    const fetchBook = async () => {
      const data = await getBookById(id);
      setBook(data);
    };
    fetchBook();
  }, [id]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;
    if (isPlaying) audioElement.play();
    else audioElement.pause();
  }, [isPlaying]);

  const skipAudio = (secondsToSkip: number) => {
    const audioElement = audioRef.current;
    if (!audioElement) return;
    const next = Math.max(
      0,
      Math.min(
        audioElement.duration || 0,
        (audioElement.currentTime || 0) + secondsToSkip
      )
    );
    audioElement.currentTime = next;
    setCurrentTime(next);
  };

  const handleProgressChange = (percentage: number) => {
    const audioElement = audioRef.current;
    if (!audioElement || !duration) return;
    const next = (percentage / 100) * duration;
    audioElement.currentTime = next;
    setCurrentTime(next);
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  const formatTime = (time: number | undefined): string => {
    if (typeof time === "number" && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      const formatMinutes = minutes.toString().padStart(2, "0");
      const formatSeconds = seconds.toString().padStart(2, "0");
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  return (
    <div className={styles.summary}>
      <div className={styles["audio__book--summary"]}>
        <div className={styles["audio__book--summary-title"]}>
          {book?.title}
        </div>
        <div className={styles["audio__book--summary-text"]}>
          {book?.summary}
        </div>
      </div>
      <div className={styles.audio__wrapper}>
        <div className={styles["audio__track--wrapper"]}>
          <figure className={styles["audio__track--image-mask"]}>
            <figure className={styles["book__image--wrapper"]}>
              <img
                className={styles.book__image}
                src={book?.imageLink}
                alt=""
              />
            </figure>
          </figure>
          <div className={styles["audio__track--details-wrapper"]}>
            <div className={styles["audio__track--title"]}>{book?.title}</div>
            <div className={styles["audio__track--author"]}>{book?.author}</div>
          </div>
        </div>

        <audio
          ref={audioRef}
          src={book?.audioLink}
          preload="metadata"
          onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
          onTimeUpdate={() =>
            setCurrentTime(audioRef.current?.currentTime || 0)
          }
          onEnded={() => setIsPlaying(false)}
        ></audio>

        <div className={styles["audio__controls--wrapper"]}>
          <div className={styles.audio__controls}>
            <button
              className={styles["audio__controls--btn"]}
              onClick={() => skipAudio(-10)}
              aria-label="Back 10 seconds"
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
                <path
                  fill="none"
                  stroke-width="1.5"
                  d="M3.11111111,7.55555556 C4.66955145,4.26701301 8.0700311,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 L12,22 C6.4771525,22 2,17.5228475 2,12 M2,4 L2,8 L6,8 M9,16 L9,9 L7,9.53333333 M17,12 C17,10 15.9999999,8.5 14.5,8.5 C13.0000001,8.5 12,10 12,12 C12,14 13,15.5000001 14.5,15.5 C16,15.4999999 17,14 17,12 Z M14.5,8.5 C16.9253741,8.5 17,11 17,12 C17,13 17,15.5 14.5,15.5 C12,15.5 12,13 12,12 C12,11 12.059,8.5 14.5,8.5 Z"
                ></path>
              </svg>
            </button>
            <button
              className={`${styles["audio__controls--btn-play"]} ${styles["audio__controls--btn"]}`}
              onClick={() => setIsPlaying((prev) => !prev)}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M224 432h-80V80h80zm144 0h-80V80h80z"></path>
                </svg>
              ) : (
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  className={styles["audio__controls--play-icon"]}
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M96 448l320-192L96 64v384z"></path>
                </svg>
              )}
            </button>
            <button
              className={styles["audio__controls--btn"]}
              onClick={() => skipAudio(10)}
              aria-label="Forward 10 seconds"
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
                <path
                  fill="none"
                  stroke-width="1.5"
                  d="M20.8888889,7.55555556 C19.3304485,4.26701301 15.9299689,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 L12,22 C17.5228475,22 22,17.5228475 22,12 M22,4 L22,8 L18,8 M9,16 L9,9 L7,9.53333333 M17,12 C17,10 15.9999999,8.5 14.5,8.5 C13.0000001,8.5 12,10 12,12 C12,14 13,15.5000001 14.5,15.5 C16,15.4999999 17,14 17,12 Z M14.5,8.5 C16.9253741,8.5 17,11 17,12 C17,13 17,15.5 14.5,15.5 C12,15.5 12,13 12,12 C12,11 12.059,8.5 14.5,8.5 Z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className={styles["audio__progress--wrapper"]}>
          <div className={styles.audio__time}>{formatTime(currentTime)}</div>
          <input
            type="range"
            min={0}
            max={100}
            className={styles["audio__progress--bar"]}
            value={progressPercentage}
            onChange={(e) => handleProgressChange(Number(e.target.value))}
            style={{
              background: `linear-gradient(to right, rgb(43, 217, 124) ${progressPercentage}%, rgb(109, 120, 125) ${progressPercentage}%)`,
            }}
          />

          <div className={styles.audio__time}>{formatTime(duration)}</div>
        </div>
      </div>
    </div>
  );
}
