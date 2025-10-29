import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getBookById } from "@/lib/book";
import { Book } from "@/types/book";

export default function BookDetails() {
 const router = useRouter()
 const { id } = router.query as {id?: string}

 const [book, setBook] = useState<Book | null>(null)
 const [loading, setLoading] = useState(true)

 return (
    <h1>Book details page</h1>
 )
}
