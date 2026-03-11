import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';

const host = import.meta.env.VITE_HOST || undefined;

const ViewBookDetails = () => {

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    const { id } = useParams();
    const [data, setData] = useState();
    const navigate = useNavigate();

    const getData = async () => {
        const res = await axios.get(`${host}/api/book/get-book/${id}`);
        setData(res.data.data);
    }

    const headers = {
        "auth-token": localStorage.getItem("token")
    };

    const addToFavourites = async () => {
        try {
            const res = await axios.put(`${host}/api/favourite/add-book-to-favourite`, { bookId: data._id }, { headers });
            toast.success(res.data.msg);
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }

    const addToCart = async () => {
        try {
            const res = await axios.put(`${host}/api/cart/add-to-cart`, { bookId: data._id }, { headers });
            toast.success(res.data.msg);
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`${host}/api/book/delete-book/${id}`, { headers });
            alert(res.data.msg);
            navigate('/all-books');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            {!data && (
                <div className='h-screen bg-zinc-950 flex items-center justify-center'>
                    <Loader />
                </div>
            )}

            {data && (
                <div className='min-h-screen bg-zinc-950 px-4 sm:px-8 md:px-12 py-10'>

                    {/* Ambient glows */}
                    <div className="fixed top-20 left-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="fixed bottom-20 right-10 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

                    <div className='relative max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12'>

                        {/* LEFT — Cover */}
                        <div className='w-full lg:w-2/5'>
                            <div className='sticky top-8'>
                                <div className='relative bg-gradient-to-b from-zinc-800/60 to-zinc-900 border border-white/6 rounded-3xl p-10 flex flex-col items-center shadow-2xl shadow-black/40'>

                                    {/* Grid texture */}
                                    <div className="absolute inset-0 rounded-3xl opacity-[0.025]"
                                        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
                                    />

                                    {/* Radial spotlight */}
                                    <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.06)_0%,transparent_70%)]" />

                                    {/* Shadow blob under book */}
                                    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-40 h-6 bg-blue-900/30 blur-2xl rounded-full" />

                                    <img
                                        src={data.url}
                                        alt={data.title}
                                        className='relative h-[40vh] sm:h-[50vh] lg:h-[55vh] w-auto object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.8)] hover:scale-[1.02] hover:-rotate-1 transition-all duration-500'
                                    />

                                    {/* Action buttons */}
                                    {isLoggedIn && role === "user" && (
                                        <div className='relative flex gap-3 mt-8 w-full'>
                                            <button
                                                className='flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/40 active:scale-95 transition-all duration-200'
                                                title='Add to favourites'
                                                onClick={addToFavourites}
                                            >
                                                <FaHeart className='text-base' />
                                                Favourite
                                            </button>
                                            <button
                                                className='flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white border border-blue-500/30 active:scale-95 transition-all duration-200 shadow-lg shadow-blue-900/30'
                                                title='Add to cart'
                                                onClick={addToCart}
                                            >
                                                <FaCartPlus className='text-base' />
                                                Add to Cart
                                            </button>
                                        </div>
                                    )}

                                    {isLoggedIn && role === "admin" && (
                                        <div className='relative flex gap-3 mt-8 w-full'>
                                            <Link
                                                to={`/update-book/${id}`}
                                                className='flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/40 active:scale-95 transition-all duration-200'
                                                title='Edit'
                                            >
                                                <FaEdit className='text-base' />
                                                Edit
                                            </Link>
                                            <button
                                                className='flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/40 active:scale-95 transition-all duration-200'
                                                title='Delete'
                                                onClick={() => handleDelete(data._id)}
                                            >
                                                <MdDelete className='text-base' />
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT — Details */}
                        <div className='w-full lg:w-3/5 flex flex-col gap-6'>

                            {/* Title block */}
                            <div className='border-l-4 border-blue-500 pl-5'>
                                <p className='text-xs tracking-[0.25em] uppercase text-zinc-500 mb-2'>Book Details</p>
                                <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight'>{data.title}</h1>
                                <p className='mt-2 text-zinc-400 text-sm tracking-wide'>by <span className='text-zinc-300 font-medium'>{data.author}</span></p>
                            </div>

                            {/* Divider */}
                            <div className='h-px bg-gradient-to-r from-blue-500/30 via-white/8 to-transparent' />

                            {/* Description */}
                            <div className='bg-gradient-to-b from-zinc-800/40 to-zinc-900/40 border border-white/5 rounded-2xl p-5 sm:p-6'>
                                <p className='text-xs tracking-[0.2em] uppercase text-zinc-500 mb-3'>About this book</p>
                                <p className='text-zinc-400 text-sm sm:text-base leading-relaxed'>{data.desc}</p>
                            </div>

                            {/* Meta row */}
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='bg-zinc-900/60 border border-white/5 rounded-2xl p-4 flex flex-col gap-1'>
                                    <span className='text-[10px] tracking-widest uppercase text-zinc-600'>Language</span>
                                    <div className='flex items-center gap-2 text-zinc-300 text-sm font-medium mt-1'>
                                        <GrLanguage className='text-blue-400' />
                                        {data.language}
                                    </div>
                                </div>
                                <div className='bg-zinc-900/60 border border-white/5 rounded-2xl p-4 flex flex-col gap-1'>
                                    <span className='text-[10px] tracking-widest uppercase text-zinc-600'>Format</span>
                                    <div className='flex items-center gap-2 text-zinc-300 text-sm font-medium mt-1'>
                                        📖 Paperback
                                    </div>
                                </div>
                            </div>

                            {/* Price block */}
                            <div className='bg-gradient-to-r from-blue-600/10 to-cyan-600/5 border border-blue-500/20 rounded-2xl p-5 flex items-center justify-between'>
                                <div>
                                    <p className='text-[10px] tracking-widest uppercase text-zinc-500 mb-1'>Price</p>
                                    <p className='text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300'>
                                        ₹{data.price}
                                    </p>
                                </div>
                                <div className='text-right'>
                                    <p className='text-[10px] tracking-widest uppercase text-zinc-500 mb-1'>Delivery</p>
                                    <p className='text-sm font-semibold text-green-400'>Free</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
        </>
    )
}

export default ViewBookDetails