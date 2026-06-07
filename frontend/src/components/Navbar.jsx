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
    <nav className="bg-emerald-900/95 backdrop-blur-md text-white shadow-xl sticky top-0 z-50 border-b border-emerald-800">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl drop-shadow-md">🌱</div>
            <h1 className="text-3xl font-bold tracking-tighter">
              SurplusShare
            </h1>
          </div>

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

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
