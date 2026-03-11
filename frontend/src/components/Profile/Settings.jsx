import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import { toast, ToastContainer } from 'react-toastify';

const host = import.meta.env.VITE_HOST || undefined;

const Settings = () => {

  const headers = {
    "auth-token": localStorage.getItem("token")
  };

  const [value, setValues] = useState();
  const [profile, setProfile] = useState();

  const getData = async () => {
    const res = await axios.get(`${host}/api/auth/get-user-info`, { headers });
    setProfile(res.data.data);
    setValues(res.data.data.address);
  }

  const handleChange = (e) => {
    setValues(e.target.value);
  }

  const updateAddress = async () => {
    try {
      const res = await axios.put(`${host}/api/auth/update-address`, { address: value }, { headers });
      toast.success(res.data.msg);
    } catch (error) {}
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {!profile && (
        <div className='flex items-center justify-center min-h-[40vh]'>
          <Loader />
        </div>
      )}

      {profile && (
        <div className='w-full'>

          {/* Header */}
          <div className="mb-8 border-l-4 border-blue-500 pl-4">
            <p className="text-xs tracking-[0.2em] uppercase text-zinc-500 mb-1">Your Account</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Settings</h1>
          </div>

          <div className='flex flex-col gap-6 max-w-2xl'>

            {/* Read-only fields */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div className='flex flex-col gap-1.5'>
                <label className='text-xs font-medium tracking-widest uppercase text-zinc-500'>Username</label>
                <p className='bg-zinc-950/60 border border-white/5 text-zinc-300 text-sm font-medium px-4 py-3 rounded-xl cursor-not-allowed'>
                  {profile.username}
                </p>
              </div>
              <div className='flex flex-col gap-1.5'>
                <label className='text-xs font-medium tracking-widest uppercase text-zinc-500'>Email</label>
                <p className='bg-zinc-950/60 border border-white/5 text-zinc-300 text-sm font-medium px-4 py-3 rounded-xl cursor-not-allowed'>
                  {profile.email}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className='h-px bg-gradient-to-r from-transparent via-white/8 to-transparent' />

            {/* Editable address */}
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-medium tracking-widest uppercase text-zinc-500'>Address</label>
              <textarea
                name="address"
                rows={5}
                className='w-full bg-zinc-950/80 text-zinc-100 text-sm px-4 py-3 rounded-xl border border-white/6 outline-none focus:border-blue-500/60 focus:bg-zinc-950 placeholder-zinc-600 transition-all duration-200 resize-none'
                value={value}
                onChange={handleChange}
              />
            </div>

            {/* Save button */}
            <div className='flex justify-end'>
              <button
                className='px-6 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white active:scale-95 transition-all duration-200 shadow-lg shadow-blue-900/30'
                onClick={updateAddress}
              >
                Save Changes
              </button>
            </div>

          </div>
        </div>
      )}

      <ToastContainer />
    </>
  )
}

export default Settings