
import { Routes, Route } from "react-router-dom";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="app-container">
      <Header />


      <main className="main-content">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/edit/:id" element={<EditBook />} />
        </Routes>
      </main>
    </div>
  );
}
