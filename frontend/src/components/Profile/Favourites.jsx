import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BookCard from '../BookCard/BookCard';

const host = import.meta.env.VITE_HOST || undefined;

const Favourites = () => {

  const headers = {
    "auth-token": localStorage.getItem("token")
  };
  const [data, setData] = useState();

  const getData = async () => {
    const res = await axios.get(`${host}/api/favourite/get-favourite-books`, { headers });
    setData(res.data.data);
  }

  useEffect(() => {
    getData();
  }, [data]);

  return (
    <div className='w-full'>

      {/* Header */}
      <div className="mb-8 border-l-4 border-blue-500 pl-4">
        <p className="text-xs tracking-[0.2em] uppercase text-zinc-500 mb-1">Your Collection</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Favourites</h2>
      </div>

      {/* Empty state */}
      {data && data.length === 0 && (
        <div className='flex flex-col items-center justify-center py-24 gap-4'>
          <span className='text-5xl'>🤍</span>
          <p className='text-lg font-semibold text-zinc-500'>No Favourite Books Yet</p>
          <p className='text-sm text-zinc-600'>Books you favourite will appear here</p>
        </div>
      )}

      {/* Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5'>
        {data && data.map((item, i) => (
          <BookCard data={item} key={i} favourite={true} />
        ))}
      </div>

    </div>
  )
}

export default Favourites