import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

const NAVY = "#00204d";

const navLinks = [
  { name: "Bookstore", to: "/bookstore" },
  { name: "Events", to: "/events" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    setMenuOpen(false);
  };

  function handleScrollToEvents(e) {
    e.preventDefault();

    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const section = document.getElementById('events');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If already on home page, just scroll
      const section = document.getElementById('events');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  return (
    <nav className="w-full bg-white fixed top-0 left-0 z-50">
      <div className="w-full flex items-center justify-between h-16 sm:h-18 md:h-20 px-4 sm:px-8 lg:px-16 xl:px-20">
        {/* Logo */}
        <Link to="/" className="flex items-center select-none">
          <div
            className="pl-3 py-2 font-bold text-white text-base md:text-lg tracking-widest font-sans"
            style={{ background: '#12284C', letterSpacing: '0.2em' }}
          >
            OPEN.
          </div>
          <div
            className="px-3 py-2 border-4 text-base text-[#12284C] md:text-xl tracking-widest uppercase leading-none hover:bg-[#12284C] hover:text-white transition-colors duration-300"
            style={{ borderColor: '#12284C', fontFamily: 'Georgia', fontWeight: 500, letterSpacing: '0.5em' }}
          >
            Shelf
          </div>
        </Link>


        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-10 ml-auto">
          {navLinks.map((link) =>
            link.name === "Events" ? (
              <a
                key={link.name}
                href="#events"
                onClick={handleScrollToEvents}
                className="text-base lg:text-lg font-mono tracking-tight hover:text-blue-900 transition text-[color:#12284C]"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.to}
                className="text-base lg:text-lg font-mono tracking-tight hover:text-blue-900 transition text-[color:#12284C]"
              >
                {link.name}
              </Link>
            )
          )}

          {user ? (
            <div className="flex items-center space-x-6">
              <Link
                to="/profile"
                className="flex items-center space-x-1 sm:space-x-2 text-base lg:text-lg font-mono tracking-tight hover:text-blue-900 transition text-[color:#12284C]"
              >
                <FaUser className="text-lg sm:text-xl" />
                <span className="font-light">{user.name.split(' ')[0]}</span>
              </Link>
              {/* <button
                onClick={handleLogout}
                className="text-base lg:text-lg font-mono tracking-tight text-red-600 hover:text-red-800 transition uppercase font-bold"
              >
                Logout
              </button> */}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center space-x-1 sm:space-x-2 text-base lg:text-lg font-mono tracking-tight hover:text-blue-900 transition text-[color:#12284C]"
            >
              <FaUser className="text-lg sm:text-xl" />
              <span>Log In</span>
            </Link>
          )}
        </div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden flex items-start text-xl sm:text-2xl text-[color:#12284C] focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu - Full Screen */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-16 sm:top-18 md:top-20 bg-white z-40 animate-fade-in">
          <div className="flex flex-col items-start justify-start h-full py-12 sm:py-0 md:py-2 space-y-0">
            {navLinks.map((link) =>
              link.name === "Events" ? (
                <a
                  key={link.name}
                  href="#events"
                  onClick={(e) => {
                    handleScrollToEvents(e);
                    setMenuOpen(false);
                  }}
                  className="text-2xl sm:text-3xl font-mono font-bold tracking-tighter text-[color:#12284C] hover:text-blue-900 transition py-4 px-8"

                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.to}
                  className="text-2xl sm:text-3xl font-mono font-bold tracking-tighter text-[color:#12284C] hover:text-blue-900 transition py-4 px-8"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )
            )}

            {user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 text-2xl sm:text-3xl font-mono font-bold tracking-tighter text-[color:#12284C] hover:text-blue-900 transition py-4 px-8"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaUser className="text-xl sm:text-2xl" />
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-2xl sm:text-3xl font-mono font-bold tracking-tighter text--600 hover:text-[#12284C]] transition py-4 px-8 text-left w-full"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-3 text-2xl sm:text-3xl font-mono font-bold tracking-tighter text-[color:#12284C] hover:text-blue-900 transition py-4 px-8"
                onClick={() => setMenuOpen(false)}
              >
                <FaUser className="text-xl sm:text-2xl" />
                <span>Log In</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}


