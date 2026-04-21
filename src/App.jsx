import React from 'react'
import NavBar from './components/NavBar'
import HeroPage from './components/HeroPage'
import RoomCard from './components/RoomCard'
import MainLayout from './layout/MainLayout'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Rooms from './pages/Rooms'
import About from './pages/AboutUs'
import AboutUs from './pages/AboutUs'
import Footer from './components/Footer'
import Login from './pages/Login'
import RoomDetails from './pages/RoomDetails'
import Activities from './pages/Activities'
import BookNow from './pages/BookNow'
import HotelContactPage from './pages/HotelContactPage'

const App = () => {
  return (
    <div className='flex flex-col  '>
<NavBar/>
<Routes>
  <Route path="/" element={<MainLayout/>} >
  <Route path="/landing" element={<Landing/>} /> 
  
        
  </Route>
<Route path="/rooms" element={<Rooms/>} ></Route>
<Route path="/room/:id" element={<RoomDetails />} />
<Route path="/aboutus" element={<AboutUs/>} ></Route>
<Route path="/login" element={<Login/>} ></Route>
<Route path="/activities" element={<Activities/>} ></Route>
<Route path="/booking" element={<BookNow/>} ></Route>
<Route path="/roomdetails" element={<RoomDetails/>} ></Route>
</Routes>
   
<Footer/>


    </div>
    
  )
}

export default App
