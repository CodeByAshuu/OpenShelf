import React from 'react';
import mainBanner from '../assets/main banner.avif';

export default function MainBanner() {
  return (
    <section className="w-full relative bg-white p-0 m-0">
      {/* Mobile: 4:3 aspect ratio container, Desktop: normal height */}
      <div className="relative w-full aspect-[4/3] sm:aspect-auto sm:min-h-[400px] sm:max-h-[600px]">
        <img
          src={mainBanner}
          alt="A sofa, a good book, and you."
          className="relative inset-0 w-full h-full object-cover object-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 "
          loading="lazy"
        />
        
        {/* Overlay for text - centered on mobile, left-aligned on desktop */}
        <div className="absolute inset-0 flex items-center justify-start pointer-events-none">
          <div className="relative z-10 flex flex-col items-start justify-center h-full px-5 sm:px-8 md:px-16 lg:px-28 max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl pointer-events-auto">
            <h1 className="text-[#1A2B4C] font-serif text-4xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl 2xl:text-[84px] font-extrabold leading-tight tracking-wide m-0 sm:text-left opacity-0 animate-fadeInUp py-4 sm:py-6 md:py-8 lg:py-10 px-4 sm:px-6 md:px-8 lg:px-10 rounded-2xl sm:rounded-r-3xl md:rounded-r-4xl shadow-none text-left"
                style={{ 
                  fontFamily: 'Playfair Display, Georgia, serif',
                  animation: 'fadeInUp 1s 0.2s forwards'
                }}>
              <span>A SOFA,</span><br />
              <span>A GOOD</span><br />
              <span>BOOK,</span><br />
              <span className="whitespace-nowrap">AND YOU.</span>
            </h1>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
} 