import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';

const Sidebar = (props) => {
    const { profile } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const role = useSelector((state) => state.auth.role);

    const handleLogOut = () => {
        dispatch(authActions.logout());
        dispatch(authActions.changeRole("user"));
        localStorage.clear("id");
        localStorage.clear("token");
        localStorage.clear("role");
        navigate('/');
    }

    return (
        <div className='bg-gradient-to-b from-zinc-800/60 to-zinc-900 border border-white/6 rounded-3xl p-6 flex flex-col items-center gap-6 shadow-xl shadow-black/30 backdrop-blur-sm'>

            {/* Avatar + info */}
            <div className='flex flex-col items-center text-center w-full'>
                <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-md scale-110" />
                    <img
                        src={profile.avatar}
                        alt=""
                        className='relative h-20 w-20 rounded-full object-cover border-2 border-white/10 shadow-lg'
                    />
                </div>
                <p className="mt-4 text-base font-bold text-white tracking-wide">{profile.username}</p>
                <p className="mt-1 text-xs text-zinc-500 tracking-wide truncate w-full px-2">{profile.email}</p>
                <div className="w-full mt-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* Nav links */}
            {role === "user" && (
                <div className='w-full flex flex-col gap-1'>
                    <Link
                        to={'/profile'}
                        className='text-sm font-medium text-zinc-400 hover:text-white w-full px-4 py-2.5 rounded-xl hover:bg-white/6 transition-all duration-200'
                    >
                        ♥ &nbsp; Favourites
                    </Link>
                    <Link
                        to={'/profile/orderHistory'}
                        className='text-sm font-medium text-zinc-400 hover:text-white w-full px-4 py-2.5 rounded-xl hover:bg-white/6 transition-all duration-200'
                    >
                        📦 &nbsp; Order History
                    </Link>
                    <Link
                        to={'/profile/settings'}
                        className='text-sm font-medium text-zinc-400 hover:text-white w-full px-4 py-2.5 rounded-xl hover:bg-white/6 transition-all duration-200'
                    >
                        ⚙️ &nbsp; Settings
                    </Link>
                </div>
            )}

            {role === "admin" && (
                <div className='w-full flex flex-col gap-1'>
                    <Link
                        to={'/profile'}
                        className='text-sm font-medium text-zinc-400 hover:text-white w-full px-4 py-2.5 rounded-xl hover:bg-white/6 transition-all duration-200'
                    >
                        📋 &nbsp; All Orders
                    </Link>
                    <Link
                        to={'/profile/add-book'}
                        className='text-sm font-medium text-zinc-400 hover:text-white w-full px-4 py-2.5 rounded-xl hover:bg-white/6 transition-all duration-200'
                    >
                        ➕ &nbsp; Add Book
                    </Link>
                </div>
            )}

            {/* Logout */}
            <div className="w-full mt-auto pt-2 border-t border-white/6">
                <button
                    className='w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 border border-red-500/20 hover:bg-red-500/10 hover:border-red-500/40 active:scale-95 transition-all duration-200'
                    onClick={handleLogOut}
                >
                    <MdLogout className="text-base" />
                    Log Out
                </button>
            </div>

        </div>
    )
}

export default Sidebar