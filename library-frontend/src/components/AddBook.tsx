import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import type { Book } from "../types";

export default function AddBook() {
  const navigate = useNavigate();
  const [book, setBook] = useState<Book>({
    title: "",
    author: "",
    publicationYear: new Date().getFullYear(),
    genre: "",
    copiesAvailable: 1,
  });
  const [saving, setSaving] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]:
        name === "publicationYear" || name === "copiesAvailable"
          ? Number(value)
          : value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("", book);
      navigate("/");
    } catch (err: any) {
      alert("Failed to add book: " + (err.message || err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="form-card">
      <h2>Add Book</h2>
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
            {saving ? "Saving..." : "Add Book"}
          </button>
          <button type="button" onClick={() => navigate("/")} className="btn-cancel">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
