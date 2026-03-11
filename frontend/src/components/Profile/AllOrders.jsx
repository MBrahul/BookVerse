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

    const [orders, setOrders] = useState(null);
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
            setOrders(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        setStatus(e.target.value);
    }

    const updateStatus = async (id) => {
        try {
            if (!status) { }
            else {
                const res = await axios.put(`${host}/api/order/update-order-status/${id}`, { status }, { headers });
                getData();
                alert("Status updated successfully");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    },[]);

    const statusStyle = (s) => {
        if (s === "Order Placed") return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
        if (s === "Canceled") return "text-red-400 bg-red-500/10 border-red-500/20";
        return "text-green-400 bg-green-500/10 border-green-500/20";
    }

    return (
        <>
            {!orders && (
                <div className='flex items-center justify-center min-h-[40vh]'>
                    <Loader />
                </div>
            )}

            {orders && orders.length === 0 && (
                <div className='flex flex-col items-center justify-center py-24 gap-4'>
                    <span className='text-5xl'>📦</span>
                    <p className='text-lg font-semibold text-zinc-500'>No Orders Yet</p>
                    <p className='text-sm text-zinc-600'>All customer orders will appear here</p>
                </div>
            )}

            {orders && orders.length > 0 && (
                <div className='w-full'>

                    {/* Header */}
                    <div className="mb-8 border-l-4 border-blue-500 pl-4">
                        <p className="text-xs tracking-[0.2em] uppercase text-zinc-500 mb-1">Admin Panel</p>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white">All Orders</h1>
                    </div>

                    {/* Desktop table */}
                    <div className='hidden md:block w-full overflow-x-auto'>
                        <table className='w-full text-sm text-zinc-300 border-collapse'>
                            <thead>
                                <tr className='bg-zinc-800/80 border border-white/5 text-xs uppercase tracking-widest text-zinc-500'>
                                    <th className='px-4 py-3 text-left w-10'>#</th>
                                    <th className='px-4 py-3 text-left'>Book</th>
                                    <th className='px-4 py-3 text-left'>Description</th>
                                    <th className='px-4 py-3 text-left'>Price</th>
                                    <th className='px-4 py-3 text-left'>Status</th>
                                    <th className='px-4 py-3 text-left'>User</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-white/4'>
                                {orders.map((order, i) => {
                                    // console.log(order);
                                    return (
                                    <tr key={i} className='hover:bg-zinc-800/50 transition-colors duration-150'>
                                        <td className='px-4 py-4 text-zinc-600 text-xs'>{i + 1}</td>
                                        <td className='px-4 py-4'>
                                            <Link to={`/view-book-details/${order.book?._id}`} className='font-medium text-white hover:text-blue-400 transition-colors duration-150 line-clamp-1'>
                                                {order.book?.title}
                                            </Link>
                                        </td>
                                        <td className='px-4 py-4 text-zinc-500 text-xs line-clamp-1 max-w-xs'>
                                            {order.book?.desc.slice(0, 50)}...
                                        </td>
                                        <td className='px-4 py-4 font-semibold text-blue-400'>₹{order.book?.price}</td>
                                        <td className='px-4 py-4'>
                                            <div className='flex flex-col gap-2'>
                                                <button
                                                    className={`text-xs font-semibold px-2.5 py-1 rounded-full border w-fit hover:opacity-80 transition-opacity ${statusStyle(order.status)}`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        if (option !== i) setOption(i);
                                                        else setOption(-1);
                                                    }}
                                                >
                                                    {order.status}
                                                </button>
                                                <div className={`${option === i ? "flex" : "hidden"} items-center gap-2 transition-all duration-300`}>
                                                    <select
                                                        className='bg-zinc-900 border border-white/10 text-zinc-300 text-xs px-2 py-1 rounded-lg outline-none focus:border-blue-500/50'
                                                        onChange={handleChange}
                                                        value={status ? status : order.status}
                                                    >
                                                        {["Order Placed", "Out For Delivery", "Delivered", "Canceled"].map((s, i) => (
                                                            <option value={s} key={i}>{s}</option>
                                                        ))}
                                                    </select>
                                                    <button
                                                        className='text-green-400 hover:text-green-300 bg-green-500/10 border border-green-500/20 p-1.5 rounded-lg transition-colors duration-150'
                                                        onClick={() => updateStatus(order._id)}
                                                    >
                                                        <FaCheck className='text-xs' />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='px-4 py-4'>
                                            <button
                                                className='text-zinc-500 hover:text-blue-400 transition-colors duration-200 p-1.5 rounded-lg hover:bg-blue-500/10'
                                                onClick={() => {
                                                    setuserDiv("fixed");
                                                    setuserDivData(order.user);
                                                }}
                                            >
                                                <FaLink />
                                            </button>
                                        </td>
                                    </tr>
                                )
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile cards */}
                    <div className='flex flex-col gap-3 md:hidden'>
                        {orders.map((order, i) => (
                            <div key={i} className='bg-gradient-to-b from-zinc-800/60 to-zinc-900 border border-white/5 rounded-2xl p-4 flex flex-col gap-3'>
                                <div className='flex items-start justify-between gap-3'>
                                    <Link to={`/view-book-details/${order.book._id}`} className='font-semibold text-white hover:text-blue-400 transition-colors duration-150 leading-snug line-clamp-2 flex-1'>
                                        {order.book.title}
                                    </Link>
                                    <span className='text-blue-400 font-bold text-base shrink-0'>₹{order.book.price}</span>
                                </div>

                                <p className='text-xs text-zinc-500 line-clamp-2'>{order.book.desc?.slice(0, 80)}...</p>

                                <div className='flex items-center justify-between flex-wrap gap-2'>
                                    <div className='flex flex-col gap-2'>
                                        <button
                                            className={`text-xs font-semibold px-2.5 py-1 rounded-full border w-fit ${statusStyle(order.status)}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (option !== i) setOption(i);
                                                else setOption(-1);
                                            }}
                                        >
                                            {order.status}
                                        </button>
                                        <div className={`${option === i ? "flex" : "hidden"} items-center gap-2`}>
                                            <select
                                                className='bg-zinc-900 border border-white/10 text-zinc-300 text-xs px-2 py-1 rounded-lg outline-none'
                                                onChange={handleChange}
                                                value={status ? status : order.status}
                                            >
                                                {["Order Placed", "Out For Delivery", "Delivered", "Canceled"].map((s, i) => (
                                                    <option value={s} key={i}>{s}</option>
                                                ))}
                                            </select>
                                            <button
                                                className='text-green-400 bg-green-500/10 border border-green-500/20 p-1.5 rounded-lg'
                                                onClick={() => updateStatus(order._id)}
                                            >
                                                <FaCheck className='text-xs' />
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        className='text-zinc-500 hover:text-blue-400 transition-colors duration-200 p-1.5 rounded-lg hover:bg-blue-500/10'
                                        onClick={() => {
                                            setuserDiv("fixed");
                                            setuserDivData(order.user);
                                        }}
                                    >
                                        <FaLink />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            )}

            {userDivData && (
                <SeeUserData
                    userDiv={userDiv}
                    userDivData={userDivData}
                    setuserDiv={setuserDiv}
                />
            )}
        </>
    )
}

export default AllOrders