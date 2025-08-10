import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookCard({ id, image, title, author }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/book/${id}`);
  };

  return (
    <div 
      className="w-60 group overflow-hidden transition-all duration-300 my-24 sm:my-2 mx-auto cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Top Row: Image with grey background */}
      <div className="bg-gray-100 flex items-center justify-center h-70">
        <img
          src={image}
          alt={title}
          className="h-full object-contain"
        />
      </div>

      {/* Bottom Row: Details + Hidden Button */}
      <div className="relative text-center bg-white p-4">
        <h3 className="text-lg text-[#12284C] font-sans font-normal">{title}</h3>
        <p className="text-sm text-gray-600 mt-1 pb-10">{author}</p>
 
        {/* Download Button - Always visible on mobile, hidden on desktop until hover */}
        <button 
          className="absolute font-light tracking-widest bottom-0 left-0 w-full bg-[#12284C] text-white py-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
          onClick={(e) => {
            e.stopPropagation();
            // Handle download logic here
          }}
        >
          Download
        </button>
      </div>
    </div>
  );
}
