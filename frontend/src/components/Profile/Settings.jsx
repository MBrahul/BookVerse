import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import { toast, ToastContainer } from 'react-toastify';

const Settings = () => {
  const headers = {
    "auth-token": localStorage.getItem("token")
  };

  const [value, setValues] = useState();
  const [profile, setProfile] = useState();
  const getData = async () => {
    const res = await axios.get("http://localhost:5500/api/auth/get-user-info", { headers });
    // console.log(res.data.data.address);
    setProfile(res.data.data);
    setValues(res.data.data.address);
  }


  const handleChange = (e)=>{
    setValues(e.target.value);
  }

  const updateAddress = async()=>{
    try {
      const res = await axios.put("http://localhost:5500/api/auth/update-address",{address:value},{headers});
      console.log(res.data);
      toast.success(res.data.msg);
    } catch (error) {
      // console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {!profile && <div> <Loader /> </div>}
      {profile && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
            Settings
          </h1>
          <div className='flex gap-12'>
            <div className=''>
              <label htmlFor="">Username</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
                {profile.username}
              </p>
            </div>
            <div className=''>
              <label htmlFor="">Email</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
                {profile.email}
              </p>
            </div>
          </div>
          <div className='mt-4 flex flex-col'>
            <label htmlFor="">Address</label>
            <textarea name="address" id="" rows={5} className='p-2 rounded bg-zinc-800 mt-2 font-semibold' value={value} onChange={handleChange}></textarea>
          </div>
          <div className="mt-4 flex justify-end">
            <button className='bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300' onClick={updateAddress}>
              Update
            </button>
          </div>
        </div>
      )}
      <ToastContainer/>
    </>
  )
}

export default Settings
