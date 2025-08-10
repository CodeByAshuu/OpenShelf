import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function QuickViewModal({ book, onClose }) {
  const navigate = useNavigate();

  const handleViewMoreDetails = () => {
    onClose();
    navigate(`/book/${book.id}`);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0  bg-[#555555BF] bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col lg:flex-row">
          
          {/* Left Column: Book Image */}
          <div className="lg:w-1/2 p-8">
            <div className="bg-gray-100 flex items-center justify-center min-h-[400px]">
              <img
                src={book.image}
                alt={book.title}
                className="h-80 object-contain"
              />
            </div>
          </div>

          {/* Right Column: Book Details */}
          <div className="lg:w-1/2 p-8 relative">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors text-2xl font-light"
            >
              ×
            </button>

            {/* Book Title and SKU */}
            <div className="mb-6">
              <h1 className="text-3xl font-normal text-[#414141] mb-2">{book.title}</h1>
              <p className="text-xs text-gray-400">SKU: {book.sku}</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 mb-6">
              <button className="w-full bg-[#10243f] text-white font-light tracking-tight py-3 px-6 transition-colors hover:bg-[#0a1a2f]">
                Download
              </button>
              <button className="w-full bg-yellow-400 text-black font-normal tracking-tight py-3 px-6 transition-colors hover:bg-yellow-500">
                Read Now
              </button>
            </div>

            {/* View More Details Link */}
            <div className="text-left">
              <button
                onClick={handleViewMoreDetails}
                className="text-black font-light underline hover:text-gray-600 transition-colors"
              >
                View More Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
