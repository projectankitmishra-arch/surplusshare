import { Link, useNavigate } from "react-router-dom";
import { PlusCircle, User, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-emerald-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">🌱</div>
            <h1 className="text-3xl font-bold tracking-tight">SurplusShare</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10 text-base font-medium">
            <Link to="/" className="hover:text-emerald-200 transition-colors">
              Home
            </Link>

            {user ? (
              <>
                <Link
                  to="/post"
                  className="flex items-center gap-2 hover:text-emerald-200 transition-colors"
                >
                  <PlusCircle size={22} /> Post Food
                </Link>
                <Link
                  to="/my-listings"
                  className="flex items-center gap-2 hover:text-emerald-200 transition-colors"
                >
                  <User size={22} /> My Listings
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 hover:text-red-400 transition-colors"
                >
                  <LogOut size={22} /> Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="hover:text-emerald-200 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 py-6 border-t border-emerald-700">
            <div className="flex flex-col gap-6 text-lg">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-emerald-200"
              >
                Home
              </Link>

              {user ? (
                <>
                  <Link
                    to="/post"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-emerald-200"
                  >
                    Post Food
                  </Link>
                  <Link
                    to="/my-listings"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-emerald-200"
                  >
                    My Listings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left hover:text-red-400"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-emerald-200"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
