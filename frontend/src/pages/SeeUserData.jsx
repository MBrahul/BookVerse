import React from 'react'
import { RxCross1 } from "react-icons/rx";

const SeeUserData = (props) => {

    const { userDivData, userDiv, setuserDiv } = props;

    return (
        <>
            {/* Backdrop */}
            <div className={`${userDiv} top-0 left-0 h-screen w-full bg-zinc-950/80 backdrop-blur-sm z-40`} />

            {/* Modal */}
            <div className={`${userDiv} top-0 left-0 h-screen w-full flex items-center justify-center z-50 px-4`}>
                <div className='bg-gradient-to-b from-zinc-800/90 to-zinc-900 border border-white/8 rounded-3xl p-6 sm:p-8 w-full sm:w-[80%] md:w-[50%] lg:w-[38%] shadow-2xl shadow-black/60 backdrop-blur-md'>

                    {/* Header */}
                    <div className='flex items-center justify-between mb-6'>
                        <div className='border-l-4 border-blue-500 pl-3'>
                            <p className='text-xs tracking-[0.2em] uppercase text-zinc-500 mb-0.5'>Admin View</p>
                            <h1 className='text-lg sm:text-xl font-bold text-white'>User Information</h1>
                        </div>
                        <button
                            className='text-zinc-500 hover:text-white bg-white/5 hover:bg-white/10 border border-white/8 p-2 rounded-xl transition-all duration-200 active:scale-95'
                            onClick={() => setuserDiv("hidden")}
                        >
                            <RxCross1 className='text-sm' />
                        </button>
                    </div>

                    {/* Divider */}
                    <div className='h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6' />

                    {/* Fields */}
                    <div className='flex flex-col gap-4'>

                        <div className='flex flex-col gap-1'>
                            <span className='text-xs font-medium tracking-widest uppercase text-zinc-500'>Username</span>
                            <span className='text-sm font-semibold text-white bg-zinc-950/60 border border-white/5 px-4 py-2.5 rounded-xl'>{userDivData.username}</span>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <span className='text-xs font-medium tracking-widest uppercase text-zinc-500'>Email</span>
                            <span className='text-sm font-semibold text-white bg-zinc-950/60 border border-white/5 px-4 py-2.5 rounded-xl'>{userDivData.email}</span>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <span className='text-xs font-medium tracking-widest uppercase text-zinc-500'>Address</span>
                            <span className='text-sm font-semibold text-white bg-zinc-950/60 border border-white/5 px-4 py-2.5 rounded-xl leading-relaxed'>{userDivData.address}</span>
                        </div>

                    </div>

                    {/* Footer */}
                    <div className='mt-6 flex justify-end'>
                        <button
                            className='px-6 py-2.5 rounded-xl text-sm font-semibold text-zinc-400 border border-white/8 hover:bg-white/5 hover:text-white active:scale-95 transition-all duration-200'
                            onClick={() => setuserDiv("hidden")}
                        >
                            Close
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default SeeUserData