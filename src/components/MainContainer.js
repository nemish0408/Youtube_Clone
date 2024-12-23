import React from 'react'
import ButtonList from './ButtonList'
import VideoContainer from './VideoContainer'

const MainContainer = () => {
  return (
    <div className='overflow-y-scroll scrollbar-hidden max-h-[85vh] pt-5'>
      <ButtonList/>
      <VideoContainer/>
    </div>
  )
}

export default MainContainer