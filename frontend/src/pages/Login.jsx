import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { authActions } from '../store/auth';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const host = import.meta.env.VITE_HOST || undefined;

const Login = () => {

    const [values, setValues] = useState({
        username: "",
        password: "",
    });

   const navigate =  useNavigate();
   const dispatch = useDispatch();

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const handleLogIn = async () => {
        try {
            if (values.username === ""||values.password === "") {
                toast.error("All fields are required");
            }
            else{
                const res = await axios.post(`${host}/api/auth/sign-in`,values);
                // console.log(res.data)
                localStorage.setItem("id",res.data.data._id);
                localStorage.setItem("token",res.data.token);
                localStorage.setItem("role",res.data.data.role);
        
                dispatch(authActions.login());
                dispatch(authActions.changeRole(res.data.data.role));
                navigate('/profile');
            }
        } catch (error) {
            // console.log(error.response.data.msg)
           toast.error(error.response.data.msg);
        }
    }

    return (
        <>
        <div className='min-h-[90vh] bg-zinc-900 px-12 py-8 flex items-center justify-center'>
            <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
                <p className="text-zinc-200 text-xl">Log In</p>
                <div className="mt-4">

                    <div>
                        <label htmlFor="" className="text-zinc-400">
                            Username
                        </label>
                        <input type="text" className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none" placeholder='username' required name='username' value={values.username} onChange={handleChange}/>
                    </div>

                    <div className="mt-4">
                        <label className="text-zinc-400">Password</label>
                        <input type="text" className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none" placeholder='password' name='password' required value={values.password} onChange={handleChange} />
                    </div>


                    <div className="mt-4">
                        <button className="w-full hover:bg-blue-500 hover:text-white font-semibold py-2 rounded bg-white text-zinc-900 transition-all duration-300" onClick={handleLogIn}>
                            LogIn
                        </button>
                    </div>
                    <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
                        Or
                    </p>
                    <p className='flex mt-4 items-center justify-center text-zinc-500 font-semibold'>
                        Don't have an account ? &nbsp;
                        <Link to="/sign-up" className="hover:text-blue-500">
                            <u>Sign Up</u>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
        <ToastContainer/>
        </>
    )
}

export default Login
