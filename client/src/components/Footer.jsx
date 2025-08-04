import React from "react";

const NAVY = "#12284C";
const GREY = "#b0b3b8";

export default function Footer() {
  // Scroll to top handler
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="w-full pt-12 pb-6 px-4 sm:px-8 md:px-16 lg:px-24 bg-[#12284C] text-white"
      style={{ background: NAVY }}
    >
      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
        {/* Column 1 */}
        <div>
          <h2 className="text-xl font-normal mb-6 tracking-wider">Open Shelf</h2>
          <div className="space-y-2 text-sm font-light">
            <div>500 Terry Francine St.</div>
            <div>San Francisco, CA 94158</div>
            <div>123-456-7890</div>
            <div>info@my-domain.com</div>
          </div>
        </div>
        {/* Column 2 */}
        <div>
          <h2 className="text-xl font-normal mb-6 tracking-wider">Shop</h2>
          <ul className="space-y-2 text-sm font-light">
            <li>FAQ</li>
            <li>Shipping & Returns</li>
            <li>Store Policy</li>
            <li>Payment Methods</li>
          </ul>
        </div>
        {/* Column 3 */}
        <div>
          <h2 className="text-xl font-normal mb-6 tracking-wider">Socials</h2>
          <ul className="space-y-2 text-sm font-light">
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
            <li>Pinterest</li>
          </ul>
        </div>
        {/* Column 4 */}
        <div>
          <h2 className="text-xl font-normal mb-6 tracking-wider">Be the First to Know</h2>
          <div className="mb-2 text-sm font-light">Sign up for our newsletter</div>
          <label htmlFor="newsletter-email" className="sr-only">
            Enter your email here*
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="Enter your email here*"
            className="w-full bg-[#12284C] border border-white text-white placeholder-white px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <div className="flex items-center mb-3">
            <input
              id="newsletter-checkbox"
              type="checkbox"
              className="accent-white mr-2"
            />
            <label htmlFor="newsletter-checkbox" className="text-xs font-light">
              Yes, subscribe me to your newsletter.*
            </label>
          </div>
          <button
            className="w-full bg-white text-[#12284C] font-normal px-6 py-2 transition hover:bg-gray-200"
            type="button"
          >
            Subscribe
          </button>
          {/* Scroll to top arrow */}
          <div className="mt-8 flex items-center">
            <button
              aria-label="Scroll to top"
              onClick={handleScrollTop}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white hover:bg-white/20 transition ml-0"
              style={{ marginTop: "1.5rem" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-10 border-t border-white/20 pt-4">
        <div
          className="text-xs sm:text-sm"
          style={{
            color: GREY,
            textAlign: "left",
            marginLeft: 0,
          }}
        >
          © 2025 by OPEN Shelf., Powered and secured by{" "}
          <a
            href="https://github.com/CodeByAshuu"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            style={{ color: GREY, textDecorationColor: GREY }}
          >
            CodeByAshuu
          </a>
        </div>
      </div>
    </footer>
  );
}