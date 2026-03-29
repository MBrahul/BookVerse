import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaGripLines } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Navbar = () => {
    const links = [
        { title: "Home", url: "/" },
        { title: "All Books", url: "/all-books" },
        { title: "Cart", url: "/cart" },
        { title: "Profile", url: "/profile" },
        { title: "Admin Profile", url: "/profile" },
    ]

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state)=>state.auth.role);
    if (isLoggedIn === false) {
        links.splice(2, 3);
    }
    if(isLoggedIn === true && role === "admin"){
        links.splice(2, 2);
    }
    if(isLoggedIn === true && role === "user"){
        links.splice(4, 1);
    }
    const [mobileNav, setMobileNav] = useState("hidden");

    return (
        <>
            <nav className='relative z-50 flex bg-zinc-950 text-white px-8 py-4 items-center justify-between border-b border-zinc-800 shadow-lg shadow-black/30'>
                <div className="flex items-center gap-3">
                    <img className='h-9 w-9 object-contain' src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png" alt="logo" />
                    <Link to={'/'} className='text-xl font-bold tracking-wide text-white hover:text-blue-400 transition-colors duration-200'>BookVerse</Link>
                </div>
                <div className="nav-links-bookbazaar block md:flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-1">
                        {links.map((items, i) => {
                            return (
                                <div className='flex items-center' key={i}>
                                    {(items.title === "Profile" || items.title === "Admin Profile") ? (
                                        <Link to={items.url} className="px-4 py-1.5 text-sm font-medium border border-blue-500 text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-200" key={i}>{items.title}</Link>
                                    ) : (
                                        <Link to={items.url} className="px-3 py-1.5 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-all duration-200" key={i}>{items.title}</Link>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                    {!isLoggedIn && (
                        <div className='hidden md:flex items-center gap-3'>
                            <Link to={'/log-in'} className='px-4 py-1.5 text-sm font-medium border border-zinc-600 text-zinc-300 rounded-full hover:border-white hover:text-white transition-all duration-200'>Log In</Link>
                            <Link to={'/sign-up'} className='px-4 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-all duration-200'>Sign Up</Link>
                        </div>
                    )}

                    <button className='text-zinc-400 text-xl hover:text-white block md:hidden transition-colors duration-200' onClick={() => {
                        if (mobileNav === "hidden") {
                            setMobileNav("block");
                        }
                        else {
                            setMobileNav("hidden");
                        }
                    }}>
                        <FaGripLines />
                    </button>
                </div>
            </nav>

            <div className={`${mobileNav} bg-zinc-950 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center gap-6`}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600"></div>

                {links.map((items, i) => (
                    <Link
                        to={items.url}
                        className="text-zinc-300 text-3xl font-semibold hover:text-white tracking-wide transition-all duration-200 hover:translate-x-1"
                        key={i}
                        onClick={() => {
                            if (mobileNav === "hidden") {
                                setMobileNav("block");
                            }
                            else {
                                setMobileNav("hidden");
                            }
                        }}
                    >{items.title}</Link>
                ))}

                {!isLoggedIn && (
                    <div className='flex flex-col items-center gap-3 mt-4'>
                        <Link to={'/log-in'} className='w-56 text-center text-white px-8 py-3 text-lg font-semibold border border-zinc-600 rounded-full hover:border-white hover:bg-zinc-800 transition-all duration-200'
                            onClick={() => {
                                if (mobileNav === "hidden") {
                                    setMobileNav("block");
                                }
                                else {
                                    setMobileNav("hidden");
                                }
                            }}>Log In</Link>
                        <Link to={'/sign-up'} className='w-56 text-center px-8 py-3 text-lg font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-all duration-200'
                            onClick={() => {
                                if (mobileNav === "hidden") {
                                    setMobileNav("block");
                                }
                                else {
                                    setMobileNav("hidden");
                                }
                            }}>Sign Up</Link>
                    </div>
                )}
            </div>
        </>
    )
}

export default Navbar