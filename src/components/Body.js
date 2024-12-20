import React from 'react'
import Sidebar from './Sidebar'
import MainContainer from './MainContainer'

const Body = () => {
  return (
    <div className='grid grid-flow-col w-[98vw]'>
      <div className='max-w-[15vw]'><Sidebar/></div>
      <div className='min-w-[83vw] max-w-[98vw]'><MainContainer/></div>
    </div>
  )
}

export default Body