import React from 'react';
import mainBanner from '../assets/main banner.avif';

export default function MainBanner() {
  return (
    <section className="w-full relative bg-white p-0 m-0">
      <img
        src={mainBanner}
        alt="A sofa, a good book, and you."
        className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 min-h-[120px] sm:min-h-[200px] md:min-h-[300px] lg:min-h-[400px] xl:min-h-[500px] max-h-[200px] sm:max-h-[280px] md:max-h-[400px] lg:max-h-[500px] xl:max-h-[600px] object-cover object-center block"
        loading="lazy"
      />
      <div className="absolute top-0 left-0 w-full h-full flex items-start justify-start pointer-events-none">
        <div className="relative z-10 flex flex-col items-start justify-start h-full px-2 sm:px-4 md:px-8 lg:px-16 xl:px-28 max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl pointer-events-auto">
          <h1 className="text-[#1A2B4C] font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold leading-tight tracking-wide m-0 text-left opacity-0 animate-fadeInUp py-2 sm:py-3 md:py-4 lg:py-6 xl:py-8 px-0 sm:px-2 md:px-4 lg:px-6 xl:px-8 rounded-r-2xl sm:rounded-r-3xl md:rounded-r-4xl shadow-none"
              style={{ 
                fontFamily: 'Playfair Display, Georgia, serif',
                animation: 'fadeInUp 1s 0.2s forwards'
              }}>
            <span>A SOFA,</span><br />
            <span>A GOOD</span><br />
            <span>BOOK,</span><br />
            <span>AND YOU.</span>
          </h1>
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