import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Import all book images
import b1a from '../assets/b1a.avif';
import b2a from '../assets/b2a.avif';
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

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);

  // Sample book data (same as in Bookstore)
  const books = [
    { id: 1, image: b1a, title: "Art Station", author: "Anthony Young", category: "Design et Art", sku: "BK001", description: "A comprehensive guide to digital art and design principles. This book covers everything from basic concepts to advanced techniques used by professional artists. Perfect for beginners and intermediate artists looking to enhance their skills." },
    { id: 2, image: b2a, title: "Deep Work", author: "Cal Newport", category: "Life Style", sku: "BK002", description: "Learn the art of focused work in a distracted world. This book provides practical strategies for achieving deep, meaningful work that leads to exceptional results." },
    { id: 3, image: b3, title: "Atomic Habits", author: "James Clear", category: "Life Style", sku: "BK003", description: "Transform your life with tiny changes that lead to remarkable results. Learn how to build good habits and break bad ones using proven scientific methods." },
    { id: 4, image: b4, title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", category: "Life Style", sku: "BK004", description: "A counterintuitive approach to living a good life. This book challenges conventional wisdom and offers a refreshing perspective on what truly matters." },
    { id: 5, image: b5, title: "The Psychology of Money", author: "Morgan Housel", category: "Life Style", sku: "BK005", description: "Explore the strange ways people think about money and how understanding psychology can lead to better financial decisions." },
    { id: 6, image: b6, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", category: "Life Style", sku: "BK006", description: "Learn about money, investing, and building wealth from two different perspectives. A classic guide to financial education." },
    { id: 7, image: b7, title: "The 7 Habits of Highly Effective People", author: "Stephen Covey", category: "Life Style", sku: "BK007", description: "Discover the seven habits that can transform your personal and professional life. A timeless guide to effectiveness." },
    { id: 8, image: b8, title: "Think and Grow Rich", author: "Napoleon Hill", category: "Life Style", sku: "BK008", description: "Based on interviews with successful people, this book reveals the principles of success and wealth creation." },
    { id: 9, image: b9, title: "The Power of Now", author: "Eckhart Tolle", category: "Life Style", sku: "BK009", description: "A guide to spiritual enlightenment and living in the present moment. Transform your life by embracing the power of now." },
    { id: 10, image: b10, title: "The Alchemist", author: "Paulo Coelho", category: "Novels", sku: "BK010", description: "A magical story about following your dreams and listening to your heart. A modern classic that inspires readers worldwide." },
    { id: 11, image: b11, title: "1984", author: "George Orwell", category: "Novels", sku: "BK011", description: "A dystopian novel that explores themes of surveillance, totalitarianism, and the manipulation of truth. A powerful warning about the dangers of authoritarianism." },
    { id: 12, image: b12, title: "To Kill a Mockingbird", author: "Harper Lee", category: "Novels", sku: "BK012", description: "A powerful story about racial injustice and the loss of innocence. This classic novel explores themes of morality, justice, and human nature." },
    { id: 13, image: b13, title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Novels", sku: "BK013", description: "A story of the Jazz Age, exploring themes of wealth, love, and the American Dream. A masterpiece of American literature." },
    { id: 14, image: b14, title: "Pride and Prejudice", author: "Jane Austen", category: "Novels", sku: "BK014", description: "A classic romance that explores themes of love, marriage, and social class in 19th century England. A beloved story of wit and romance." },
    { id: 15, image: b15, title: "The Hobbit", author: "J.R.R. Tolkien", category: "Novels", sku: "BK015", description: "An epic fantasy adventure about a hobbit's journey to help reclaim a dwarf kingdom. A beloved classic of fantasy literature." },
    { id: 16, image: b16, title: "The Lord of the Rings", author: "J.R.R. Tolkien", category: "Novels", sku: "BK016", description: "An epic fantasy trilogy about the quest to destroy a powerful ring and save Middle-earth from darkness. A masterpiece of fantasy literature." }
  ];

  const currentBook = books.find(book => book.id === parseInt(id));
  const currentIndex = books.findIndex(book => book.id === parseInt(id));
  
  const prevBook = currentIndex > 0 ? books[currentIndex - 1] : null;
  const nextBook = currentIndex < books.length - 1 ? books[currentIndex + 1] : null;

  const toggleSection = (sectionName) => {
    setActiveSection(activeSection === sectionName ? null : sectionName);
  };

  if (!currentBook) {
    return <div className="text-center pt-20">Book not found</div>;
  }

  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Top Navigation / Breadcrumb */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-sm font-light text-gray-500">
              <Link to="/" className="text-gray-500 hover:text-black transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/bookstore" className="text-gray-500 hover:text-black transition-colors">All Product</Link>
              <span className="mx-2">/</span>
              <span className="text-black">{currentBook.title}</span>
            </div>
            
            {/* Navigation Between Products */}
            <div className="flex space-x-4 text-sm text-gray-500">
              {prevBook && (
                <button 
                  onClick={() => navigate(`/book/${prevBook.id}`)}
                  className="hover:text-black transition-colors"
                >
                  ← Prev
                </button>
              )}
              {nextBook && (
                <button 
                  onClick={() => navigate(`/book/${nextBook.id}`)}
                  className="hover:text-black transition-colors"
                >
                  Next →
                </button>
              )}
            </div>
          </div>

          {/* Main Content Section - Two Column Layout */}
          <div className="flex flex-col lg:flex-row gap-12 mb-16">
            
            {/* Left Column: Product Image */}
            <div className="lg:w-1/2">
              <div className="bg-gray-100 p-8 shadow-sm flex items-center justify-center">
                <img
                  src={currentBook.image}
                  alt={currentBook.title}
                  className="h-96 object-contain"
                />
              </div>
            </div>

            {/* Right Column: Book Info & Actions */}
            <div className="lg:w-1/2 space-y-6">
              <div>
                <h1 className="text-3xl font-light text-black mb-2">{currentBook.title}</h1>
                <p className="text-sm text-gray-500">SKU: {currentBook.sku}</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button className="w-full bg-[#10243f] text-white font-bold py-3 px-6 transition-colors hover:bg-[#0a1a2f]">
                  Download
                </button>
                <button className="w-full bg-yellow-400 text-black font-bold py-3 px-6 transition-colors hover:bg-yellow-500">
                  Read Now
                </button>
              </div>

              {/* Collapsible Sections */}
              <div className="space-y-2">
                {[
                  { name: 'BOOK INFO', content: `Category: ${currentBook.category}\nFormat: Digital PDF\nPages: 250\nLanguage: English\nFile Size: 15.2 MB` },
                  { name: 'AUTHOR INFO', content: `${currentBook.author} is a renowned author and expert in their field. With years of experience and numerous publications, they bring valuable insights and knowledge to readers worldwide.` },
                  { name: 'LICENSE / USAGE RIGHTS', content: `Personal Use License\n- Read on unlimited devices\n- No redistribution\n- No commercial use\n- Valid for lifetime\n- Updates included` }
                ].map((section) => (
                  <div key={section.name} className="border-b border-gray-200">
                    <button
                      onClick={() => toggleSection(section.name)}
                      className="w-full flex items-center justify-between py-3 text-left text-sm font-medium uppercase tracking-wider"
                    >
                      {section.name}
                      <span className="text-lg">
                        {activeSection === section.name ? '-' : '+'}
                      </span>
                    </button>
                    {activeSection === section.name && (
                      <div className="pb-4 text-sm text-gray-600 whitespace-pre-line">
                        {section.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Social Icons */}
              <div className="flex space-x-4 pt-4">
                <button className="text-black hover:text-gray-600 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button className="text-black hover:text-gray-600 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </button>
                <button className="text-black hover:text-gray-600 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </button>
                <button className="text-black hover:text-gray-600 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Product Description Area */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-medium text-black mb-4">Product Description</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              {currentBook.description}
            </p>
            
            {/* Rating Section */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-black mb-3">Rate this book</h3>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} className="text-gray-300 hover:text-yellow-400 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Share Section */}
            <div>
              <h3 className="text-lg font-medium text-black mb-3">Share this book</h3>
              <div className="flex space-x-4">
                <button className="bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700 transition-colors">
                  Share on Facebook
                </button>
                <button className="bg-blue-400 text-white px-4 py-2 text-sm hover:bg-blue-500 transition-colors">
                  Share on Twitter
                </button>
                <button className="bg-green-600 text-white px-4 py-2 text-sm hover:bg-green-700 transition-colors">
                  Share on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
