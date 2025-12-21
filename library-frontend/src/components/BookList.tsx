import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import type { Book } from "../types";

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("");
      setBooks(res.data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const deleteBook = async (id?: number | string) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this book?")) return;
    try {
      await api.delete(`/${id}`);
      setBooks((prev) => prev.filter((b) => b.id !== id));
    } catch (err: any) {
      alert("Delete failed: " + (err.message || err));
    }
  };

  if (loading) return <div>Loading books...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="booklist">
      <h2>Books</h2>
      <table className="books-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Genre</th>
            <th>Copies</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 && (
            <tr>
              <td colSpan={6}>No books found.</td>
            </tr>
          )}
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publicationYear}</td>
              <td>{book.genre}</td>
              <td>{book.copiesAvailable}</td>
              <td>
                <Link to={`/edit/${book.id}`}>
                  <button className="btn-edit">Edit</button>
                </Link>
                <button className="btn-delete" onClick={() => deleteBook(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
