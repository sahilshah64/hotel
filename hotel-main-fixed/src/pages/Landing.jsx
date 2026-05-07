import React from 'react'
import HeroPage from '../components/HeroPage'
import RoomCard from '../components/RoomCard'
import Properties from '../components/Properties'
import AboutUs from './AboutUs'
import Rooms from './Rooms'
import Activities from './Activities'

const Landing = () => {
  return (
    <div className='flex flex-col w-full'>
        <HeroPage/>
        <RoomCard/>
        <Properties/>
        <Activities/>
        <AboutUs/>
       
      
    </div>
  )
}

export default Landing
