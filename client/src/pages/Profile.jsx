import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaCamera, FaEnvelope, FaCalendarAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import Footer from '../components/Footer'
const NAVY = "#12284C";

export default function Profile() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const { data } = await axios.get('http://localhost:5000/api/users/profile', config);
                setUser(data);
                setFormData({
                    name: data.name,
                    bio: data.bio || '',
                });
                setPreviewUrl(data.profileImage ? `http://localhost:5000${data.profileImage}` : '');
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch profile');
                setLoading(false);
                if (err.response?.status === 401) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    navigate('/login');
                }
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        };

        const submitData = new FormData();
        submitData.append('name', formData.name);
        submitData.append('bio', formData.bio);
        if (selectedFile) {
            submitData.append('profileImage', selectedFile);
        }

        try {
            const { data } = await axios.put('http://localhost:5000/api/users/profile', submitData, config);
            setUser(data);
            setMessage('Profile updated successfully');
            setEditMode(false);
            // Update local storage user data if needed
            const localUser = JSON.parse(localStorage.getItem('user'));
            localStorage.setItem('user', JSON.stringify({ ...localUser, name: data.name }));
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile');
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#12284C]"></div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Top Section - Navy Background */}
            <div className="bg-[#12284C] h-80 flex items-center px-8 md:px-20">
                <div className="flex items-center space-x-8 max-w-6xl w-full mx-auto">
                    {/* Profile Image */}
                    <div className="relative group flex-shrink-0">
                        {previewUrl ? (
                            <img
                                src={previewUrl}
                                alt="Profile"
                                className="w-40 h-40 rounded-full object-cover border-4 border-white/20"
                            />
                        ) : (
                            <div className="w-40 h-40 rounded-full bg-blue-100 flex items-center justify-center text-[#12284C] border-4 border-white/20">
                                <FaUser size={80} />
                            </div>
                        )}
                        {editMode && (
                            <button
                                onClick={() => fileInputRef.current.click()}
                                className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white"
                            >
                                <FaCamera size={28} />
                            </button>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/*"
                        />
                    </div>

                    {/* Name and Email */}
                    <div className="text-white">
                        {editMode ? (
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="text-5xl font-bold bg-transparent border-b-2 border-white/30 focus:border-white outline-none w-full py-1"
                                placeholder="Your Name"
                            />
                        ) : (
                            <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight">
                                {user.name}
                            </h1>
                        )}
                        <p className="text-xl md:text-2xl mt-3 text-blue-100/80 font-mono tracking-tight">
                            {user.email}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-6xl mx-auto px-8 md:px-20 py-10">
                {/* Tabs */}
                <div className="flex space-x-12 border-b border-gray-100 mb-10">
                    <button className="pb-4 text-lg font-bold text-[#12284C] border-b-4 border-[#12284C] tracking-wide">
                        PROFILE
                    </button>
                    {/* Placeholder for future tabs */}
                    <button className="pb-4 text-lg font-medium text-gray-400 hover:text-gray-600 transition-colors tracking-wide">
                        SETTINGS
                    </button>
                </div>

                {/* Profile Section Content */}
                <div className="animate-fade-in">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-2">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#12284C]">
                            Profile
                        </h2>
                    </div>

                    <div className="flex flex-row md:items-center justify-between gap-4 mt-4">
                        <div className="flex items-center text-gray-500 font-light tracking-tight">
                            {/* <FaCalendarAlt className="mr-3 text-[#12284C]" /> */}
                            <span className="md:text-lg text-md">Joined on: {formatDate(user.createdAt)}</span>
                        </div>

                        {!editMode ? (
                            <button
                                onClick={() => setEditMode(true)}
                                className="inline-flex items-center justify-center space-x-2 px-8 py-3 text-[#12284C] rounded-none transition-all duration-300 font-normal tracking-wider uppercase text-md"
                            >
                                <FaEdit />
                                <span>Edit Profile</span>
                            </button>
                        ) : (
                            <div className="flex space-x-4">
                                <button
                                    onClick={handleSubmit}
                                    className="inline-flex items-center justify-center space-x-2 px-2 py-2 md:px-8 md:py-3 bg-yellow-300 text-[#12284C] rounded-none hover:bg-yellow-400 transition-all duration-300 font-normal tracking-wider uppercase text-sm md:text-md"
                                >
                                    <FaSave />
                                    <span>Save Changes</span>
                                </button>
                                <button
                                    onClick={() => {
                                        setEditMode(false);
                                        setFormData({ name: user.name, bio: user.bio || '' });
                                        setPreviewUrl(user.profileImage ? `http://localhost:5000${user.profileImage}` : '');
                                        setSelectedFile(null);
                                    }}
                                    className="inline-flex items-center justify-center space-x-2 px-2 py-2 md:px-8 md:py-3 bg-gray-100 text-gray-600 rounded-none hover:bg-gray-200 transition-all duration-300 font-normal tracking-wider uppercase  text-sm md:text-md"
                                >
                                    <FaTimes />
                                    <span>Cancel</span>
                                </button>
                            </div>
                        )}
                    </div>

                    <hr className="border-gray-200 my-8 w-full" />

                    {/* About Section */}
                    <div className="space-y-6 mb-12">
                        <h3 className="text-2xl font-bold text-[#12284C] tracking-tight">About</h3>
                        {editMode ? (
                            <div className="relative">
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    rows="6"
                                    maxLength="300"
                                    className="w-full p-6 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#12284C] focus:bg-white focus:border-transparent outline-none transition-all duration-300 rounded-none text-lg"
                                    placeholder="Tell us a little about yourself..."
                                ></textarea>
                                <p className="absolute bottom-4 right-4 text-xs font-mono text-gray-400">
                                    {formData.bio.length}/300
                                </p>
                            </div>
                        ) : (
                            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl font-light">
                                {user.bio || "Tell us a little about yourself..."}
                            </p>
                        )}
                    </div>

                    {message && (
                        <div className="mt-8 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 font-medium">
                            {message}
                        </div>
                    )}
                    {error && (
                        <div className="mt-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 font-medium">
                            {error}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
