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
    // console.log(isLoggedIn);
    const role = useSelector((state)=>state.auth.role);
    if (isLoggedIn === false) {
        links.splice(2, 2);
    }
    if(isLoggedIn === true && role === "admin"){
        links.splice(3, 1);
    }
    if(isLoggedIn === true && role === "user"){
        links.splice(4, 1);
    }
    const [mobileNav, setMobileNav] = useState("hidden");

    return (
        <>
            <nav className='relative z-50 flex bg-zinc-800 text-white px-8 py-4 items-center justify-between'>
                <div className="flex items-center">
                    <img className='h-10 me-4' src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png" alt="logo" />
                    <Link to={'/'} className='text-2xl font-semibold'>BookBazaar</Link>
                </div>
                <div className="nav-links-bookbazaar block md:flex items-center gap-4">
                    <div className="hidden md:flex flex gap-4">
                        {links.map((items, i) => {
                            return (
                                <div className='flex items-center' key={i}>
                                    {(items.title === "Profile" ||  items.title === "Admin Profile" )? (<Link to={items.url} className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300" key={i}>{items.title}</Link>) : (<Link to={items.url} className="hover:text-blue-500 transitions-all duration-300" key={i}>{items.title}</Link>)}
                                </div>
                            )
                        })}
                    </div>
                    {!isLoggedIn && (
                        <div className='hidden md:flex flex gap-4'>
                            <Link to={'/log-in'} className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>Log In</Link>
                            <Link to={'/sign-up'} className='px-4 py-1 bg-blue-500 rounded hover:bg-whilte hover:text-zinc-800 transition-all duration-300'>SignUp</Link>
                        </div>
                    )}

                    <button className='text-white text-2xl hover:text-zinc-400 block md:hidden' onClick={() => {
                        // console.log("clicked")
                        if (mobileNav === "hidden") {
                            setMobileNav("block");
                        }
                        else {
                            setMobileNav("hidden");
                        }
                    }
                    }>
                        <FaGripLines />
                    </button>

                </div>
            </nav>
            <div className={` ${mobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center gap-8`}>
                {links.map((items, i) => (
                    <Link to={items.url} className="text-white text-4xl font-semibold hover:text-blue-500 transitions-all duration-300" key={i} onClick={() => {
                        if (mobileNav === "hidden") {
                            setMobileNav("block");
                        }
                        else {
                            setMobileNav("hidden");
                        }
                    }}  >{items.title}</Link>
                ))}

                {!isLoggedIn && (
                    <div>
                        <Link to={'/log-in'} className=' text-white px-8 py-2 text-3xl font-semibold border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300' onClick={() => {
                            if (mobileNav === "hidden") {
                                setMobileNav("block");
                            }
                            else {
                                setMobileNav("hidden");
                            }
                        }} >Log In</Link>
                        <Link to={'/sign-up'} className=' px-8 py-2 text-3xl font-semibold bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300' onClick={() => {
                            if (mobileNav === "hidden") {
                                setMobileNav("block");
                            }
                            else {
                                setMobileNav("hidden");
                            }
                        }} >SignUp</Link>
                    </div>
                )}

            </div>
        </>
    )
}

export default Navbar

// https://cdn-icons-png.flaticon.com/128/10433/10433049.png
