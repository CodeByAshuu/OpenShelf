import React from 'react';
import b17 from '../assets/b17.png';

export default function Events() {
  return (
    <section id="book-launch" className="w-full bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Headings */}
        <div className="mb-8 text-center">
          <div className="text-lg sm:text-xl md:text-2xl font-semibold font-mono tracking-tight text-[#12284C] mb-1">Coming Up</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif tracking-wider text-[#12284C] uppercase" style={{ fontFamily: 'Georgia, serif' }}>BOOK LAUNCH</h2>
        </div>
        {/* Two Columns */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-between">
          {/* Left: Book Details */}
          <div className="flex-1 w-full max-w-md">
            <div className="text-[#12284C]">
              <div className="text-base sm:text-lg font-mono mb-1">Introducing</div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif mb-2" style={{ fontFamily: 'Georgia, serif' }}>The Future of Reading</div>
              <div className="text-base sm:text-lg font-mono mt-4 mb-1">By</div>
              <div className="text-lg sm:text-xl font-semibold font-serif mb-4">Jane Doe</div>
              <div className="text-base sm:text-lg font-mono mt-2 mb-1">When</div>
              <hr className="border-t-2 border-[#12284C] w-16 my-1" />
              <div className="text-md sm:text-lg font-serif mb-4">Jul 12, 2035, 7:00 PM</div>
              <div className="text-base sm:text-lg font-mono mt-2 mb-1">Where</div>
              <hr className="border-t-2 border-[#12284C] w-24 my-1" />
              <div className="text-md sm:text-lg font-serif mb-6">500 Terry Francois Street, San Francisco, CA, USA</div>
              <button className="bg-white border-2 border-[#12284C] text-[#12284C] font-semibold px-8 py-2 text-base tracking-wide transition-all duration-300 hover:bg-[#12284C] hover:text-white rounded-none shadow-sm">RSVP NOW</button>
            </div>
          </div>
          {/* Right: Book Image */}
          <div className="flex-1 w-full flex justify-center items-center">
            <div className="bg-[#12284C] p-6 sm:p-8 rounded-2xl flex items-center justify-center">
              <img src={b17} alt="Book Cover" className="w-40 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-auto object-contain shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}