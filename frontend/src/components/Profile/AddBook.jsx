import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

const host = import.meta.env.VITE_HOST || '';

const AddBook = () => {

    const [data, setData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: ""
    });

    const headers = {
        "auth-token": localStorage.getItem("token")
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleAddBook = async () => {
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
                const res = await axios.post(`${host}/api/book/`, data, { headers ,withCredentials:true});
                toast.success(res.data.msg);
                setData({ url: "", title: "", author: "", price: "", desc: "", language: "" });
            }
        } catch (error) {
            console.log(error.response.data);
        }
    }

    const inputClass = 'w-full bg-zinc-950/80 text-zinc-100 text-sm px-4 py-3 rounded-xl border border-white/6 outline-none focus:border-blue-500/60 focus:bg-zinc-950 placeholder-zinc-600 transition-all duration-200';
    const labelClass = 'text-xs font-medium tracking-widest uppercase text-zinc-500';

    return (
        <>
            <div className='w-full'>

                {/* Header */}
                <div className="mb-8 border-l-4 border-blue-500 pl-4">
                    <p className="text-xs tracking-[0.2em] uppercase text-zinc-500 mb-1">Admin Panel</p>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">Add Book</h1>
                </div>

                <div className='bg-gradient-to-b from-zinc-800/60 to-zinc-900 border border-white/6 rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/30 backdrop-blur-sm max-w-2xl'>

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

                        {/* Submit */}
                        <div className='flex justify-end'>
                            <button
                                className='px-8 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white active:scale-95 transition-all duration-200 shadow-lg shadow-blue-900/30'
                                onClick={handleAddBook}
                            >
                                Add Book
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default AddBook;