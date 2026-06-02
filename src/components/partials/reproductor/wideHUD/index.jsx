import Button from '@/components/ui/Button'
import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import Marquee from 'react-fast-marquee'
import { useNavigate } from 'react-router-dom'

function WideHUD ({
  reproductorData,
  hdlClickComprar,
  handleFavButton,
  handleLoopButton,
  handleMoveProgressBar,
  handleTooglePlayButton,
  handleMuteButton,
  progressBarRef,
  favved,
  porcentajePlayed,
  closeReproductor,
  setVolume
}) {
  const [hoveringTrackTime, setHoveringTrackTime] = useState(false)
  const navigate = useNavigate()

  return (
    <div className='h-24 bg-zinc-900 flex justify-start items-start gap-2 rounded-b-lg border-l-zinc-50 shadow-md z-[100] lg:w-[80%] w-[90%] relative'>

      <div className='h-24 w-3/12 flex flex-row justify-start items-center gap-5'>
        <img className='hidden sm:block h-full object-cover aspect-square rounded-bl-lg' src={reproductorData.song.cover_path} />
        <div className='ml-2 sm:ml-0 h-full py-3 flex flex-col justify-start items-start w-2/5'>
          <Marquee><span className='text-amber-50 font-semibold text-sm cursor-pointer hover:underline' onClick={() => navigate(`/beat/${reproductorData.song.id}`)}>{reproductorData.song.name}</span></Marquee>
          <div className='mt-2 flex flex-row justify-start items-center gap-2'>
            <Icon icon='ic:baseline-speed' className='text-amber-50' />
            <span className='text-xs text-amber-50 truncate'>{reproductorData.song.bpm} bpm</span>
          </div>
          <div className='mt-2 flex flex-row justify-start items-center gap-2'>
            <Icon icon='ic:baseline-music-note' className='text-amber-50' />
            <span className='text-xs text-amber-50 truncate'>{reproductorData.song.scale}</span>
          </div>

        </div>
        <div className='ml-0 xs:ml-10 flex flex-row justify-center items-center'>
          <Button className='h-10 bg-red-500 text-amber-50 hover:bg-red-600 hover:border-white' onClick={hdlClickComprar}>
            <div className='flex flex-row justify-center items-center gap-2'>
              <Icon icon='ic:round-shopping-cart' />
              <span className='text-xs hidden lg:block'>{reproductorData.song.licenses[0].pivot.price}€</span>
            </div>
          </Button>
        </div>

      </div>

      <div className='h-24 w-9/12 flex flex-row justify-center items-center gap-5'>
        {favved === true
          ? <Icon icon='ic:baseline-favorite' className='h-6 w-6 text-red-500 cursor-pointer hover:text-red-600 transition duration-300' onClick={(e) => handleFavButton(e)} />
          : <Icon icon='ic:baseline-favorite-border' className='h-6 w-6 text-amber-50 cursor-pointer hover:text-red-500 transition duration-300' onClick={(e) => handleFavButton(e)} />}

        {!reproductorData.isPlaying ? <Icon icon='ic:baseline-play-circle' className='text-amber-50 w-12 h-12 cursor-pointer hover:text-red-500 transition duration-300' onClick={(e) => handleTooglePlayButton()} /> : <Icon icon='ic:baseline-pause-circle' className='text-amber-50 w-12 h-12 cursor-pointer hover:text-red-500 transition duration-300' onClick={(e) => handleTooglePlayButton()} />}

        {reproductorData.looping === true
          ? <Icon icon='ic:twotone-loop' className='text-red-500 w-6 h-6 cursor-pointer hover:text-red-600 transition duration-300' onClick={(e) => handleLoopButton(e)} />
          : <Icon icon='ic:twotone-loop' className='text-amber-50 w-6 h-6 cursor-pointer hover:text-red-500 transition duration-300' onClick={(e) => handleLoopButton(e)} />}

      </div>

      <div className='w-3/12 flex flex-row justify-center items-center gap-3 h-full'>
        <Icon icon={reproductorData.isMuted ? 'ic:baseline-volume-off' : (reproductorData.volume < 50 ? 'ic:baseline-volume-down' : 'ic:baseline-volume-up')} className='text-amber-50 w-6 h-6 cursor-pointer hover:text-red-500 transition duration-300' onClick={(e) => handleMuteButton(e)} />
        <input type='range' className='w-24 h-0.5' value={reproductorData.isMuted ? 0 : reproductorData.volume} min={0} max={100} step='any' onChange={(e) => setVolume(e.target.value)} />
      </div>

      <div className='absolute left-0 top-0 w-full h-[10px] cursor-pointer' onMouseEnter={(e) => setHoveringTrackTime(true)} onMouseLeave={(e) => setHoveringTrackTime(false)} ref={progressBarRef} onClick={handleMoveProgressBar}>
        <div className={`${hoveringTrackTime ? 'scale-y-110' : 'scale-y-100'} h-[4px] absolute top-0 bg-red-500 duration-300 transform`} style={{ width: `${porcentajePlayed}%`, transformOrigin: 'bottom' }} />
      </div>

      {/* <div className='absolute top-0 right-0 p-2'>
        <Icon icon='ic:baseline-close' className='text-amber-50 w-6 h-6 cursor-pointer hover:text-red-500 transition duration-300' onClick={(e) => closeReproductor(e)} />
      </div> */}

    </div>
  )
}

export default WideHUD
