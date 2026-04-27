import React, { useEffect, useRef, useState } from 'react'
import Loader from '../components/Loader/Loader'
import BookCard from '../components/BookCard/BookCard'
import axios from 'axios';
import { BiSolidError } from "react-icons/bi";
import { FaArrowUp } from "react-icons/fa";

const host = import.meta.env.VITE_HOST || '';

const SearchedBooks = (props) => {

    const { searchText } = props;

    const [data, setData] = useState(null);

    // const [limit, setLimit] = useState(20);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [floatingButton, setFloatingButton] = useState(false);

    const loaderRef = useRef(null);
    const cursorRef = useRef(null);
    const textRef = useRef(null);

    const getData = async () => {
        try {
            // console.log("Calling api with : ", searchText);
            const res = await axios.get(`${host}/api/book/search?text=${searchText}&limit=10`, { withCredentials: true });

            setData(res.data.data);
            setError(null);

        } catch (error) {
            setError("Internal Server Error")
            setData(null);
            console.log(error);
        }

    }

    useEffect(() => {
        setData(null);
        getData();
    }, [searchText]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            setFloatingButton(!entries[0].isIntersecting);
        })
        if(textRef.current)observer.observe(textRef.current);
        return ()=>observer.disconnect();
    }, []);


    return (
        <>
            <div className='w-full px-12 h-auto py-8 text-center'>
                <h4 ref={textRef} className='text-3xl text-yellow-100'>Search Result</h4>
                {error && (
                    <div className='mt-10 flex items-center justify-center text-red-400 font-thin gap-2'>
                        <p>{error}</p>
                        <BiSolidError />
                    </div>
                )}
                {data && data.length === 0 && (
                    <div className='mt-10 flex items-center justify-center text-2xl lg:text-5xl text-zinc-600'>
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

                {!error && !data && (
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

export default SearchedBooks
