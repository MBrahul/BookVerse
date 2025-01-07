import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import BookCard from '../BookCard/BookCard';
import Loader from '../Loader/Loader';


const RecentlyAdded = () => {
    const host = "https://bookverse-n3o3.onrender.com";
    const [data,setData] = useState([]);
    const getData = async ()=>{
        const res = await axios.get(`${host}/api/book/get-recent-books`);
        setData(res.data.data);
        // console.log(res.data.data);
    }
    useEffect(()=>{
        // console.log("rendering")
        getData();
    },[])

    return (
        <>
            <div className='mt-8 px-8'>
                <h4 className='text-3xl text-yellow-100'>Recently Added Books</h4>
                {!data.length && (
                    <div className='flex items-center justify-center my-8'>
                        <Loader/>
                    </div>
                )}
                <div className='my-8 grid grid-cols-1 sd:grid-cols-3 md:grid-cols-4 gap-8'>
                    {data && data.map((item,i)=>{
                        return (
                            <div key = {i} >
                                <BookCard data = {item}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default RecentlyAdded
