import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

const BookCard = (props) => {
    const data = props.data;
    useEffect(() => {
        // console.log(data);
    }, [])

    return (
        <>
            <Link to={`/view-book-details/${data._id}`}>
                <div className="bg-zinc-800 rounded p-4 flex flex-col">
                    <div className="bg-zinc-900 rounded flex items-center justify-center">
                        <img className='h-[25vh]' src={data.url} alt="book_logo" />
                    </div>
                    <h2 className='mt-4 text-xl font-semibold text-white'>{data.title}</h2>
                    <p className='mt-2 text-zinc-400 font-semibold'>By {data.author}</p>
                    <p className='mt-2 text-zinc-200 font-semibold text-xl'>₹ {data.price}</p>
                </div>
            </Link>
        </>
    );
}

export default BookCard
