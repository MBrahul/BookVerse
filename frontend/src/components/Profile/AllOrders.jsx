import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaLink } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import SeeUserData from '../../pages/SeeUserData';
const host = import.meta.env.VITE_HOST || undefined;

const AllOrders = () => {
   
    const [data, setData] = useState();
    const headers = {
        "auth-token": localStorage.getItem("token")
    };
    const [option, setOption] = useState(-1);
    const [status, setStatus] = useState();
    const [userDiv, setuserDiv] = useState("hiddend");
    const [userDivData, setuserDivData] = useState();

    const getData = async () => {
        try {
            const res = await axios.get(`${host}/api/order/get-all-orders`, { headers });
            // console.log(res.data.data);
            setData(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        setStatus(e.target.value);
        // console.log(e.target.value);
    }

    const updateStatus = async (id) => {
        try {
            if (!status) {

            }
            else {
                const res = await axios.put(`${host}/api/order/update-order-status/${id}`, { status }, { headers });
                // console.log(res.data);
                alert("Status updated successfully");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, [data])
    return (
        <>
            {!data && (<div className='flex items-center justify-center h-[100%]'> <Loader /> </div>)}
            {data && data.length === 0 && (
                <div className='h-[80vh] p-4 text-zinc-100'>
                    <div className='h-[100%] flex flex-col items-center justify-center'>
                        <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>
                            No Order History
                        </h1>
                        <img src="./no_order.png" alt="image" className='h-[20vh] mb-8' />
                    </div>
                </div>
            )}
            {data && data.length > 0 && (
                <div className='h-[100%] p-0 md:p-2 text-zinc-100'>
                    <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
                        All Orders
                    </h1>
                    <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
                        <div className='w-[3%]'>
                            <h1 className='text-center'>
                                Sr.
                            </h1>
                        </div>

                        <div className='w-[22%]'>
                            <h1 className=''>
                                Books
                            </h1>
                        </div>

                        <div className='w-[45%]'>
                            <h1 className=''>
                                Description
                            </h1>
                        </div>

                        <div className='w-[9%]'>
                            <h1 className=''>
                                Price
                            </h1>
                        </div>

                        <div className='w-[16%]'>
                            <h1 className=''>
                                Status
                            </h1>
                        </div>

                        <div className='w-none md:w-[5%] hidded md:block'>
                            <h1 className=''>
                                <FaUser />
                            </h1>
                        </div>

                    </div>


                    {data && data.map((item, i) => (
                        <div className='bg-zinc-800 flex gap-4 w-full rounded py-2 px-2 gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300' key={i}>
                            <div className='w-[3%]'>
                                <h1 className='text-center'>
                                    {i + 1}
                                </h1>
                            </div>
                            <div className='w-[40%] md:w-[22%]'>
                                <Link to={`/view-book-details/${item.book._id}`} className='hover:text-blue-300'>
                                    {item.book.title}
                                </Link>
                            </div>
                            <div className='w-0 md:w-[45%] hidden md:block'>
                                <h1 className=''>
                                    {item.book.desc.slice(0, 50)} ...
                                </h1>
                            </div>
                            <div className='w-[15%] md:w-[8%]'>
                                <h1 className=''>
                                    ₹ {item.book.price}
                                </h1>
                            </div>

                            <div className='w-[32%] md:w-[17%]'>
                                <h1 className='font-semibold'>
                                    <button className='hover:scale-105 transition-all duration-300' onClick={(e) => {
                                        e.preventDefault();
                                        if (option != i)
                                            setOption(i);
                                        else setOption(-1);
                                        // console.log("clicked");
                                    }}>
                                        {item.status === "Order Placed" ? (
                                            <div className="text-yellow-500">{item.status}</div>
                                        ) : item.status === "Canceled" ? (
                                            <div className="text-red-500">{item.status}</div>
                                        ) : <div className="text-green-500">{item.status}</div>}
                                    </button>
                                    <div className={option === i ? "flex" : "hidden" + " transition-all duration-300"}>
                                        <select name="" id="" className='bg-gray-800' onChange={handleChange} value={status ? status : item.status}>
                                            {["Order Placed", "Out For Delivery", "Delivered", "Canceled"].map((item, i) => (
                                                <option value={item} key={i}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>
                                        <button className='text-green-500 hover:text-red-500' onClick={() => {
                                            updateStatus(item._id);
                                        }}>
                                            <FaCheck />
                                        </button>
                                    </div>
                                </h1>
                            </div>
                            <div className='w-[5%]'>
                                <button className="text-zinc-400 hover:text-white transition-all duration-300 text-normal" onClick={() => {
                                    setuserDiv("fixed");
                                    setuserDivData(item.user);
                                }}>
                                    <FaLink />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {
                userDivData && (
                    <SeeUserData
                        userDiv={userDiv}
                        userDivData={userDivData}
                        setuserDiv={setuserDiv}
                    />
                )
            }
        </>
    )
}

export default AllOrders
