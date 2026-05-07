import React from 'react'

const Button = ({button1,button2}) => {
  return (
    <div>
       <button className='p-2 px-3 bg-[#E8F5BD] mr-2 rounded-2xl text-[#84B179] border font-semibold'>{button1}</button>
        <button className='p-2 bg-black text-white rounded-2xl font-semibold'>{button2}</button>
    </div>
  )
}

export default Button
