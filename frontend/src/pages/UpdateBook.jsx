import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const host = import.meta.env.VITE_HOST || undefined;

const UpdateBook = () => {
    const [data, setData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: ""
    });
    const { id } = useParams();
    const headers = {
        "auth-token": localStorage.getItem("token")
    };
    const navigate = useNavigate();


    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const getData = async () => {
        const res = await axios.get(`${host}/api/book/get-book/${id}`);
        // console.log(res.data.data);
        setData(res.data.data);
    }
    const handleEditBook = async () => {
        try {
            if (
                data.url === "" ||
                data.title === "" ||
                data.author === "" ||
                data.price === "" ||
                data.desc === "" ||
                data.language === ""
            ) {
                toast.error("All fields are required");
            }
            else{
                const res = await axios.put(`${host}/api/book/update-book/${id}`,data,{headers});
                // console.log(res.data);
                alert(res.data.msg);
                navigate(`/view-book-details/${id}`);
                // navigate.
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData();
    }, [])

    return (
        <div className='bg-zinc-900 min-h-screen'>
            <div className='h-[100%] p-0 md:p-8'>
                <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
                    Edit Book
                </h1>
                <div className='p-4 bg-zinc-800 rounded'>
                    <div>
                        <label htmlFor="" className='text-zinc-400'>
                            Image
                        </label>
                        <input type="text"
                            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                            placeholder='Url of image'
                            name='url'
                            required
                            value={data.url}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='mt-4'>
                        <label htmlFor="" className='text-zinc-400'>
                            Title of book
                        </label>
                        <input type="text"
                            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                            placeholder='Title of book'
                            name='title'
                            required
                            value={data.title}
                            onChange={handleChange}
                        />

                    </div>

                    <div className='mt-4'>
                        <label htmlFor="" className='text-zinc-400'>
                            Author of book
                        </label>
                        <input type="text"
                            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                            placeholder='Author of book'
                            name='author'
                            required
                            value={data.author}
                            onChange={handleChange}
                        />

                    </div>

                    <div className='mt-4 flex gap-4'>
                        <div className="w-3/6">
                            <label htmlFor="" className='text-zinc-400'>
                                Language of book
                            </label>
                            <input type="text"
                                className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                                placeholder='language of book'
                                name='language'
                                required
                                value={data.language}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="w-3/6">
                            <label htmlFor="" className='text-zinc-400'>
                                Price of book
                            </label>
                            <input type="number"
                                className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                                placeholder='price of book'
                                name='price'
                                required
                                value={data.price}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    <div className='mt-4'>
                        <label htmlFor="" className='text-zinc-400'>
                            Description of book
                        </label>
                        <textarea type="text"
                            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                            placeholder='Description of book'
                            name='desc'
                            required
                            value={data.desc}
                            onChange={handleChange}
                            rows={5}
                        />

                    </div>
                    <button className='mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300' onClick={handleEditBook}>
                        Edit Book
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default UpdateBook
