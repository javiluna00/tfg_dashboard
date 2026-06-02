import React, { useRef } from 'react'
import logolambda from '@/assets/videos/home/logolambda.mp4'

const Loading = () => {
  const playerRef = useRef(null)

  const handleVideoEnd = () => {
    const player = playerRef.current
    if (player) {
      player.currentTime = 0.1
      player.play()
    }
  }

  return (
    <div className='bg-zinc-900 flex flex-col items-center justify-center h-[90vh]'>
      <div className='video-container absolute inset-0 w-48 h-48 m-auto'>
        <video className='w-full h-full object-cover mix-blend-screen' autoPlay muted ref={playerRef} src={logolambda} onEnded={handleVideoEnd} />
      </div>

    </div>
  )
}

export default Loading
