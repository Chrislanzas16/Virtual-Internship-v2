import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const hideOn = ["/"];
  const showHeader = !hideOn.includes(useRouter().pathname);

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

      {showHeader && <Sidebar isOpen={isSidebarOpen} />}

      <div className={`wrapper ${!showHeader ? "wrapper--full" : ""}`}>
        {children}
      </div>
    </>
  );
}
