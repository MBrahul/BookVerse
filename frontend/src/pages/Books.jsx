import React, { useRef, useState } from 'react'
import AllBooks from './AllBooks';
import SearchedBooks from './SearchedBooks';

const Debouncing = (setSearchText) => {
  let id;
  return (searchText) => {
    clearTimeout(id);
    id = setTimeout(() => {
      // console.log("Search Text : ",searchText);
      setSearchText(searchText);
    }, 500);
  }
}


const Books = () => {
  const [searchText, setSearchText] = useState("");
  const [text,setText] =  useState("");
  const search = useRef(Debouncing(setSearchText));
  
  return (
    <div className='bg-zinc-900 min-h-screen py-8 flex flex-col items-center'>
      <div className='relative w-full lg:w-[60vw]'>
        <svg
          className='absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4'
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            search.current(e.target.value);
          }}
          placeholder="Search books..."
          className='w-full bg-zinc-800 text-zinc-100 placeholder-zinc-500 
                     pl-10 pr-4 py-2.5 rounded-lg border border-zinc-700 
                     focus:outline-none focus:border-zinc-500 focus:ring-1 
                     focus:ring-zinc-500 transition-colors text-sm'
        />
      </div>

      {!searchText && (<AllBooks />)}
      {searchText && (<SearchedBooks searchText={searchText} />)}

    </div>
  )
}

export default Books