import React, { useEffect, useState } from 'react'
import { AiFillDelete } from "react-icons/ai";
import Loader from '../components/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const host = import.meta.env.VITE_HOST || undefined;

const Cart = () => {
  const [data, setData] = useState();
  const [total, setTotal] = useState(0);

  const headers = {
    "auth-token": localStorage.getItem("token")
  };
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await axios.get(`${host}/api/cart/get-cart`, { headers });
      setData(res.data.data);
      let totalPrice = res.data?.data?.reduce((acc,curr)=>acc+curr.price,0);
      setTotal(totalPrice);
    } catch (error) {}
  }

  const removeFromCart = async (id) => {
    try {
      const res = await axios.put(`${host}/api/cart/remove-from-cart`, { bookId: id }, { headers });
      toast.success(res.data.msg);
      getData();
    } catch (error) {
      console.log(error);
    }
  }

  const placeOrder = async () => {
    try {
      const res = await axios.post(`${host}/api/order/place-order`, { orders: data }, { headers });
      toast.success(res.data.msg);
      navigate('/profile/orderHistory');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <>
      <div className='min-h-screen bg-zinc-950 px-4 sm:px-8 md:px-12 py-10'>

        {/* Ambient glow */}
        <div className="fixed top-20 left-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="fixed bottom-20 right-10 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

        {/* Loader */}
        {!data && (
          <div className='w-full h-[80vh] flex items-center justify-center'>
            <Loader />
          </div>
        )}

        {/* Empty cart */}
        {data && data.length === 0 && (
          <div className='flex flex-col items-center justify-center min-h-[70vh] gap-5'>
            <img src="./empty_cart.png" alt="empty cart" className='h-40 sm:h-52 opacity-40' />
            <p className='text-2xl sm:text-3xl font-bold text-zinc-500'>Your Cart is Empty</p>
            <p className='text-sm text-zinc-600'>Add some books to get started</p>
          </div>
        )}

        {/* Cart items */}
        {data && data.length > 0 && (
          <div className='max-w-4xl mx-auto'>

            {/* Header */}
            <div className="mb-8 border-l-4 border-blue-500 pl-4">
              <p className="text-xs tracking-[0.2em] uppercase text-zinc-500 mb-1">Review Items</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Your Cart</h1>
            </div>

            {/* Items */}
            <div className='flex flex-col gap-4'>
              {data.map((item, i) => (
                <div
                  key={i}
                  className='relative flex flex-col sm:flex-row items-center sm:items-start gap-5 bg-gradient-to-b from-zinc-800/60 to-zinc-900 border border-white/5 rounded-3xl p-5 hover:border-white/10 transition-all duration-200'
                >
                  {/* Cover */}
                  <div className='shrink-0 bg-zinc-950 rounded-2xl flex items-center justify-center p-3 h-32 w-24'>
                    <img src={item.url} alt="book_image" className='h-full w-auto object-contain drop-shadow-xl' />
                  </div>

                  {/* Info */}
                  <div className='flex-1 w-full'>
                    <h1 className='text-base sm:text-lg font-semibold text-white leading-snug'>
                      {item.title}
                    </h1>
                    <p className='text-xs text-zinc-500 mt-2 line-clamp-2 leading-relaxed'>
                      {item.desc.slice(0, 120)}...
                    </p>
                    <div className='mt-4 flex items-center justify-between'>
                      <span className='text-xl font-bold text-blue-400'>₹{item.price}</span>
                      <button
                        className='flex items-center gap-1.5 text-xs font-medium text-red-400 border border-red-500/20 bg-red-500/5 hover:bg-red-500/15 px-3 py-1.5 rounded-xl transition-all duration-200 active:scale-95'
                        onClick={() => removeFromCart(item._id)}
                      >
                        <AiFillDelete className='text-sm' />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className='mt-8 flex justify-end'>
              <div className='w-full sm:w-80 bg-gradient-to-b from-zinc-800/60 to-zinc-900 border border-white/6 rounded-3xl p-6 shadow-xl shadow-black/30'>

                <h2 className='text-xs tracking-[0.2em] uppercase text-zinc-500 mb-4'>Order Summary</h2>

                <div className='flex flex-col gap-2 mb-4'>
                  <div className='flex items-center justify-between text-sm text-zinc-400'>
                    <span>{data.length} {data.length === 1 ? "book" : "books"}</span>
                    <span>₹{total}</span>
                  </div>
                  <div className='flex items-center justify-between text-sm text-zinc-400'>
                    <span>Delivery</span>
                    <span className='text-green-400 font-medium'>Free</span>
                  </div>
                </div>

                <div className='h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4' />

                <div className='flex items-center justify-between mb-6'>
                  <span className='text-sm font-semibold text-white'>Total</span>
                  <span className='text-xl font-bold text-blue-400'>₹{total}</span>
                </div>

                <button
                  className='w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-sm font-semibold tracking-wide transition-all duration-200 shadow-lg shadow-blue-900/30'
                  onClick={placeOrder}
                >
                  Place Order
                </button>

              </div>
            </div>

          </div>
        )}

      </div>
      <ToastContainer />
    </>
  )
}

export default Cart