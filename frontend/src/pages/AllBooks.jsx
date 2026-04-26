import React, { useEffect, useRef, useState } from 'react'
import Loader from '../components/Loader/Loader'
import BookCard from '../components/BookCard/BookCard'
import axios from 'axios';
import { BiSolidError } from "react-icons/bi";
import { FaArrowUp } from "react-icons/fa";

const host = import.meta.env.VITE_HOST || '';

const AllBooks = () => {

  const [data, setData] = useState(null);
  const [cursor, setCursor] = useState("");
  // const [limit, setLimit] = useState(20);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [floatingButton, setFloatingButton] = useState(false);

  const loaderRef = useRef(null);
  const cursorRef = useRef(null);
  const textRef = useRef(null);

  const getData = async () => {
    try {
      if (cursorRef.current === null) return;

      // console.log("Api called with Cursor :",cursorRef.current);
      const res = await axios.get(`${host}/api/book?cursor=${cursorRef.current}&limit=20`, { withCredentials: true });

      setData((prev) =>
        Array.isArray(prev)
          ? [...prev, ...res.data.data]
          : res.data.data
      );

      setCursor(res.data.nextCursor);
      // console.log("Next Cursor : ",res.data.nextCursor);
      setError(null);

    } catch (error) {
      setError("Internal Server Error")
      setData(null);
      console.log(error);
    }
    // console.log(res.data.data);
  }

  useEffect(() => {
    cursorRef.current = cursor;
  }, [cursor]);

  useEffect(() => {

    const observer = new IntersectionObserver((entries) => {
      for (let entry of entries) {

        if (entry.target === loaderRef.current) {
          if (entry.isIntersecting) {
            if (!loading) {
              setLoading(true);
              getData();
              setLoading(false);
            }
          }
        }

        else if (entry.target === textRef.current) {
          setFloatingButton(!entry.isIntersecting);
        }

      }

    })

    if (loaderRef.current) observer.observe(loaderRef.current);
    if (textRef.current) observer.observe(textRef.current);

    return () => observer.disconnect();

  }, []);

  return (
    <>
      <div className='bg-zinc-900 px-12 h-auto py-8 text-center min-h-screen'>
        <h4 ref={textRef} className='text-3xl text-yellow-100'>All Books</h4>
        {error && (
          <div ref={loaderRef} className='mt-10 flex items-center justify-center text-red-400 font-thin gap-2'>
            <p>{error}</p>
            <BiSolidError />
          </div>
        )}
        {data && data.length === 0 && (
          <div className='mt-10 flex items-center justify-center text-5xl text-zinc-600'>
            No Books Found
          </div>
        )}
        {data && data?.length > 0 && (
          <div className='my-8 grid grid-cols-1 sd:grid-cols-3 md:grid-cols-4 gap-8'>
            {data && data.map((item, i) => {
              return (
                <div key={i} >
                  <BookCard data={item} />
                </div>
              )
            })}
          </div>)}

        {!error && (cursor !== null) && (
          <div ref={loaderRef} className='mt-10 flex items-center justify-center w-full'>
            <Loader />
          </div>
        )}
      </div>


      <div
        className={`fixed bottom-[20px] right-[20px] z-[999] transition-all duration-300 ${floatingButton
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-5 pointer-events-none"
          }`}
      >
        <button className="p-4 rounded-full shadow border border-blue-500 bg-blue-500 text-white" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <FaArrowUp />
        </button>
      </div>
    </>
  )
}

export default AllBooks
