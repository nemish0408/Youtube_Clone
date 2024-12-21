import React from 'react'
import Sidebar from './Sidebar'
import MainContainer from './MainContainer'

const Body = () => {
  return (
    <div className='grid grid-flow-col w-[98vw] pt-[10px]'>
      <div className='max-w-[15vw] max-h-[82vh]'><Sidebar/></div>
      <div className='min-w-[83vw] max-w-[98vw] '><MainContainer/></div>
    </div>
  )
}

export default Body