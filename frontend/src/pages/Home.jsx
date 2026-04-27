import React, { useEffect } from 'react'
import Hero from '../components/Home/Hero';
import RecentlyAdded from '../components/Home/RecentlyAdded';

const Home = () => {
  useEffect(()=>{
    document.title = "BookVerse - Home";
  },[]);
  return (
    <div className='bg-zinc-950 text-white px-10 py-8'>
        <Hero/>
        <RecentlyAdded/>
    </div>
  )
}

export default Home;
