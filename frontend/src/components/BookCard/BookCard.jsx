import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const host = import.meta.env.VITE_HOST || '';

const BookCard = (props) => {

    const { data, favourite ,setRefresh} = props;
    const headers = {
        "auth-token": localStorage.getItem("token")
    };
    const removeFromFavourite = async () => {
        try {
            const res = await axios.delete(`${host}/api/favourite/book`, {
                data: { bookId: data._id }, 
                headers,
                withCredentials: true
            });
            setRefresh((prev)=>!prev);
        } catch (error) { }
    }

    useEffect(() => {
    }, [])

    return (
        <div className='group relative flex flex-col rounded-3xl overflow-hidden border border-white/6 hover:border-blue-500/30 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(59,130,246,0.12)] hover:-translate-y-2 bg-zinc-900'>

            {/* Top glow bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <Link to={`/view-book-details/${data._id}`} className="flex flex-col flex-1">
            

                {/* Cover area */}
                <div className="relative flex items-center justify-center px-8 pt-10 pb-6 overflow-hidden">

                    {/* Background radial glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Subtle grid pattern */}
                    <div className="absolute inset-0 opacity-[0.03]"
                        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                    />

                    {/* Book cover shadow base */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-black/40 blur-xl rounded-full group-hover:w-32 group-hover:bg-blue-900/40 transition-all duration-500" />

                    <div className="relative w-full flex items-center justify-center h-44 sm:h-48">
                        <img
                            className='h-full w-auto max-w-[65%] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] group-hover:drop-shadow-[0_28px_40px_rgba(59,130,246,0.3)] group-hover:scale-[1.07] group-hover:-rotate-1 transition-all duration-500'
                            src={data.url}
                            alt="book_logo"
                        />
                    </div>
                </div>

                {/* Info */}
                <div className='relative px-5 pb-5 flex flex-col flex-1'>

                    {/* Divider with glow */}
                    <div className='relative h-px mb-4'>
                        <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent' />
                        <div className='absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                    </div>

                    {/* Title */}
                    <h2 className='text-sm sm:text-[0.9rem] font-semibold text-white leading-snug line-clamp-2 mb-1.5 group-hover:text-blue-50 transition-colors duration-300'>{data.title}</h2>

                    {/* Author */}
                    <p className='text-[10px] sm:text-[11px] text-zinc-600 tracking-widest uppercase truncate mb-auto'>
                        {data.author}
                    </p>

                    {/* Price row */}
                    <div className='flex items-center justify-between mt-4'>
                        <p className='text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300'>
                            ₹{data.price}
                        </p>
                        <span className='text-[10px] tracking-widest uppercase text-zinc-600 border border-white/6 px-2 py-0.5 rounded-full group-hover:border-blue-500/20 group-hover:text-blue-400/60 transition-all duration-300'>
                            Book
                        </span>
                    </div>
                </div>

            </Link>

            {favourite && (
                <div className='px-5 pb-5'>
                    <div className='h-px bg-gradient-to-r from-transparent via-white/6 to-transparent mb-4' />
                    <button
                        className='w-full py-2 rounded-2xl text-xs font-medium bg-red-500/5 border border-red-500/15 text-red-400/80 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 active:scale-95 transition-all duration-200'
                        onClick={removeFromFavourite}
                    >
                        ✕ &nbsp;Remove from Favourites
                    </button>
                </div>
            )}
        </div>
    );
}

export default BookCard