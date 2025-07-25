import React, { useRef } from 'react';

import b1 from '../assets/b1.png';
import b2 from '../assets/b2.png';
import b3 from '../assets/b3.png';
import b4 from '../assets/b4.png';
import b5 from '../assets/b5.png';
import b6 from '../assets/b6.png';
import b7 from '../assets/b7.png';
import b8 from '../assets/b8.png';

const books = [
  { img: b1, title: 'The Silent Patient', author: 'Alex Michaelides' },
  { img: b2, title: 'Where the Crawdads Sing', author: 'Delia Owens' },
  { img: b3, title: 'Educated', author: 'Tara Westover' },
  { img: b4, title: 'Becoming', author: 'Michelle Obama' },
  { img: b5, title: 'The Testaments', author: 'Margaret Atwood' },
  { img: b6, title: 'Normal People', author: 'Sally Rooney' },
  { img: b7, title: 'The Goldfinch', author: 'Donna Tartt' },
  { img: b8, title: 'The Night Circus', author: 'Erin Morgenstern' },
];

export default function BestSellerSlider() {
  const scrollRef = useRef(null);

  return (
    <section className="w-full py-12 bg-white text-[#12284C] relative">
      <div className="max-w-5xl mx-auto px-4 relative">
        {/* Title Section */}
        <div className="text-center mb-20">
          <div className="text-2xl tracking-tight font-semibold font-mono">OPEN. Shelf</div>
          <h2 className="text-4xl md:text-5xl font-bold font-serif mt-2 mb-1 tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>
            BESTSELLERS
          </h2>
        </div>
        {/* Large Navy Background Layer */}
        <div
          className="hidden md:block absolute left-1/2 -translate-x-1/2 top-1/2 z-0 rounded-3xl bg-[#12284C]"
          style={{ width: '`100%', height: '320px', minWidth: '1400px' }}
        ></div>
        {/* Slider Section with Dark Background */}
        <div className="relative z-10 mb-10">
          <div className="relative">
            {/* Scrollable Row */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto py-2 px-1 snap-x snap-mandatory scroll-hidden scrollbar-hide relative"
              style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
            >
              {books.map((book, idx) => (
                <div
                  key={idx}
                  className="relative flex-shrink-0 w-36 md:w-40 lg:w-44 xl:w-48 2xl:w-52 rounded-xl overflow-visible group snap-center transition-transform duration-300 hover:-translate-y-2"
                  style={{ minWidth: '5rem', maxWidth: '9rem' }}
                >
                  {/* White box behind image */}
                  <div className="bg-white rounded-xl overflow-hidden relative">
                    {/* Best Sale badge for first book */}
                    {idx === 0 && (
                      <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full z-20 shadow-lg select-none">
                        Best Sale
                      </span>
                    )}
                    <img
                      src={book.img}
                      alt={book.title}
                      className="w-full h-40 object-cover object-center select-none"
                      draggable="false"
                    />
                  </div>
                  {/* Navy background for text and button */}
                  <div className="bg-[#12284C] w-full rounded-b-xl pb-6 pt-3 px-2 flex flex-col items-center relative">
                    <div className="text-xs text-white font-semibold font-mono mb-1 uppercase tracking-wide text-center">
                      {book.author}
                    </div>
                    <div
                      className="text-lg font-medium tracking-wide font-serif text-white text-center mb-2"
                    >
                      {book.title}
                    </div>
                    <button className="mt-2 px-4 py-2 bg-[#12284C] border border-white text-white rounded-lg font-serif text-sm font-semibold shadow transition-opacity transition-transform duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
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