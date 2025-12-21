import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import type { Book } from "../types";

export default function EditBook() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/${id}`);
        setBook(res.data);
      } catch (err: any) {
        alert("Failed to fetch book: " + (err.message || err));
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <div>Loading book...</div>;
  if (!book) return <div>Book not found.</div>;

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBook((prev) => (prev ? { ...prev, [name]: name === "publicationYear" || name === "copiesAvailable" ? Number(value) : value } : prev));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/${id}`, book);
      navigate("/");
    } catch (err: any) {
      alert("Update failed: " + (err.message || err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="form-card">
      <h2>Edit Book</h2>
      <form onSubmit={onSubmit}>
        <label>
          Title
          <input name="title" value={book.title} onChange={onChange} required />
        </label>

        <label>
          Author
          <input name="author" value={book.author} onChange={onChange} required />
        </label>

        <label>
          Publication Year
          <input
            name="publicationYear"
            type="number"
            value={book.publicationYear}
            onChange={onChange}
            min={1000}
            max={new Date().getFullYear()}
            required
          />
        </label>

        <label>
          Genre
          <input name="genre" value={book.genre} onChange={onChange} />
        </label>

        <label>
          Copies Available
          <input
            name="copiesAvailable"
            type="number"
            value={book.copiesAvailable}
            onChange={onChange}
            min={0}
            required
          />
        </label>

        <div className="form-actions">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? "Saving..." : "Update Book"}
          </button>
          <button type="button" onClick={() => navigate("/")} className="btn-cancel">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
