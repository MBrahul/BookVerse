import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom'
import { GrLanguage } from "react-icons/gr";

const ViewBookDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState();
    const getData = async () => {
        const res = await axios.get(`http://localhost:5500/api/book/get-book/${id}`);
        // console.log(res.data.data);
        setData(res.data.data);
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <>
            {data && (
                <div className='px-8 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8'>
                <div className='bg-zinc-800 rounded p-4 h-[60vh] lg:h-[88vh] w-full lg:w-3/6 flex  items-center justify-center'>
                    <img src={data.url} alt="" className=' h-[50vh] lg:h-[70vh] rounded' />
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
                <div className='h-screen bg-zinc-900 flex items-center justify-center'> <Loader/></div>
            )}
        </>
    )
}

export default ViewBookDetails
