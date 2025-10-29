import type {Book, Status} from "@/types/book"

const BASE = "https://us-central1-summaristt.cloudfunctions.net"

async function api<T>(path: string): Promise<T>{
    const res = await fetch (`${BASE}${path}`);
    if (!res.ok) throw new Error (`API Error: ${res.status}`);
    return res.json() as Promise<T>;
}

export function getBooks(status: "selected"): Promise<Book>;
export function getBooks(status: "recommended" | "suggested"): Promise<Book[]>;
export function getBooks(status: Status){
    return api<Book | Book[]>(`/getBooks?status=${status}`)
}

export function getBookById(id: string): Promise<Book> {
    return api<Book>(`/getBook?id=${id}`)
}