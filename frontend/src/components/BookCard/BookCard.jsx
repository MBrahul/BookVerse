import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';


const BookCard = (props) => {
    const host = "https://bookverse-n3o3.onrender.com";
    const { data, favourite } = props;
    const headers = {
        "auth-token": localStorage.getItem("token")
      };
    const removeFromFavourite = async () => {
       try {
        const res = await axios.put(`${host}/api/favourite/remove-book-from-favourites`, {bookId:data._id},{ headers });
        // console.log(res.data);
       } catch (error) {
        
       }
    }

    useEffect(() => {
        // console.log(data);
    }, [])

    return (
        // <>
        <div className='flex flex-col bg-zinc-800 rounded p-4'>
            <Link to={`/view-book-details/${data._id}`}>
                <div className="flex flex-col">
                    <div className="bg-zinc-900 rounded flex items-center justify-center">
                        <img className='h-[25vh]' src={data.url} alt="book_logo" />
                    </div>
                    <h2 className='mt-4 text-xl font-semibold text-white'>{data.title}</h2>
                    <p className='mt-2 text-zinc-400 font-semibold'>By {data.author}</p>
                    <p className='mt-2 text-zinc-200 font-semibold text-xl'>₹ {data.price}</p>
                </div>
            </Link>
            {favourite && (
                <button className='bg-yellow-50  px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4' onClick={removeFromFavourite}>Remove from favourite</button>
            )}
        </div>

        // </>
    );
}

export default BookCard
