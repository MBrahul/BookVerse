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
  const [profile, setProfile] = useState(null);

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
    <div className='min-h-[90vh] bg-zinc-950 text-white'>

      {/* Ambient glow */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      {!profile && (
        <div className='w-full min-h-[90vh] flex items-center justify-center'>
          <Loader />
        </div>
      )}

      {profile && (
        <div className='relative flex flex-col md:flex-row gap-6 px-4 sm:px-6 md:px-10 py-8 max-w-screen-xl mx-auto'>

          {/* Sidebar */}
          <div className='w-full md:w-1/5 md:sticky md:top-8 md:self-start'>
            <Sidebar profile={profile} />
          </div>

          {/* Main content */}
          <div className='w-full md:w-4/5 bg-gradient-to-b from-zinc-800/40 to-zinc-900/40 border border-white/5 rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl shadow-black/30 backdrop-blur-sm min-h-[70vh]'>
            <Outlet />
          </div>

        </div>
      )}
    </div>
  )
}

export default Profile