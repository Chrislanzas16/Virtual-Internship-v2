import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "@/styles/Sidebar.module.css";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const hideOn = ["/"];
  const showHeader = !hideOn.includes(useRouter().pathname);
  const { pathname } = useRouter();
  const onPlayer = pathname.startsWith("/player");

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      {showHeader && (
        <SearchBar onToggleSidebar={() => setSidebarOpen((v) => !v)} />
      )}

      {isSidebarOpen && (
        <div
          className="sidebar_overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {showHeader && (
        <Sidebar
          isOpen={isSidebarOpen}
          className={onPlayer ? styles["sidebar--lifted"] : ""}
        />
      )}

      <div className={`wrapper ${!showHeader ? "wrapper--full" : ""}`}>
        {children}
      </div>
    </>
  );
}
