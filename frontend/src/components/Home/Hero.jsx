import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className='min-h-[75vh] flex flex-col md:flex-row items-center justify-center px-8 md:px-16 gap-12 bg-zinc-950'>
            <div className='w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center'>
                <span className='text-xs font-semibold tracking-[0.25em] uppercase text-blue-400 mb-4 border border-blue-500/30 bg-blue-500/10 px-3 py-1 rounded-full'>
                    Curated Collection
                </span>
                <h1 className='lg:text-6xl text-4xl font-bold text-white text-center lg:text-left leading-tight tracking-tight'>
                    Discover Your<br />
                    <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600'>Next Great Read</span>
                </h1>
                <p className="mt-5 text-base text-zinc-400 lg:text-left text-center leading-relaxed max-w-md">
                    Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books.
                </p>
                <div className='mt-10 flex items-center gap-4'>
                    <Link to={'/all-books'} className="text-white text-base font-semibold bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-full transition-all duration-200 shadow-lg shadow-blue-900/30">
                        Discover Books
                    </Link>
                    <Link to={'/all-books'} className="text-zinc-300 text-base font-medium hover:text-white px-4 py-3 transition-colors duration-200">
                        Browse All →
                    </Link>
                </div>
            </div>
            <div className='w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center'>
                <img src="./hero.png" alt="hero" className='object-contain drop-shadow-2xl max-h-[60vh]' />
            </div>
        </div>
    )
}

export default Hero;