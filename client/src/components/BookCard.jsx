import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuickViewModal from './QuickViewModal';

export default function BookCard({ id, image, title, author, sku }) {
  const navigate = useNavigate();
  const [showQuickView, setShowQuickView] = useState(false);

  const handleCardClick = () => {
    navigate(`/book/${id}`);
  };

  const handleQuickViewClick = (e) => {
    e.stopPropagation();
    setShowQuickView(true);
  };

  const closeQuickView = () => {
    setShowQuickView(false);
  };

  return (
    <>
      <div 
        className="w-60 group overflow-hidden transition-all duration-300 my-24 sm:my-2 mx-auto cursor-pointer relative"
        onClick={handleCardClick}
      >
        {/* Top Row: Image with grey background */}
        <div className="bg-gray-100 flex items-center justify-center h-70 relative">
          <img
            src={image}
            alt={title}
            className="h-full object-contain"
          />
          
          {/* Quick View Link - Appears on hover */}
          <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <button
              onClick={handleQuickViewClick}
              className="w-full py-3 text-black font-light text-sm hover:bg-opacity-100 transition-all duration-200"
            >
              Quick View
            </button>
          </div>
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

      {/* Quick View Modal */}
      {showQuickView && (
        <QuickViewModal
          book={{ id, image, title, author, sku }}
          onClose={closeQuickView}
        />
      )}
    </>
  );
}
