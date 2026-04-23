import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const host = import.meta.env.VITE_HOST || '';

const SignUp = () => {
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        address: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleSignUp = async () => {
        try {
            if (values.username === "" || values.email === "" || values.password === "" || values.address === "") {
                toast.error("All fields are required");
            } else {
                const res = await axios.post(`${host}/api/auth/sign-up`, values, {
                    withCredentials: true
                });
                navigate('/log-in');
            }
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }

    return (
        <>
            <div className='min-h-[90vh] bg-zinc-950 flex items-center justify-center px-4 sm:px-8 py-10'>

                {/* Ambient glow */}
                <div className="absolute w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3">
                    <div className="bg-gradient-to-b from-zinc-800/80 to-zinc-900 border border-white/8 rounded-3xl px-6 sm:px-10 py-10 shadow-2xl shadow-black/50 backdrop-blur-sm">

                        {/* Header */}
                        <div className="mb-8">
                            <p className="text-xs tracking-[0.2em] uppercase text-blue-400 font-medium mb-2">Create account</p>
                            <h1 className="text-2xl sm:text-3xl font-bold text-white">Sign Up</h1>
                            <div className="mt-3 h-px w-12 bg-gradient-to-r from-blue-500 to-transparent" />
                        </div>

                        {/* Fields */}
                        <div className="flex flex-col gap-5">

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium tracking-widest uppercase text-zinc-500">Username</label>
                                <input
                                    type="text"
                                    className="w-full bg-zinc-950/80 text-zinc-100 text-sm px-4 py-3 rounded-xl border border-white/6 outline-none focus:border-blue-500/60 focus:bg-zinc-950 placeholder-zinc-600 transition-all duration-200"
                                    placeholder="Enter your username"
                                    required
                                    name='username'
                                    values={values.username}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium tracking-widest uppercase text-zinc-500">Email</label>
                                <input
                                    type="text"
                                    className="w-full bg-zinc-950/80 text-zinc-100 text-sm px-4 py-3 rounded-xl border border-white/6 outline-none focus:border-blue-500/60 focus:bg-zinc-950 placeholder-zinc-600 transition-all duration-200"
                                    placeholder="xyz@gmail.com"
                                    name='email'
                                    required
                                    values={values.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium tracking-widest uppercase text-zinc-500">Password</label>
                                <input
                                    type="password"
                                    className="w-full bg-zinc-950/80 text-zinc-100 text-sm px-4 py-3 rounded-xl border border-white/6 outline-none focus:border-blue-500/60 focus:bg-zinc-950 placeholder-zinc-600 transition-all duration-200"
                                    placeholder="Enter your password"
                                    name='password'
                                    required
                                    values={values.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium tracking-widest uppercase text-zinc-500">Address</label>
                                <textarea
                                    className="w-full bg-zinc-950/80 text-zinc-100 text-sm px-4 py-3 rounded-xl border border-white/6 outline-none focus:border-blue-500/60 focus:bg-zinc-950 placeholder-zinc-600 transition-all duration-200 resize-none"
                                    placeholder="Enter your address"
                                    name='address'
                                    required
                                    rows={4}
                                    values={values.address}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        {/* Button */}
                        <button
                            className="mt-8 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-sm font-semibold tracking-wide transition-all duration-200 shadow-lg shadow-blue-900/30"
                            onClick={handleSignUp}
                        >
                            Sign Up
                        </button>

                        {/* Divider */}
                        <div className="flex items-center gap-3 my-6">
                            <div className="flex-1 h-px bg-white/6" />
                            <span className="text-xs text-zinc-600 font-medium">OR</span>
                            <div className="flex-1 h-px bg-white/6" />
                        </div>

                        {/* Log in link */}
                        <p className='text-center text-sm text-zinc-500'>
                            Already have an account?{' '}
                            <Link to="/log-in" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200">
                                Log In
                            </Link>
                        </p>

                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default SignUp