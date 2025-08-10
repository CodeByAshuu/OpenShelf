import React, { useState } from 'react';
import BookCard from '../components/BookCard';
import Footer from '../components/Footer';

// Import all book images
import b1 from '../assets/b1.png';
import b2 from '../assets/b2.png';
import b3 from '../assets/b3.png';
import b4 from '../assets/b4.png';
import b5 from '../assets/b5.png';
import b6 from '../assets/b6.png';
import b7 from '../assets/b7.png';
import b8 from '../assets/b8.png';
import b9 from '../assets/b9.png';
import b10 from '../assets/b10.png';
import b11 from '../assets/b11.png';
import b12 from '../assets/b12.png';
import b13 from '../assets/b13.png';
import b14 from '../assets/b14.png';
import b15 from '../assets/b15.png';
import b16 from '../assets/b16.png';

export default function BookStore() {
  const [expandedFilters, setExpandedFilters] = useState({
    collection: true
  });
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Sample book data
  const books = [
    { id: 1, image: b1, title: "Art Station", author: "Anthony Young", category: "Design et Art" },
    { id: 2, image: b2, title: "Deep Work", author: "Cal Newport", category: "Life Style" },
    { id: 3, image: b3, title: "Atomic Habits", author: "James Clear", category: "Life Style" },
    { id: 4, image: b4, title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", category: "Life Style" },
    { id: 5, image: b5, title: "The Psychology of Money", author: "Morgan Housel", category: "Life Style" },
    { id: 6, image: b6, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", category: "Life Style" },
    { id: 7, image: b7, title: "The 7 Habits of Highly Effective People", author: "Stephen Covey", category: "Life Style" },
    { id: 8, image: b8, title: "Think and Grow Rich", author: "Napoleon Hill", category: "Life Style" },
    { id: 9, image: b9, title: "The Power of Now", author: "Eckhart Tolle", category: "Life Style" },
    { id: 10, image: b10, title: "The Alchemist", author: "Paulo Coelho", category: "Novels" },
    { id: 11, image: b11, title: "1984", author: "George Orwell", category: "Novels" },
    { id: 12, image: b12, title: "To Kill a Mockingbird", author: "Harper Lee", category: "Novels" },
    { id: 13, image: b13, title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Novels" },
    { id: 14, image: b14, title: "Pride and Prejudice", author: "Jane Austen", category: "Novels" },
    { id: 15, image: b15, title: "The Hobbit", author: "J.R.R. Tolkien", category: "Novels" },
    { id: 16, image: b16, title: "The Lord of the Rings", author: "J.R.R. Tolkien", category: "Novels" }
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