import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import MainLayout from './layout/MainLayout'
import Rooms from './pages/Rooms'
import RoomDetails from './pages/RoomDetails'
import AboutUs from './pages/AboutUs'
import Login from './pages/Login'
import Activities from './pages/Activities'
import BookNow from './pages/BookNow'
import BookingSuccess from './pages/BookingSuccess'
import HotelContactPage from './pages/HotelContactPage'
import { AuthProvider } from './context/AuthContext'

const App = () => {
  return (
    <AuthProvider>
      <div className='flex flex-col min-h-screen'>
        <NavBar />
        <div className='flex-1'>
          <Routes>
            <Route path="/"           element={<MainLayout />} />
            <Route path="/rooms"      element={<Rooms />} />
            <Route path="/room/:id"   element={<RoomDetails />} />
            <Route path="/aboutus"    element={<AboutUs />} />
            <Route path="/login"      element={<Login />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/booking"    element={<BookNow />} />
            <Route path="/success"    element={<BookingSuccess />} />
            <Route path="/contact"    element={<HotelContactPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
