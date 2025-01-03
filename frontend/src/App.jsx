import React from 'react'
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

export default function App() {
  return (
    <div>

        <Navbar />
        <Routes>
          <Route exact path = '/' element={<Home/>}/>
          <Route path = '/all-books' element={<AllBooks/>}/>
          <Route path = '/log-in' element={<Login/>}/>
          <Route path = '/sign-up' element={<SignUp/>}/>
          <Route path = '/cart' element={<Cart/>}/>
          <Route path = '/profile' element={<Profile/>}/>
          <Route path = '/view-book-details/:id' element={<ViewBookDetails/>}/>
        </Routes>
        <Footer />

    </div>
  )
}
