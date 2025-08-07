import React, { useState } from 'react';
import Footer from '../components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = '! Enter a first name';
    if (!formData.lastName.trim()) newErrors.lastName = '! Enter a last name';
    if (!formData.email.trim()) newErrors.email = '! Enter an email';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Submit logic here
      alert('Form submitted');
    }
  };

  return (
    <div className="w-full min-h-screen bg-white text-black space-y-20">
    <div className="w-full bg-white pt-20 px-4 sm:px-6 md:px-8">
      {/* Headings */}
      <div className="text-center mb-12 sm:mb-16 md:mb-20">
        <div className="text-lg sm:text-xl md:text-2xl font-semibold font-mono tracking-tight text-[#12284C] mb-1">
          For More Info
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif tracking-wider text-[#12284C] uppercase">
          CONTACT US
        </h1>
      </div>

      {/* Grey Background Box - Full width, starts halfway down */}
        <div 
          className="absolute left-0 right-0 bg-gray-100 z-10 mx-16"
          style={{ 
            top: '60%',
            height: '115%'
          }}
        ></div>

      {/* Content Box */}
      <div className="max-w-5xl mx-auto bg-white border-[16px] border-[#12284C] p-6 sm:p-8 md:p-20 z-30 relative">
        {/* Store Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-12">
          {[1, 2].map((store) => (
            <div key={store} className="text-[#12284C] space-y-4">
              <h2 className="text-xl font-medium tracking-wider">Store 0{store}</h2>
              <p>Address<br />500 Terry Francine St.<br/> SF, CA 94158</p>
              <p>Tel<br />123-456-7890</p>
              <p>Email<br />info@my-domain.com</p>
            </div>
          ))}
          <div className="text-[#12284C] space-y-4">
            <h2 className="text-xl font-medium tracking-wider">Customer Service</h2>
              <p>Tel<br />1-800-000-0000</p>
              <p>Email<br />info@my-domain.com</p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-[#12284C]">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border-b-2 border-[#12284C] outline-none py-3"
              />
              {errors.firstName && (
                <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#12284C]">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border-b-2 border-[#12284C] outline-none py-3"
              />
              {errors.lastName && (
                <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#12284C]">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-b-2 border-[#12284C] outline-none py-3"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#12284C]">Type your message here...</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full border-b-2 border-[#12284C] outline-none resize-none overflow-auto py-3"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-white border-2 border-[#12284C] text-[#12284C] px-6 py-2 font-semibold tracking-wider hover:bg-[#12284C] hover:text-white transition duration-300 rounded-none shadow-sm"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      </div>
      <Footer />
    </div>
  );
}
