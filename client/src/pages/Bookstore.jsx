import React, { useState } from 'react';
import BookCard from '../components/BookCard';
import Footer from '../components/Footer';

// Import all book images
import b1a from '../assets/b1a.avif';
import b2a from '../assets/b2a.avif';
import b3a from '../assets/b3a.avif';
import b4a from '../assets/b4a.avif';
import b5a from '../assets/b5a.avif';
import b6a from '../assets/b6a.avif';
import b7a from '../assets/b7a.avif';
import b8a from '../assets/b8a.avif';
import b9a from '../assets/b9a.avif';
import b10a from '../assets/b10a.avif';
import b11a from '../assets/b11a.avif';
import b12a from '../assets/b12a.avif';
import b13a from '../assets/b13a.avif';
import b14a from '../assets/b14a.avif';
import b15a from '../assets/b15a.avif';
import b16a from '../assets/b16a.avif';

export default function BookStore() {
  const [expandedFilters, setExpandedFilters] = useState({
    collection: true
  });
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Sample book data
  const books = [
    { id: 1, image: b1a, title: "Art Station", author: "Anthony Young", category: "Design et Art", sku: "BK001" },
    { id: 2, image: b2a, title: "Deep Work", author: "Cal Newport", category: "Life Style", sku: "BK002" },
    { id: 3, image: b3a, title: "Atomic Habits", author: "James Clear", category: "Life Style", sku: "BK003" },
    { id: 4, image: b4a, title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", category: "Life Style", sku: "BK004" },
    { id: 5, image: b5a, title: "The Psychology of Money", author: "Morgan Housel", category: "Life Style", sku: "BK005" },
    { id: 6, image: b6a, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", category: "Life Style", sku: "BK006" },
    { id: 7, image: b7a, title: "The 7 Habits of Highly Effective People", author: "Stephen Covey", category: "Life Style", sku: "BK007" },
    { id: 8, image: b8a, title: "Think and Grow Rich", author: "Napoleon Hill", category: "Life Style", sku: "BK008" },
    { id: 9, image: b9a, title: "The Power of Now", author: "Eckhart Tolle", category: "Life Style", sku: "BK009" },
    { id: 10, image: b10a, title: "The Alchemist", author: "Paulo Coelho", category: "Novels", sku: "BK010" },
    { id: 11, image: b11a, title: "1984", author: "George Orwell", category: "Novels", sku: "BK011" },
    { id: 12, image: b12a, title: "To Kill a Mockingbird", author: "Harper Lee", category: "Novels", sku: "BK012" },
    { id: 13, image: b13a, title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Novels", sku: "BK013" },
    { id: 14, image: b14a, title: "Pride and Prejudice", author: "Jane Austen", category: "Novels", sku: "BK014" },
    { id: 15, image: b15a, title: "The Hobbit", author: "J.R.R. Tolkien", category: "Novels", sku: "BK015" },
    { id: 16, image: b16a, title: "The Lord of the Rings", author: "J.R.R. Tolkien", category: "Novels", sku: "BK016" }
  ];

  const categories = [
    "Novels",
    "Design et Art", 
    "Life Style",
    "Our books of the month",
    "Bestsellers",
    "Travel guides"
  ];

  const toggleFilter = (filterName) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredBooks = selectedCategories.length > 0 
    ? books.filter(book => selectedCategories.includes(book.category))
    : books;

  return (
    <div className="w-full bg-white pt-20 min-h-screen">
      {/* Header Section */}
      <div className="text-center mb-12 sm:mb-16 md:mb-10">
        <div className="text-lg sm:text-xl md:text-2xl font-semibold font-mono tracking-tight text-[#12284C] mb-1">
          Our
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif tracking-wider text-[#12284C] uppercase">
          Bookstore
        </h1>
      </div>

      {/* Main Content Section */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar - Filters */}
          <div className="lg:w-1/5">
            <div className="bg-white p-6">
              <h2 className="text-2xl font-semibold text-[#12284C] mb-6">Filter by</h2>
              <hr className="text-gray-300 h-6" />
              
              {/* Collection Filter */}
              <div className="mb-6">
                <button 
                  onClick={() => toggleFilter('collection')}
                  className="flex items-center justify-between w-full text-left text-lg font-medium text-[#12284C] mb-4"
                >
                  Collection
                  <span className="text-3xl font-light">
                    {expandedFilters.collection ? '-' : '+'}
                  </span>
                </button>
                
                {expandedFilters.collection && (
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="w-4 h-4 text-[#12284C] border-gray-300 rounded focus:ring-[#12284C]"
                        />
                        <span className="text-[#7C94AD]">{category}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>


          {/* Main Content - Products Grid */}
          <div className="lg:w-3/4 mb-12">
            <h2 className="text-2xl font-semibold text-[#12284C] p-4">All Products</h2>
            
            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-4 gap-8 p-4">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  id={book.id}
                  image={book.image}
                  title={book.title}
                  author={book.author}
                  sku={book.sku}
                />
              ))}
            </div>


            {/* Mobile Grid - Single column */}
            <div className="md:hidden space-y-6">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  id={book.id}
                  image={book.image}
                  title={book.title}
                  author={book.author}
                  sku={book.sku}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}