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

const ViewBookDetails = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    const { id } = useParams();
    const [data, setData] = useState();
    const navigate = useNavigate();

    const getData = async () => {
        const res = await axios.get(`http://localhost:5500/api/book/get-book/${id}`);
        // console.log(res.data.data);
        setData(res.data.data);
    }

    const headers = {
        "auth-token": localStorage.getItem("token")
      };
    const addToFavourites = async()=>{
        try {
            const res = await axios.put("http://localhost:5500/api/favourite/add-book-to-favourite",{bookId:data._id},{headers});
            // console.log(res.data);
            toast.success(res.data.msg);
        } catch (error) {
            // console.log(error.response.data.msg);
            toast.error(error.response.data.msg);
        }
    }

    const addToCart = async()=>{
        try {
            const res = await axios.put("http://localhost:5500/api/cart/add-to-cart",{bookId:data._id},{headers});
            // console.log(res.data);
            toast.success(res.data.msg);
        } catch (error) {
            // console.log(error.response.data.msg);
            toast.error(error.response.data.msg);
        }
    }

    const handleDelete = async(id)=>{
        try {
            console.log(id);
            const res = await axios.delete(`http://localhost:5500/api/book/delete-book/${id}`,{headers});
            // console.log(res.data);
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
            {data && (
                <div className='px-8 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8'>
                    <div className='w-full lg:w-3/6'>
                        <div className='flex flex-col lg:flex-row justify-around bg-zinc-800 p-12 rounded'>
                            <img src={data.url} alt="" className=' md:h-[60vh] h-[5 0vh] lg:h-[70vh] rounded' />


                            {isLoggedIn && role === "user" && (<div className='flex flex-col md:flex-row items-center justify-between lg:justify-start lg:flex-col mt-4 lg:mt-0'>
                                <button className='bg-white rounded lg:rounded-full text-3xl p-3 text-red-500' title='Add to favourites' onClick={addToFavourites}>
                                    <FaHeart />
                                </button>
                                <button className='bg-white rounded lg:rounded-full text-3xl p-3 lg:mt-4' title='Add to cart' onClick={addToCart}>
                                    <FaCartPlus />
                                </button>
                            </div>)}


                            {isLoggedIn && role === "admin" && (<div className='flex flex-row lg:flex-col items-center justify-between lg:justify-start lg:flex-col mt-4 lg:mt-0'>
                                <Link to={`/update-book/${id}`} className='bg-white rounded lg:rounded-full text-3xl p-3 text-red-500' title='Edit'>
                                    <FaEdit />
                                </Link>
                                <button className='bg-white rounded lg:rounded-full text-3xl p-3 lg:mt-4' title='Delete' onClick={()=>{
                                    handleDelete(data._id);
                                }}>
                                    <MdDelete />
                                </button>
                            </div>)}


                        </div>
                    </div>
                    <div className='p-4 w-full lg:w-3/6'>
                        <h1 className="text-4xl text-zinc-300 font-semibold">{data.title}</h1>
                        <p className='text-zinc-400 mt-1'>By {data.author}</p>
                        <p className='text-zinc-500 mt-4 text-xl'>{data.desc}</p>
                        <p className='flex mt-4 items-center justify-start text-zinc-400'>
                            <GrLanguage className="me-3" />
                            {data.language}
                        </p>
                        <p className='mt-4 text-zinc-100 text-3xl font-semibold'>
                            Price : ₹ {data.price}
                        </p>
                    </div>
                </div>
            )}
            {!data && (
                <div className='h-screen bg-zinc-900 flex items-center justify-center'> <Loader /></div>
            )}
            <ToastContainer/>
        </>
    )
}

export default ViewBookDetails
