import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const host = import.meta.env.VITE_HOST || '';

const UpdateBook = () => {
    const [data, setData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: ""
    });
    const { id } = useParams();
    const headers = {
        "auth-token": localStorage.getItem("token")
    };
    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const getData = async () => {
        const res = await axios.get(`${host}/api/book/${id}`,{withCredentials:true});
        setData(res.data.data);
    }

    const handleEditBook = async () => {
        try {
            if (
                data.url === "" ||
                data.title === "" ||
                data.author === "" ||
                data.price === "" ||
                data.desc === "" ||
                data.language === ""
            ) {
                toast.error("All fields are required");
            } else {
                const res = await axios.put(`${host}/api/book/${id}`, data, { headers,withCredentials:true });
                alert(res.data.msg);
                navigate(`/view-book-details/${id}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    const inputClass = 'w-full bg-zinc-950/80 text-zinc-100 text-sm px-4 py-3 rounded-xl border border-white/6 outline-none focus:border-blue-500/60 focus:bg-zinc-950 placeholder-zinc-600 transition-all duration-200';
    const labelClass = 'text-xs font-medium tracking-widest uppercase text-zinc-500';

    return (
        <>
            <div className='min-h-screen bg-zinc-950 px-4 sm:px-8 md:px-16 py-10'>

                {/* Ambient glow */}
                <div className="fixed top-20 left-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
                <div className="fixed bottom-20 right-10 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

                <div className='relative max-w-2xl mx-auto'>

                    {/* Header */}
                    <div className="mb-8 border-l-4 border-blue-500 pl-4">
                        <p className="text-xs tracking-[0.2em] uppercase text-zinc-500 mb-1">Admin Panel</p>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white">Edit Book</h1>
                    </div>

                    <div className='bg-gradient-to-b from-zinc-800/60 to-zinc-900 border border-white/6 rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/30 backdrop-blur-sm'>

                        <div className='flex flex-col gap-5'>

                            {/* Image URL */}
                            <div className='flex flex-col gap-1.5'>
                                <label className={labelClass}>Image URL</label>
                                <input
                                    type="text"
                                    className={inputClass}
                                    placeholder='https://example.com/cover.jpg'
                                    name='url'
                                    required
                                    value={data.url}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Title */}
                            <div className='flex flex-col gap-1.5'>
                                <label className={labelClass}>Title</label>
                                <input
                                    type="text"
                                    className={inputClass}
                                    placeholder='Title of book'
                                    name='title'
                                    required
                                    value={data.title}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Author */}
                            <div className='flex flex-col gap-1.5'>
                                <label className={labelClass}>Author</label>
                                <input
                                    type="text"
                                    className={inputClass}
                                    placeholder='Author of book'
                                    name='author'
                                    required
                                    value={data.author}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Language + Price */}
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                <div className='flex flex-col gap-1.5'>
                                    <label className={labelClass}>Language</label>
                                    <input
                                        type="text"
                                        className={inputClass}
                                        placeholder='e.g. English'
                                        name='language'
                                        required
                                        value={data.language}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='flex flex-col gap-1.5'>
                                    <label className={labelClass}>Price (₹)</label>
                                    <input
                                        type="number"
                                        className={inputClass}
                                        placeholder='e.g. 299'
                                        name='price'
                                        required
                                        value={data.price}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className='flex flex-col gap-1.5'>
                                <label className={labelClass}>Description</label>
                                <textarea
                                    className={`${inputClass} resize-none`}
                                    placeholder='Write a short description of the book...'
                                    name='desc'
                                    required
                                    value={data.desc}
                                    onChange={handleChange}
                                    rows={5}
                                />
                            </div>

                            {/* Divider */}
                            <div className='h-px bg-gradient-to-r from-transparent via-white/8 to-transparent' />

                            {/* Actions */}
                            <div className='flex items-center justify-between gap-4'>
                                <button
                                    className='px-5 py-2.5 rounded-xl text-sm font-medium text-zinc-400 border border-white/8 hover:bg-white/5 hover:text-white active:scale-95 transition-all duration-200'
                                    onClick={() => navigate(`/view-book-details/${id}`)}
                                >
                                    ← Cancel
                                </button>
                                <button
                                    className='px-8 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white active:scale-95 transition-all duration-200 shadow-lg shadow-blue-900/30'
                                    onClick={handleEditBook}
                                >
                                    Save Changes
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default UpdateBook