import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

const host = import.meta.env.VITE_HOST || '';

const UserOrderHistory = () => {

  const headers = {
    "auth-token": localStorage.getItem("token")
  };

  const [data, setData] = useState();

  const getData = async () => {
    try {
      const res = await axios.get(`${host}/api/order/history`, { headers,withCredentials:true });
      setData(res.data.data);
    } catch (error) {}
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='w-full'>

      {/* Loader */}
      {!data && (
        <div className='flex items-center justify-center min-h-[40vh]'>
          <Loader />
        </div>
      )}

      {/* Empty state */}
      {data && data.length === 0 && (
        <div className='flex flex-col items-center justify-center py-24 gap-4'>
          {/* <img src="./no_order.png" alt="no orders" className='h-28 opacity-40' /> */}
          <p className='text-lg font-semibold text-zinc-500'>No Order History</p>
          <p className='text-sm text-zinc-600'>Your past orders will show up here</p>
        </div>
      )}

      {/* Orders */}
      {data && data.length > 0 && (
        <div className='w-full'>

          {/* Header */}
          <div className="mb-8 border-l-4 border-blue-500 pl-4">
            <p className="text-xs tracking-[0.2em] uppercase text-zinc-500 mb-1">Your Account</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Order History</h1>
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
                  <th className='px-4 py-3 text-left'>Mode</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-white/4'>
                {data.map((item, i) => (
                  <tr key={i} className='hover:bg-zinc-800/50 transition-colors duration-150 group'>
                    <td className='px-4 py-4 text-zinc-600 text-xs'>{i + 1}</td>
                    <td className='px-4 py-4'>
                      <Link to={`/view-book-details/${item.book._id}`} className='font-medium text-white hover:text-blue-400 transition-colors duration-150 line-clamp-1'>
                        {item.book.title}
                      </Link>
                    </td>
                    <td className='px-4 py-4 text-zinc-500 text-xs line-clamp-1 max-w-xs'>
                      {item.book.desc.slice(0, 50)}...
                    </td>
                    <td className='px-4 py-4 font-semibold text-blue-400'>₹{item.book.price}</td>
                    <td className='px-4 py-4'>
                      <p className={`text-xs font-semibold px-2.5 py-1 rounded-full border text-center ${
                        item.status === "Order Placed"
                          ? "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
                          : item.status === "Canceled"
                          ? "text-red-400 bg-red-500/10 border-red-500/20"
                          : "text-green-400 bg-green-500/10 border-green-500/20"
                      }`}>
                        {item.status} 
                      </p>
                    </td>
                    <td className='px-4 py-4 text-xs text-zinc-500'>COD</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className='flex flex-col gap-3 md:hidden'>
            {data.map((item, i) => (
              <div key={i} className='bg-gradient-to-b from-zinc-800/60 to-zinc-900 border border-white/5 rounded-2xl p-4 flex flex-col gap-3'>
                <div className='flex items-start justify-between gap-3'>
                  <Link to={`/view-book-details/${item.book._id}`} className='font-semibold text-white hover:text-blue-400 transition-colors duration-150 leading-snug line-clamp-2 flex-1'>
                    {item.book.title}
                  </Link>
                  <span className='text-blue-400 font-bold text-base shrink-0'>₹{item.book.price}</span>
                </div>
                <p className='text-xs text-zinc-500 line-clamp-2'>{item.book.desc.slice(0, 80)}...</p>
                <div className='flex items-center justify-between pt-1'>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                    item.status === "Order Placed"
                      ? "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
                      : item.status === "Canceled"
                      ? "text-red-400 bg-red-500/10 border-red-500/20"
                      : "text-green-400 bg-green-500/10 border-green-500/20"
                  }`}>
                    {item.status}
                  </span>
                  <span className='text-xs text-zinc-600'>COD · #{i + 1}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  )
}

export default UserOrderHistory