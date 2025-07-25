import React, { useRef } from 'react';
import b9 from '../assets/b9.png';
import b10 from '../assets/b10.png';
import b11 from '../assets/b11.png';
import b12 from '../assets/b12.png';
import b13 from '../assets/b13.png';
import b14 from '../assets/b14.png';
import b15 from '../assets/b15.png';
import b16 from '../assets/b16.png';

const books = [
  { img: b9, title: 'Atomic Habits', author: 'James Clear', promo: true },
  { img: b10, title: 'The Alchemist', author: 'Paulo Coelho' },
  { img: b11, title: 'Deep Work', author: 'Cal Newport' },
  { img: b12, title: 'The Power of Now', author: 'Eckhart Tolle' },
  { img: b13, title: 'Sapiens', author: 'Yuval Noah Harari' },
  { img: b14, title: 'Start With Why', author: 'Simon Sinek' },
  { img: b15, title: 'Grit', author: 'Angela Duckworth' },
  { img: b16, title: 'Mindset', author: 'Carol S. Dweck' },
];

export default function RecommendedBooksSlider() {
  const scrollRef = useRef(null);

  return (
    <section className="w-full bg-[#12284C] py-14 px-2">
      <div className="max-w-6xl mx-auto">
        {/* Title Block */}
        <div className="text-center mb-8">
          <div className="w-[30px] h-[1px] bg-white/50 mx-auto my-8" />
          <div className="text-white tracking-wide font-medium text-lg mb-2">This Month's</div>
          <h2 className="text-white text-4xl md:text-4xl font-bold font-serif uppercase tracking-widest mb-8" style={{ fontFamily: 'Georgia, serif' }}>
            Recommended Books
          </h2>
          <div className="w-[30px] h-[1px] bg-white/50 mx-auto my-2" />
        </div>
        {/* Scrollable Book Row */}
        <div
          ref={scrollRef}
          className="flex space-x-8 overflow-x-auto scrollbar-hide px-2 md:px-4 py-4 snap-x snap-mandatory"
          style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
          {books.map((book, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center min-w-[180px] max-w-[200px] md:min-w-[220px] md:max-w-[240px] snap-center"
            >
              {/* Image Card with white bg */}
              <div className="relative w-full">
                {/* Promo badge */}
                {book.promo && (
                  <span className="absolute -top-3 -left-3 bg-red-600 text-white rounded-sm px-2 py-1 text-xs font-semibold z-10 shadow-md select-none">
                    Promotion
                  </span>
                )}
                <div className="bg-white p-4 shadow-md rounded-lg flex items-center justify-center h-48 md:h-56">
                  <img
                    src={book.img}
                    alt={book.title}
                    className="object-contain h-40 md:h-48 w-auto mx-auto select-none"
                    draggable="false"
                  />
                </div>
              </div>
              {/* Book info below, on navy bg */}
              <div className="flex flex-col items-center mt-4">
                <div className="text-white text-base md:text-lg font-bold font-serif text-center mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                  {book.title}
                </div>
                <div className="text-white text-xs md:text-sm font-medium text-center mb-2 opacity-80">
                  {book.author}
                </div>
                <button className="mt-1 px-4 py-2 bg-white/10 border border-white/30 text-white rounded-lg font-serif text-sm font-semibold shadow transition-opacity duration-300 hover:bg-white/20">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Hide scrollbar for all browsers */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
} 