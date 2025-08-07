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
            className="px-3 py-2 font-bold text-white text-base md:text-lg tracking-widest"
            style={{ background: NAVY, fontFamily: 'Georgia, serif', letterSpacing: '0.1em' }}
          >
            OPEN.
          </div>
          <div
            className="px-3 py-2 border-4 text-base md:text-xl font-serif tracking-widest uppercase leading-none"
            style={{ borderColor: NAVY, color: NAVY, fontFamily: 'Georgia, serif', fontWeight: 500 , letterSpacing: '0.3em'}}
          >
            Shelf
          </div>
        </Link>


        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8 ml-auto">
          {navLinks.map((link) =>
            link.name === "Events" ? (
              <a
                key={link.name}
                href="#events"
                onClick={handleScrollToEvents}
                className="text-sm lg:text-base font-serif uppercase tracking-wider hover:text-blue-900 transition text-[color:#00204d]"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.to}
                className="text-sm lg:text-base font-serif uppercase tracking-wider hover:text-blue-900 transition text-[color:#00204d]"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {link.name}
              </Link>
            )
          )}
          <Link
            to="/login"
            className="flex items-center space-x-1 sm:space-x-2 text-sm lg:text-base font-serif uppercase tracking-wider hover:text-blue-900 transition text-[color:#00204d]"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            <FaUser className="text-lg sm:text-xl" />
            <span>Log In</span>
          </Link>
          {/* <Link
            to="/cart"
            className="ml-2 hover:text-blue-900 transition text-[color:#00204d]"
          >
            <FaShoppingCart className="text-lg sm:text-xl" />
          </Link> */}
        </div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden flex items-center text-xl sm:text-2xl text-[color:#00204d] focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg fixed top-16 sm:top-18 md:top-20 left-0 w-full z-40 animate-fade-in">
          <div className="flex flex-col items-center py-4 sm:py-6 space-y-3 sm:space-y-4">
            {navLinks.map((link) =>
              link.name === "Events" ? (
                <a
                  key={link.name}
                  href="#events"
                  onClick={(e) => {
                    handleScrollToEvents(e);
                    setMenuOpen(false);
                  }}
                  className="text-sm sm:text-base font-serif uppercase tracking-wider text-[color:#00204d] hover:text-blue-900 transition"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.to}
                  className="text-sm sm:text-base font-serif uppercase tracking-wider text-[color:#00204d] hover:text-blue-900 transition"
                  style={{ fontFamily: 'Georgia, serif' }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )
            )}
            <Link
              to="/login"
              className="flex items-center space-x-2 text-sm sm:text-base font-serif uppercase tracking-wider text-[color:#00204d] hover:text-blue-900 transition"
              style={{ fontFamily: 'Georgia, serif' }}
              onClick={() => setMenuOpen(false)}
            >
              <FaUser className="text-lg sm:text-xl" />
              <span>Log In</span>
            </Link>
            <Link
              to="/cart"
              className="hover:text-blue-900 transition text-[color:#00204d]"
              onClick={() => setMenuOpen(false)}
            >
              <FaShoppingCart className="text-lg sm:text-xl" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}


