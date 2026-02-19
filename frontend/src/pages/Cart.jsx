import React, { useEffect, useState } from 'react'
import { AiFillDelete } from "react-icons/ai";
import Loader from '../components/Loader/Loader';
import { ToastContainer,toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const host = import.meta.env.VITE_HOST || undefined;

const Cart = () => {
  const [data, setData] = useState();
  const [total,setTotal] = useState(0);
 
  const headers = {
    "auth-token": localStorage.getItem("token")
  };
  const navigate = useNavigate();

  const getData = async()=>{
    try {
      const res = await axios.get(`${host}/api/cart/get-cart`, { headers });
      // console.log(res.data);
      setData(res.data.data);
    } catch (error) {
      // console.log(error)
    }
  }

  const removeFromCart = async(id)=>{
    try {
      const res = await axios.put(`${host}/api/cart/remove-from-cart`, {bookId:id},{ headers });
      toast.success(res.data.msg);
    } catch (error) {
      console.log(error);
    }
  }

  const placeOrder = async()=>{
    try {
        const res = await axios.post(`${host}/api/order/place-order`,
          {orders:data},
          {headers}
        );
        // console.log(res.data);
         toast.success(res.data.msg);
         navigate('/profile/orderHistory');
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(()=>{

    getData();

    if(data && data.length>0){
      let total = 0;
      data.map((item)=>{
        total+=item.price;
      })
      setTotal(total);
      total=0;
    }

  },[data])

  return (
    <>
    <div className='bg-zinc-900 px-12 py-8 min-h-screen '>
      {!data && <div className='w-full h-[90vh] flex items-center justify-center'><Loader /></div>}
      {data && data.length === 0 && (
        <div className="h-screen">
          <div className='h-[100%] flex items-center justify-center flex-col'>
            <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>
              Empty Cart
            </h1>
            <img src="./empty_cart.png" alt="logo" className='lg:h-[50vh]'/>
          </div>
        </div>
      )}
      {data && data.length > 0 && (
        <>
          <h1 className='text-4xl font-semibold text-zinc-400 mb-8 text-center'>
            Your Cart
          </h1>
          {data.map((item, i) => (
            <div className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center' key={i}>
              <img src={item.url} alt="book_image" className='h-[20vh] md:h-[10vh] object-cover' />
              <div className='w-full md:w-auto'>
                <h1 className='text-xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>
                  {item.title}
                </h1>
                <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>
                  {item.desc.slice(0, 100)}...
                </p>
                <p className='text-normal text-zinc-300 mt-2 hidden md:block lg:hidden'>
                  {item.desc.slice(0, 65)}...
                </p>
                <p className='text-normal text-zinc-300 mt-2 block md:hidden'>
                  {item.desc.slice(0, 100)}...
                </p>
              </div>
              <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
                <h2 className='text-zinc-100 text-2xl font-semibold flex'>
                  ₹ {item.price}
                </h2>
                <button className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12' onClick={()=>{
                  removeFromCart(item._id);
                }}>
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
      {data && data.length>0 && (
        <div className='mt-4 w-full flex items-center justify-end'>
            <div className='p-5 bg-zinc-800 rounded'>
              <h1 className='text-2xl text-zinc-200 font-semibold'>
                Total Amount
              </h1>
              <div className='mt-3 flex items-center justify-between text-xl text-zinc-200'>
                <h2>{data.length} books</h2>
                <h2>₹ {total}</h2>
              </div>
              <div className='w-[100%] mt-3'>
                <button className='bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-blue-800 hover:text-white transition-all duration-300' onClick={placeOrder}>
                  Place your order
                </button>
              </div>
            </div>
        </div>
      )}
    </div>
    <ToastContainer/>
    </>
  )
}

export default Cart
