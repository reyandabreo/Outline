import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Menu, X, Plus, LogOut } from "lucide-react";
import { getToken, logout } from "../lib/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = getToken();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout(); // Clear token
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary font-mono">
            Outline
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Link to="/create" className="btn btn-primary">
                  <Plus className="size-5" />
                  <span>New Note</span>
                </Link>
                <button onClick={handleLogout} className="btn btn-outline btn-error">
                  <LogOut className="size-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">Login</Link>
                <Link to="/signup" className="btn btn-primary">Signup</Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden btn btn-ghost"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mt-4 flex flex-col gap-2 md:hidden">
            {isLoggedIn ? (
              <>
                <Link
                  to="/create"
                  className="btn btn-primary w-full"
                  onClick={() => setMenuOpen(false)}
                >
                  <Plus className="size-5" />
                  <span>New Note</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline btn-error w-full"
                >
                  <LogOut className="size-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-outline w-full"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-primary w-full"
                  onClick={() => setMenuOpen(false)}
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
