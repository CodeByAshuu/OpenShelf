import React from 'react';

export default function BookCard({ image, title, author }) {
  return (
    <div className="w-60 group overflow-hidden transition-all duration-300 my-12">
      {/* Top Row: Image with grey background */}
      <div className="bg-gray-100 flex items-center justify-center h-80">
        <img
          src={image}
          alt={title}
          className="h-full object-contain"
        />
      </div>

      {/* Bottom Row: Details + Hidden Button */}
      <div className="relative text-center bg-white p-4">
        <h3 className="text-lg text-[#12284C] uppercase font-mono">{title}</h3>
        <p className="text-sm text-gray-600 mt-1 pb-10">{author}</p>
 
        <button className="absolute font-light tracking-widest bottom-0 left-0 w-full bg-[#12284C] text-white py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
          Download
        </button>
      </div>
    </div>
  );
}
