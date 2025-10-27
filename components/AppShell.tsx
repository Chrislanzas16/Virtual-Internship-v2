import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import styles from "@/styles/AppShell.module.css";
import { useRouter } from "next/router";


export default function AppShell({ children }: { children: React.ReactNode }) {
    const hideOn = ["/"]
    const showHeader = !hideOn.includes(useRouter().pathname)
  return (
    <>
      {showHeader && ( 
        <SearchBar />
      )}
      {showHeader && (
        <Sidebar />
      )}
      {children}
    </>
  );
}
