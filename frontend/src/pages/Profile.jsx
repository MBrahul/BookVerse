import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Profile/Sidebar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Loader from '../components/Loader/Loader'
import MobileNav from '../components/Profile/MobileNav'

const host = import.meta.env.VITE_HOST || undefined;

const Profile = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [profile, setProfile] = useState();

  const headers = {
    "auth-token": localStorage.getItem("token")
  };
  const getData = async () => {
    const res = await axios.get(`${host}/api/auth/get-user-info`, { headers });
    setProfile(res.data.data);
  }
  useEffect(() => {
    getData();
  }, [])

  return (
    <div className='bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row h-auto min-h-[90vh] py-8 gap-4 text-white'>
      {!profile && (<div className='w-full h-[100%] flex items-center justify-center'><Loader /></div>)}
      {profile && (
        <>
          <div className='md:w-1/6 w-full h-auto lg:h-screen'>
            <Sidebar profile = {profile}/>
            {/* <MobileNav/> */}
          </div>
          <div className='md:w-5/6 w-full'>
            <Outlet />
          </div>
        </>
      )

      }
    </div>
  )
}

export default Profile
