import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const host = import.meta.env.VITE_HOST || undefined;

const SignUp = () => {
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        address: ""
    });

   const navigate =  useNavigate();

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const handleSignUp = async () => {
        try {
            if (values.username === "" || values.email === "" || values.password === "" || values.address === "") {
                toast.error("All fields are required");
            }
            else{
                const res = await axios.post(`${host}/api/auth/sign-up`,values);
                // console.log(res.data)
                // if(res.data.status){
                    navigate('/log-in');
            }
        } catch (error) {
            // console.log(error.response.data.msg);
            toast.error(error.response.data.msg);
        }
    }
    return (
        <>
            <div className='min-h-[90vh] bg-zinc-900 px-12 py-8 flex items-center justify-center'>
                <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
                    <p className="text-zinc-200 text-xl">Sign Up</p>
                    <div className="mt-4">

                        <div>
                            <label htmlFor="" className="text-zinc-400">
                                Username
                            </label>
                            <input type="text" className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none" placeholder='username' required name='username' values={values.username} onChange={handleChange} />
                        </div>

                        <div className="mt-4">
                            <label className="text-zinc-400">Email</label>
                            <input type="text" className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none" placeholder='xyz@gmail.com' name='email' required values={values.email} onChange={handleChange} />
                        </div>

                        <div className="mt-4">
                            <label className="text-zinc-400">Password</label>
                            <input type="text" className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none" placeholder='password' name='password' required values={values.password} onChange={handleChange} />
                        </div>


                        <div className="mt-4">
                            <label className="text-zinc-400">Address</label>
                            <textarea type="text" className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none" placeholder='address' name='address' required rows={5} values={values.address} onChange={handleChange} />
                        </div>
                        <div className="mt-4">
                            <button className="w-full hover:bg-blue-500 hover:text-white font-semibold py-2 rounded bg-white text-zinc-900 transition-all duration-300" onClick={handleSignUp}>
                                SignUp
                            </button>
                        </div>
                        <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
                            Or
                        </p>
                        <p className='flex mt-4 items-center justify-center text-zinc-500 font-semibold'>
                            Already have an account ? &nbsp;
                            <Link to="/log-in" className="hover:text-blue-500">
                                <u>Log In</u>
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
