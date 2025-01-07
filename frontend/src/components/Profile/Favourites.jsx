import React, { useEffect, useState } from 'react'
import { use } from 'react'
import axios from 'axios';
import BookCard from '../BookCard/BookCard';

const Favourites = () => {
  const headers = {
    "auth-token": localStorage.getItem("token")
  };
  const [data, setData] = useState();
  const getData = async () => {
    const res = await axios.get('http://localhost:5500/api/favourite/get-favourite-books', { headers });
    // console.log(res.data);
    setData(res.data.data);
  }
  useEffect(() => {
    getData();
  }, [data]);
  return (
    <>
    {data && data.length === 0 && (
        (
          <div className='h-[100%] w-[100%] flex items-center justify-center text-4xl font-semibold text-zinc-500'>No Favourite Books !</div>
        )
      )}
      <div className='grid grid-cols-4 gap-4'>
      {
        data && data.map((item,i)=>(
          <>
          <BookCard data = {item} key={i} favourite = {true}/>
          </>
        ))
      }
    </div>
    </>
    
  )
}

export default Favourites