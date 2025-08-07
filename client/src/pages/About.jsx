import React from 'react';
import a1 from '../assets/a1.png';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="w-full bg-white pt-20">
      {/* Headings */}
      <div className="text-center mb-12 sm:mb-16 md:mb-20 px-4 sm:px-6 md:px-8">
        <div className="text-lg sm:text-xl md:text-2xl font-semibold font-mono tracking-tight text-[#12284C] mb-1">Our</div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif tracking-wider text-[#12284C] uppercase" style={{ fontFamily: 'Georgia, serif' }}>STORY</h1>
      </div>

      {/* Main Content Section */}
      <div className="relative w-full">
        {/* Grey Background Box - Full width, starts halfway down */}
        <div 
          className="absolute left-0 right-0 bg-gray-100 z-10 mx-16"
          style={{ 
            top: '7%',
            height: '90%'
          }}
        ></div>
        
        {/* Image - Shifted to the right, overlaps grey background */}
        <div className="relative z-20 flex justify-center">
          <img 
            src={a1} 
            alt="About Us" 
            className="w-100% sm:w-2/3 md:w-1/2 lg:w-3/5 h-auto object"
          />
        </div>
        
        {/* White Text Box - Overlaps both image and background, positioned to the left */}
        <div className="relative z-30 max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pb-16 sm:pb-20 md:pb-24">
          <div 
            className="bg-white border-16 border-[#12284C] p-6 sm:p-8 md:p-10 lg:p-12 max-w-2xl"
            style={{
              marginTop: '-40%',
              marginLeft: '-20%'
            }}
          >
            <div className="text-[#12284C] space-y-4 sm:space-y-6">
              <p className="text-sm sm:text-base md:text-lg leading-relaxed font-sans">
                In a world full of noise, I wanted to create something meaningful - a quiet place where knowledge is free, and books are within everyone's reach.
              </p>
              
              <p className="text-sm sm:text-base md:text-lg leading-relaxed font-sans">
                I'm a developer and a reader who believes that education and access to learning resources should never be limited by boundaries, budgets, or barriers.
              </p>
              
              <p className="text-sm sm:text-base md:text-lg leading-relaxed font-sans">
                My journey started with a simple idea:
              </p>
              
              <p className="text-sm sm:text-base md:text-lg leading-relaxed font-sans italic font-semibold">
                "What if downloading a book was as easy as discovering it?"
              </p>
              
              <p className="text-sm sm:text-base md:text-lg leading-relaxed font-sans">
                With that vision, I created Open. Shelf - a platform where users can explore and download eBooks effortlessly. Whether you're a student, a hobbyist, or someone just curious to learn, this space is for you.
              </p>
              
              <p className="text-sm sm:text-base md:text-lg leading-relaxed font-sans">
                What started as a personal project has grown into something I hope others find helpful. It's a small contribution, but one that comes from a deep place of curiosity, effort, and care.
              </p>
              
              <p className="text-sm sm:text-base md:text-lg leading-relaxed font-sans">
                Thanks for being a part of our story — one book at a time.
              </p>
              
              {/* Quote */}
              <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t-2 border-[#12284C]">
                <blockquote className="text-sm sm:text-base md:text-lg italic font-serif text-[#12284C] leading-relaxed">
                  "If you have a garden and a library, you have everything you need."
                </blockquote>
                <cite className="block text-sm sm:text-base font-semibold font-serif text-[#12284C] mt-2">
                  — Marcus Tullius Cicero
                </cite>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}