import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div>
        <div className="header-title">Library Manager</div>
        <div className="header-sub">React + Vite Frontend • Friendly UI</div>
      </div>

      <nav className="top-nav">
        <Link to="/" className="nav-btn">Home</Link>
        <Link to="/add" className="nav-btn">Add Book</Link>
      </nav>
    </header>
  );
}
