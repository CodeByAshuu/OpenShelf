import React from 'react';

export default function StorySection() {
  return (
    <section className="w-full bg-[#12284C] py-12 sm:py-16 md:pb-20 lg:pb-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Large Text Section */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          
            <h2 className="text-white font-serif font-bold leading-snug tracking-wide text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-7xl" 
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            <span className="block">THERE'S NO</span>
            <span className="block">SUCH THING AS TOO</span>
            <span className="block">MANY BOOKS</span>
          </h2>
        </div>
        
        {/* Button Section */}
        <div>
          <button className="bg-[#12284C] border-2 border-white text-white font-light px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 text-lg sm:text-xl md:text-base tracking-wide transition-all duration-300 hover:bg-white hover:text-[#12284C]"
                  style={{ fontFamily: 'Georgia, serif' }}>
            Read our Story
          </button>
        </div>
      </div>
    </section>
  );
} 