import React from 'react';
import BookCard from '../components/BookCard';
import Footer from '../components/Footer';

import b1 from '../assets/b1.png';
import b2 from '../assets/b2.png';

export default function BookStore() {
  return (
    <div className="w-full bg-white pt-20 px-20">
      {/* Headings */}
      <div className="text-center mb-12 sm:mb-16 md:mb-20 px-4 sm:px-6 md:px-8">
        <div className="text-lg sm:text-xl md:text-2xl font-semibold font-mono tracking-tight text-[#12284C] mb-1">Our</div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif tracking-wider text-[#12284C] uppercase" style={{ fontFamily: 'Georgia, serif' }}>Bookstore</h1>
      </div>

      {/* Main Content Section */}
      <BookCard image={b1} title="Art Station" author="Antmony Young" />
      <BookCard image={b2} title="Deep Work" author="Cal Newport" />
      <Footer />
    </div>
  );
}