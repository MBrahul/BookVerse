import React, { useEffect } from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AllBooks from './pages/AllBooks'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/auth'
import Favourites from './components/Profile/Favourites'
import UserOrderHistory from './components/Profile/UserOrderHistory'
import Settings from './components/Profile/Settings'
import AllOrders from './components/Profile/AllOrders'
import AddBook from './components/Profile/AddBook'
import UpdateBook from './pages/UpdateBook'

export default function App() {

  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token") && localStorage.getItem("role")) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  },[]);

  return (
    <>
    {/* nothing  */}
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/all-books' element={<AllBooks />} />
        <Route path='/log-in' element={<Login />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/profile' element={<Profile />}>
          <Route index element={role==="user"? <Favourites/> : <AllOrders/>}/>
          <Route path={'/profile/orderHistory'} element={<UserOrderHistory/>}/>
          <Route path={'/profile/settings'} element = {<Settings/>} />

          <Route path={'/profile/add-book'} element={<AddBook/>}/>
        </Route> 
      <Route path='/view-book-details/:id' element={<ViewBookDetails />} />
      <Route path='/update-book/:id' element={<UpdateBook />} />
    </Routes>
    <Footer />

    </>
  )
}
