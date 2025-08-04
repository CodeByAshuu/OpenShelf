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
    <section className="w-full py-8 sm:py-10 md:py-12 lg:py-16 bg-white text-[#12284C] relative">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 md:px-8 relative">
        {/* Title Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="text-lg sm:text-xl md:text-2xl tracking-tight font-semibold font-mono">OPEN. Shelf</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-serif mt-2 mb-1 tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>
            BESTSELLERS
          </h2>
        </div>
        {/* Large Navy Background Layer */}
        <div
          className="absolute left-0 top-1/2 sm:top-1/2 z-0 w-full bg-[#12284C] rounded-none sm:rounded-3xl"
          style={{
            height: '100%',
            maxHeight: '320px',
          }}
        ></div>

        {/* Slider Section with Dark Background */}
        <div className="relative z-10 mb-8 sm:mb-10">
          <div className="relative">
            {/* Scrollable Row */}
            <div
              ref={scrollRef}
              className="flex justify-center gap-3 sm:gap-4 md:gap-6 overflow-x-auto py-2 px-1 snap-x snap-mandatory scroll-hidden scrollbar-hide relative"
              style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
            >
              {books.map((book, idx) => (
                <div
                  key={idx}
                  className="relative flex-shrink-0 w-full sm:w-[220px] rounded-xl overflow-visible group snap-center transition-transform duration-300 hover:-translate-y-2"
                  style={{ minWidth: '7rem', maxWidth: '12rem' }}
                >
                  {/* White box behind image */}
                  <div className="bg-white overflow-hidden relative">
                    {/* Best Sale badge for first book */}
                    {idx === 0 && (
                      <span className="absolute top-1 sm:top-2 left-1 sm:left-2 bg-red-600 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full z-20 shadow-lg select-none">
                        Best Sale
                      </span>
                    )}
                    <img
                      src={book.img}
                      alt={book.title}
                      className="w-full h-32 sm:h-36 md:h-40 lg:h-44 xl:h-48 object-cover object-center select-none"
                      draggable="false"
                    />
                  </div>
                  {/* Navy background for text and button */}
                  <div className="w-full rounded-b-xl pb-4 sm:pb-6 pt-2 sm:pt-3 px-2 flex flex-col items-center relative">
                    <div className="text-xs text-white font-semibold font-mono mb-1 uppercase tracking-wide text-center">
                      {book.author}
                    </div>
                    <div
                      className="text-sm sm:text-base md:text-lg font-medium tracking-wide font-serif text-white text-center mb-2"
                    >
                      {book.title}
                    </div>
                    <button
                      className="
                        mt-2 px-3 py-1.5 bg-[#12284C] border border-white text-white 
                        text-xs sm:text-sm font-light font-serif shadow 
                        transition duration-300
                        rounded-none
                        block sm:hidden
                      ">
                      Download
                    </button>

                    <button
                      className="
                        mt-2 px-4 py-2 bg-[#12284C] border border-white text-white 
                        text-sm font-light font-serif shadow 
                        transition-opacity transition-transform duration-300
                        rounded-none
                        hidden sm:block opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2
                      ">
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