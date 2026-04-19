import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Landing from '../pages/Landing'
import Footer from '../components/Footer'

const MainLayout = () => {
  return (
    <div className='max-w-[1800px] mx-auto w-full flex flex-col '>
           
{/* add navbar here */}
      <div>
        {/* <Outlet/> */}
      <Landing/>
    </div>

    
    </div>
  )
}

export default MainLayout
