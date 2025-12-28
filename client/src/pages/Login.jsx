import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', formData);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="w-full bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border-[16px] border-[#12284C] p-8 sm:p-12 relative z-10 shadow-xl">

        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="text-sm font-semibold font-mono tracking-tight text-[#12284C] mb-2 uppercase">
            Welcome Back
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif tracking-wider text-[#12284C] uppercase">
            Login
          </h1>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-semibold text-[#12284C] mb-1">
              EMAIL ADDRESS *
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              className="w-full border-b-2 border-[#12284C] outline-none py-2 bg-transparent transition-colors focus:border-opacity-100 border-opacity-60"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#12284C] mb-1">
              PASSWORD *
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              className="w-full border-b-2 border-[#12284C] outline-none py-2 bg-transparent transition-colors focus:border-opacity-100 border-opacity-60"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white border-2 border-[#12284C] text-[#12284C] py-3 font-semibold tracking-wider hover:bg-[#12284C] hover:text-white transition duration-300 rounded-none text-lg uppercase"
          >
            Log In
          </button>
        </form>

        <p className="mt-8 text-center text-[#12284C] text-sm font-mono">
          New here?{' '}
          <Link to="/signup" className="underline hover:text-opacity-70 font-semibold">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}