import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader'
import BookCard from '../components/BookCard/BookCard'
import axios from 'axios';

const AllBooks = () => {
  const host = "https://bookverse-n3o3.onrender.com";
  const [data, setData] = useState();
  const getData = async () => {
    const res = await axios.get(`${host}/api/book/get-all-books`);
    setData(res.data.data);
    // console.log(res.data.data);
  }
  useEffect(() => {
    // console.log("rendering")
    getData();
  }, [])

  return (
    <div className='bg-zinc-900 px-12 h-auto py-8 text-center min-h-screen'>
      <h4 className='text-3xl text-yellow-100'>All Books</h4>
      {!data && (
        <div className='mt-10 flex items-center justify-center'>
          <Loader />
        </div>
      )}
      {data && data.length === 0 && (
        <div className='mt-10 flex items-center justify-center text-5xl text-zinc-600'>
            No Book Found
        </div>
      )}
      {data && data.length > 0 && (<div className='my-8 grid grid-cols-1 sd:grid-cols-3 md:grid-cols-4 gap-8'>
        {data && data.map((item, i) => {
          return (
            <div key={i} >
              <BookCard data={item} />
            </div>
          )
        })}
      </div>)}
    </div>
  )
}

export default AllBooks
